# Audit Fitur & Analisis Celah (Gap Analysis)

Dokumen ini memetakan apa yang sudah berjalan (**Ready**) dan apa yang belum ada (**Missing**) untuk memudahkan kolaborasi tim dalam pengembangan sistem.

## 📊 Status Fitur Saat Ini

### 1. Modul Autentikasi (User & Admin)
| Fitur | Status | Catatan |
| :--- | :--- | :--- |
| UI Login/Register Modals | ✅ Ready | Tampilan sudah responsif dan bersih. |
| Pemilihan Peran (Role Selection) | ✅ Ready | Bisa memilih Pembaca atau Pengelola. |
| Validasi Frontend | ✅ Ready | Pengecekan kolom kosong sudah ada. |
| Sistem Session (Login Terjaga) | ⚠️ Terbatas | Masih pakai `localStorage` sederhana. |
| Enkripsi Password | ❌ Missing | Password masih tersimpan teks biasa (Plain Text). |
| Real Backend Auth | ❌ Missing | Belum ada pengecekan ke database asli. |

### 2. Modul Katalog Buku
| Fitur | Status | Catatan |
| :--- | :--- | :--- |
| Tampilan Grid (Responsive) | ✅ Ready | Sudah pakai sistem grid yang rapi. |
| Filter Kategori | ✅ Ready | Filter berdasarkan kategori sudah jalan. |
| Pencarian (Search Bar) | ✅ Ready | Pencarian judul/penulis sudah jalan (Client-side). |
| Detail Buku (Modal) | ✅ Ready | Menampilkan info lengkap (ISBN, Penerbit, dll). |
| Pengurutan (Sorting) | ✅ Ready | Berdasarkan Terbaru, Harga, dan Judul. |
| Pagination | ⚠️ Terbatas | Sudah ada tapi masih logic frontend saja. |
| Pencarian Sisi Server | ❌ Missing | Belum efisien untuk ribuan buku. |

### 3. Panel Admin (Pengelola)
| Fitur | Status | Catatan |
| :--- | :--- | :--- |
| Ringkasan Statistik | ✅ Ready | Total buku & Buku aktif sudah tampil. |
| Form Tambah Buku | ✅ Ready | Input semua field sudah tersedia. |
| Edit & Hapus Buku | ✅ Ready | Sudah bisa mengubah data dalam session. |
| Proteksi Panel Admin | ⚠️ Lemah | Hanya dicek lewat JS (Bisa dibobol lewat Console). |
| Upload Gambar Asli | ❌ Missing | Masih menggunakan URL gambar dari internet. |
| Grafik Statistik | ❌ Missing | Belum ada visualisasi data (Chart). |

---

## 🛠️ Menu Yang Belum Ada (Prioritas Baru)

1.  **Menu "Akun Saya"**: Untuk pembaca mengubah foto profil, nama lengkap, dan password.
2.  **Menu "Koleksi Saya"**: Daftar buku yang ditandai atau difavoritkan oleh pembaca.
3.  **Menu "Manajemen Kategori"**: (Untuk Admin) Menambah kategori baru tanpa ubah kode program.
4.  **Menu "Daftar Pengguna"**: (Untuk Admin) Melihat siapa saja yang mendaftar dan hapus akun bermasalah.

---

## 💡 Rekomendasi Alur Kerja Tim
Agar kamu dan temanmu mudah mengerjakannya, gunakan **Branching Git** berdasarkan tabel di atas:
*   `feature/backend-auth`: Fokus ke enkripsi dan real database auth.
*   `feature/category-management`: Fokus membuat fitur CRUD Kategori.
*   `feature/image-upload`: Fokus menghubungkan backend ke penyimpanan gambar.

**Dokumentasi ini sudah siap dijadikan patokan timmu!** Ada menu lain yang ingin ditambahkan?
