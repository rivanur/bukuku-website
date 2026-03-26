# Panduan Persiapan Pengembangan (Development Setup)

Gunakan panduan ini untuk menyiapkan lingkungan kerja di komputer masing-masing anggota tim.

## 🛠️ Prasyarat (Prerequisites)

Pastikan kamu sudah menginstal perangkat lunak berikut:
1.  **Node.js** (Versi LTS terbaru).
2.  **Git** (Untuk kolaborasi kode).
3.  **Laragon** (Untuk server MySQL lokal).
4.  **Visual Studio Code** (Editor kode yang disarankan).

## 🚀 Langkah-langkah Memulai

### 1. Ambil Kode Project
```bash
git clone https://github.com/rivanur/bukuku-website.git
cd bukuku-website
```

### 2. Instalasi Dependensi
*(Lakukan ini jika sudah ada file package.json)*
```bash
npm install
```

### 3. Persiapan Database (Laragon)
- Jalankan Laragon dan aktifkan MySQL.
- Buat database `bukuku_db`.
- Impor skema tabel dari file **[`docs/backend_guide.md`](file:///d:/bukuku-website/docs/backend_guide.md)**.

### 4. Konfigurasi Environment (`.env`)
Buat file baru bernama `.env` di root folder dan isi dengan:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bukuku_db
```

### 5. Menjalankan Aplikasi
Buka terminal dan jalankan:
```bash
# Untuk Frontend (Jika pakai Live Server)
# Klik kanan index.html -> Open with Live Server

# Untuk Backend (Nanti)
npm start
```

---

## 🤝 Aturan Penulisan Kode (Git Workflow)

1. Jangan langsung *push* ke branch `main`.
2. Buat branch baru untuk setiap fitur: `git checkout -b feature/nama-fitur`.
3. Lakukan *Pull Request* dan minta temanmu untuk meninjau kodenya.
