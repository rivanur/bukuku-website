# Panduan Desain UI (Design System)

Dokumen ini berisi standar visual agar tampilan website Bukuku tetap konsisten meskipun dikerjakan oleh banyak orang.

## 🎨 Palet Warna (Earth Tone Premium)

Gunakan variabel CSS yang sudah tersedia di `style/style.css`.

| Variabel | Warna | Kegunaan |
| :--- | :--- | :--- |
| `--primary-color` | `#8b7355` | Warna utama (Navbar, Footer, Latar Hero) |
| `--primary-dark` | `#4a3b2c` | Teks judul, tombol saat aktif |
| `--accent-color` | `#c17b4c` | Tombol utama, badge "Baru", Link aktif |
| `--accent-light` | `#ecd8b4` | Background kartu, border input |
| `--bg-color` | `#faf7f2` | Latar belakang seluruh halaman |
| `--white` | `#ffffff` | Konten dalam kartu buku |

## 🅰️ Tipografi
- **Font Utama**: `Inter`, sans-serif (Google Fonts).
- **Font-weight**:
  - Regular (400): Teks deskripsi dan konten.
  - Medium (500/600): Subjudul, label, dan navigasi.
  - Bold (700): Judul utama (H1, H2).

## 📐 Spacing & Grid
- **Container**: `max-width: 1200px` (Tengah halaman).
- **Gap Grid Buku**: `1.5rem` sampai `2rem`.
- **Border Radius**: `12px` untuk gambar & tombol, `16px` untuk kartu buku.

## ✨ Efek Visual
- **Glassmorphism**: Gunakan `backdrop-filter: blur(10px)` pada elemen yang melayang (Navbar).
- **Micro-animations**: Gunakan `transition: all 0.3s ease` untuk semua efek hover.
- **Card Hover**: `transform: translateY(-8px) scale(1.02)` ditambah bayangan tajam.

---

> [!TIP]
> **Pesan untuk Desainer/Developer:**
> Jika ingin menambah warna baru, pastikan tambahkan dulu di `:root` pada file `style/style.css` agar bisa digunakan kembali di seluruh komponen.
