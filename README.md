# restfulapi_supabase

# 🎓 API Mahasiswa Supabase

Sistem Manajemen Mahasiswa menggunakan:

- FastAPI
- Supabase Database
- Supabase Authentication
- JWT Authentication
- HTML, CSS, JavaScript Frontend

## Fitur

✅ Signup User  
✅ Login User  
✅ JWT Authentication  
✅ Get Data Mahasiswa  
✅ Tambah Data Mahasiswa  
✅ Update Data Mahasiswa  
✅ Hapus Data Mahasiswa  
✅ Frontend Dashboard Mahasiswa

---

# Persiapan Supabase

## 1. Buat Project Supabase

Masuk ke:

https://supabase.com

Buat project baru.

---

## 2. Buat Tabel Mahasiswa

Masuk ke:

Table Editor → Create Table

Nama tabel:

```text
mahasiswa
```

Kolom:

| Nama Kolom | Tipe |
|------------|------|
| nama | text |
| nim | text |(Primary Key) |
| jurusan | text |

---

## 3. DIsable RLS

Masuk:

```text
Authentication
→ Policies
```

Aktifkan:

```text
Enable Row Level Security (RLS)
```

---

## 4. Buat Policy

Masuk:

```text
SQL Editor
```

Jalankan:

```sql
CREATE POLICY "allow_select_authenticated"
ON mahasiswa
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "allow_insert_authenticated"
ON mahasiswa
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "allow_update_authenticated"
ON mahasiswa
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "allow_delete_authenticated"
ON mahasiswa
FOR DELETE
TO authenticated
USING (true);
```

---

# Konfigurasi Environment

Buat file:

```text
.env
```

Isi:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_JWT_SECRET=your_jwt_secret
TABLE=mahasiswa
```

---

# Instalasi

Clone repository:

```bash
git clone https://github.com/username/restapisupabase.git

cd restapisupabase
```

Buat virtual environment:

```bash
python -m venv venv
```

Aktifkan virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

---

# Menjalankan Backend

Jalankan FastAPI:

```bash
uvicorn main:app --reload
```

Akses Swagger:

```text
http://127.0.0.1:8000/docs
```

Kalau belum bisa masuk ke swagger/error : 
```text
Install semua library yang belum keinstall
```

---

# Testing API

## Buat user authentication di supabase dan confirm lewat gmail agar bisa dapat token

## Signup

```http
POST /signup
```

Body:

```json
{
  "username": "user@gmail.com",
  "password": "12345678"
}
```

---

## Login

```http
POST /login
```

Body:

```json
{
  "username": "user@gmail.com",
  "password": "12345678"
}
```

Response:

```json
{
  "access_token": "JWT_TOKEN"
}
```
Copy Token dan masuk di bagian Authorize
---

## Authorize

Klik tombol:

```text
Authorize
```

Masukkan:

```text
Bearer JWT_TOKEN
```

Kemudian klik:

```text
Authorize
```

---

# CRUD Mahasiswa

## Get Data

```http
GET /mahasiswa
```

---

## Tambah Data

```http
POST /mahasiswa
```

Body:

```json
{
  "nama": "(nama")",
  "nim": "(nim)",
  "jurusan": "(jurusan)"
}
```

---

## Update Data

```http
PUT /mahasiswa/{id}
```

Body:

```json
{
  "nama": "(nama")",
  "nim": "(nim)",
  "jurusan": "(jurusan)"
}
```

---

## Hapus Data

```http
DELETE /mahasiswa/{id}
```

---

# Teknologi

- FastAPI
- Supabase
- JWT
- Python
- HTML
- CSS
- JavaScript
- Bootstrap 5

---

# Author

Raden Mochammad R.F

Universitas Muhammadiyah Sidoarjo
