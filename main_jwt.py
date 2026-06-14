from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import requests
import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from jwt import decode
import jwt

# ===== INIT =====
appjwt = FastAPI(title="API Mahasiswa Supabase")
security = HTTPBearer()

# ===== LOAD ENV =====
project_root = Path(__file__).resolve().parent
load_dotenv(project_root / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
TABLE = os.getenv("TABLE", "mahasiswa")

BASE_URL = f"{SUPABASE_URL}/rest/v1/{TABLE}"

# ===== MODEL =====
class LoginRequest(BaseModel):
    email: str = Field(..., alias="username")
    password: str

    class Config:
        validate_by_name = True

class UserAuth(BaseModel):
    email: str
    password: str

class Mahasiswa(BaseModel):
    nama: str
    nim: str
    jurusan: str

@appjwt.get("/")
def root():
    return {
        "message": "API Mahasiswa Supabase berjalan"
    }

# ===== HELPER =====
def safe_json(response):
    try:
        if response.text:
            return response.json()
        return {"message": "success"}
    except:
        return {"raw": response.text}

# ===== SIGNUP =====
@appjwt.post("/signup")
def signup(data: LoginRequest):
    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "email": data.email,
        "password": data.password
    }

    r = requests.post(url, headers=headers, json=payload)
    try:
        content = r.json()
    except ValueError:
        content = {"error": r.text}

    if r.status_code not in [200, 201]:
        raise HTTPException(status_code=r.status_code, detail=content)

    return content

# ===== LOGIN =====
@appjwt.post("/login")
def login(data: LoginRequest):
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"

    headers = {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "email": data.email,
        "password": data.password
    }

    r = requests.post(url, headers=headers, json=payload)

    if r.status_code != 200:
        raise HTTPException(status_code=401, detail=r.text)

    return r.json()


# ===== VERIFY TOKEN (VALIDASI KE SUPABASE) =====
security = HTTPBearer()
def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    print("TOKEN:", token)

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Token tidak ditemukan"
        )

    return token

# ===== GET =====
@appjwt.get("/mahasiswa")
def get_data(token=Depends(verify_token)):
    headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
    }

    r = requests.get(BASE_URL, headers=headers)

    return safe_json(r)


# ===== INSERT =====
@appjwt.post("/mahasiswa")
def create_data(data: Mahasiswa, token=Depends(verify_token)):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    r = requests.post(
        BASE_URL,
        headers=headers,
        json=data.dict()
    )

    print("STATUS:", r.status_code)
    print("RESPON:", r.text)

    if r.status_code not in [200, 201]:
        raise HTTPException(
            status_code=r.status_code,
            detail=r.text
        )

    return r.json()

# ===== UPDATE =====
@appjwt.put("/mahasiswa/{id}")
def update_data(id: str, data: Mahasiswa, token=Depends(verify_token)):
    url = f"{BASE_URL}?id=eq.{id}"

    headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
    }

    r = requests.patch(url, headers=headers, json=data.dict())

    return safe_json(r)


# ===== DELETE =====
@appjwt.delete("/mahasiswa/{id}")
def delete_data(id: str, token=Depends(verify_token)):
    url = f"{BASE_URL}?id=eq.{id}"

    headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
    }

    r = requests.delete(url, headers=headers)

    return safe_json(r)