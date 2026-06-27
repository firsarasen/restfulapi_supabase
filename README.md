# 🍱 Food Inventory REST API

REST API untuk mengelola stok bahan makanan menggunakan **Express.js**, **Supabase**, dan **JWT Authentication**. API ini menyediakan fitur autentikasi pengguna, manajemen data makanan, serta dokumentasi API menggunakan Swagger.

---

## 📖 Deskripsi

Food Inventory REST API merupakan backend aplikasi manajemen stok makanan yang dibangun menggunakan Express.js dan database PostgreSQL dari Supabase.

Aplikasi ini menerapkan sistem autentikasi menggunakan JWT sehingga hanya pengguna yang telah login yang dapat mengakses endpoint tertentu.

---

# ✨ Fitur

- Login User
- Register User
- Email Verification
- JWT Authentication
- CRUD Data Makanan
- Validasi Input
- Middleware Authentication
- Swagger API Documentation
- Terhubung dengan Supabase PostgreSQL

---

# 🛠 Teknologi

- Node.js
- Express.js
- Supabase
- PostgreSQL
- JWT
- bcrypt
- dotenv
- Swagger UI
- CORS

---

# 🚀 Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone https://github.com/firsarasen/restfulapi_supabase.git
```

Masuk ke folder project

```bash
cd restfulapi_supabase
```

---

## 2. Install Dependency

```bash
npm install
```

---

## 3. Membuat Project Supabase

1. Login ke Supabase Dashboard.
2. Buat project baru.
3. Tunggu hingga project selesai dibuat.
4. Buka menu:

```
Project Settings
```

Lalu pilih

```
API
```

Salin:

- Project URL
- anon public key

---

## 4. Buat Database

Masuk ke

```
SQL Editor
```

Kemudian jalankan query untuk membuat tabel.

Contoh:

```sql
CREATE TABLE foods (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL,
    category TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 5. Konfigurasi Environment

Buat file

```
.env
```

Isi dengan:

```env
PORT=3000

SUPABASE_URL=https://xxxxxxxx.supabase.co

SUPABASE_ANON_KEY=your_anon_key

JWT_SECRET=your_secret_key
```

---

## 6. Jalankan Project

Mode Development

```bash
npm run dev
```

atau

```bash
npm start
```

Jika berhasil akan muncul

```
Server running on port 3000
```

---

# 🔑 Authentication

## Register

```
POST /api/auth/register
```

Body

```json
{
  "email":"user@gmail.com",
  "password":"12345678"
}
```

---

## Login

```
POST /api/auth/login
```

Body

```json
{
  "email":"user@gmail.com",
  "password":"12345678"
}
```

Response

```json
{
  "token":"JWT_TOKEN"
}
```

Gunakan token tersebut pada Authorization Header

```
Bearer JWT_TOKEN
```

---

# 📦 Endpoint API

## Authentication

| Method | Endpoint |
|----------|------------------|
| POST | /register |
| POST | /login |

---

## Food

| Method | Endpoint |
|----------|----------------|
| GET | /foods |
| GET | /foods/:id |
| POST | /foods |
| PUT | /foods/:id |
| DELETE | /foods/:id |

---

# 📚 Swagger Documentation

Jalankan project kemudian buka

```
http://localhost:3000/api-docs
```

Swagger digunakan untuk menguji endpoint secara langsung tanpa menggunakan Postman.

---

# 🧪 Testing API

API dapat diuji menggunakan:

- Swagger UI
- Postman
- Thunder Client (VSCode)

---

# 📌 Alur Penggunaan

1. Clone repository.
2. Install dependency.
3. Buat project Supabase.
4. Buat database.
5. Salin URL dan API Key Supabase.
6. Buat file `.env`.
7. Jalankan server.
8. Register akun.
9. Verifikasi email (jika diaktifkan).
10. Login.
11. Salin JWT Token.
12. Masukkan token ke Authorization.
13. Gunakan endpoint CRUD Food.

---

# 🔒 Security

Project menggunakan:

- JWT Authentication
- Password Hashing (bcrypt)
- Environment Variable (.env)
- Middleware Authentication
- CORS

---

# 👨‍💻 Author

**Raden Mochammad R.F**

GitHub

https://github.com/firsarasen

---

# 📄 License

Project ini dibuat untuk kebutuhan pembelajaran dan tugas kuliah Pengembangan Aplikasi Berbasis Web.

MIT License
