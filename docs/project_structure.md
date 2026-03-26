# Struktur Proyek Bukuku (Rencana Pengembangan)

Untuk mendukung pengembangan fitur yang lebih kompleks di masa depan, berikut adalah rekomendasi struktur folder yang lebih terorganisir dan standar industri.

## 🏗️ Struktur Folder yang Diusulkan

```text
bukuku-website/
├── api/                  # 🟢 Backend Node.js (Serverless Functions)
│   ├── books.js          # API manajemen buku
│   ├── auth.js           # API login/register
│   └── db.js             # Koneksi MySQL (Laragon)
├── assets/               # Gambar, icon, dan font
│   ├── images/           # Foto cover buku
│   └── icons/            # SVG aset
├── components/           # Komponen UI modular
│   ├── navbar.js / .css
│   ├── books.js / .css
│   └── auth.js / .css
├── utils/                # Fungsi bantuan (Helpers)
│   ├── storage.js        # Logic pemanggilan API
│   ├── constants.js      # Data statis
│   └── toast.js          # Notifikasi UI
├── style/                # Global styling
│   └── style.css         # CSS Variables & Global Reset
├── index.html            # File HTML utama
├── package.json          # Manajemen dependensi Node.js
├── README.md             # Petunjuk penggunaan proyek
└── docs/                 # Dokumentasi proyek
```

---

## 🚀 Rencana Backend (Node.js + MySQL)

1.  **Server**: Node.js (Vercel Functions).
2.  **Database**: MySQL (Laragon / Cloud).
3.  **Library**: `mysql2` untuk koneksi database.

---

> [!TIP]
> Dokumentasi ini akan menjadi acuan kita saat mulai melakukan migrasi folder nanti.
