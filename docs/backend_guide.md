# Panduan Integrasi Backend

Dokumen ini menjelaskan teknis menghubungkan Frontend Bukuku ke Backend Node.js dengan database MySQL.

## 🛠️ Persiapan Database (Laragon)

1. Buka Laragon, klik **Start All**.
2. Klik tombol **Database** (HeidiSQL).
3. Buat database baru bernama `bukuku_db`.
4. Jalankan query SQL berikut untuk membuat tabel:

```sql
-- Tabel Buku
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100),
    category VARCHAR(50),
    description TEXT,
    price VARCHAR(50),
    releaseDate VARCHAR(20),
    cover VARCHAR(255),
    isNew BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Pengguna (Admin & Pembaca)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🟢 Setup Node.js (Vercel)

Kita akan menggunakan folder `api/` untuk menyimpan logika server.

### Dependensi yang Dibutuhkan:
- `mysql2`: Menghubungkan Node.js ke MySQL.
- `dotenv`: Mengelola keamanan (password database).

### Contoh Koneksi (`api/db.js`):
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'bukuku_db'
});

module.exports = connection;
```
## 🛡️ Checklist Keamanan (Sangat Penting!)

Agar website ini "aman" sesuai keinginanmu, kita akan menerapkan hal-hal berikut:

1.  **Environment Variables (`.env`)**: Kita tidak menyimpan password database di kode.
2.  **Password Hashing (`bcrypt`)**: Password di database tidak berupa teks biasa. Jika database dicuri, penyerang tidak bisa melihat password aslinya.
3.  **Sanitasi Input**: Menggunakan *Parameterized Queries* (`?`) untuk mencegah SQL Injection.
4.  **JWT (JSON Web Token)**: Untuk memastikan cuma Admin yang sudah login yang bisa menghapus data.
5.  **CORS Config**: Hanya mengizinkan websitemu sendiri yang bisa mengakses API ini.
