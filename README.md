# Sistem Informasi Web Desa (Samplesitusdesa)

Proyek ini adalah portal website resmi untuk desa yang dirancang secara interaktif, dinamis, dan modern. Dibangun menggunakan **Next.js App Router**, proyek ini memiliki dua sisi utama: **Portal Publik** (untuk masyarakat) dan **Desa Panel** (dashboard admin).

## 🚀 Fitur Utama

### 1. Portal Publik (Warga)
- **Beranda Interaktif:** Hero section dinamis, statistik kependudukan *real-time*, ringkasan berita, dan pengumuman.
- **Profil Desa:** Sejarah desa, visi-misi, dan informasi Badan Permusyawaratan Desa (BPD).
- **Transparansi APBDes:** Visualisasi anggaran (pendapatan, belanja, pembiayaan).
- **Potensi Desa:** Etalase UMKM desa dan promosi Pariwisata.
- **Layanan & Aduan:** Portal pengaduan masyarakat dan akses informasi publik (PPID).

### 2. Desa Panel (Administrator - `/admin`)
- **Manajemen Beranda:** Pengaturan teks hero, jam pelayanan, dan sambutan kades.
- **Data Kependudukan:** CRUD data penduduk dan KK. Dilengkapi fitur inovatif **Scanner KK (OCR)** menggunakan AI Tesseract.js.
- **Manajemen Profil & BPD:** Mengubah sejarah, visi misi, dan susunan anggota BPD/Perangkat Desa.
- **Manajemen Potensi:** CRUD untuk daftar UMKM dan destinasi Wisata.
- **Manajemen Informasi:** Mengelola Berita dan Pengumuman publik.

## 🛠️ Teknologi yang Digunakan

- **Framework:** Next.js (App Router)
- **Database ORM:** Prisma
- **Database Engine:** SQLite (Lokal, mudah untuk pengembangan)
- **Styling:** Tailwind CSS v4
- **Icon:** Lucide React
- **Fitur Khusus AI:** Tesseract.js (Untuk OCR Foto Kartu Keluarga)

## 📂 Struktur Direktori Penting

- `src/app/`: Berisi sistem routing Next.js.
  - `(public)/`: Halaman web publik (Beranda, Profil, Potensi, Berita).
  - `admin/`: Halaman Desa Panel.
- `src/components/`: Komponen UI modular (Hero, Navbar, Chart, dll).
- `src/actions/`: **Pusat Logika Database**. Semua pemanggilan Prisma diletakkan di sini (Server Actions).
- `prisma/`: Skema database `schema.prisma` dan file database SQLite (`dev.db`).

## 💻 Cara Menjalankan Proyek

1. **Persiapan:** Pastikan Anda memiliki Node.js terinstal.
2. **Install Dependensi:**
   ```bash
   npm install
   ```
3. **Sinkronisasi Database (Prisma):**
   *(Lakukan ini jika ada perubahan pada skema atau baru pertama kali install)*
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) untuk melihat portal publik.
6. Buka [http://localhost:3000/admin](http://localhost:3000/admin) untuk masuk ke Desa Panel.

## 🚀 Cara Deployment (Produksi)

Karena aplikasi ini menggunakan **SQLite** sebagai database lokal, sangat disarankan untuk melakukan *deployment* pada **VPS (Virtual Private Server)** atau server mandiri. Platform *serverless* (seperti Vercel atau Netlify) tidak cocok untuk SQLite karena sistem file mereka bersifat *ephemeral* (sementara), yang bisa menyebabkan data hilang setiap kali ada *deployment* baru.

### Deployment di VPS menggunakan PM2

1. **Persiapan Server:** Pastikan VPS/Server Anda sudah terinstal Node.js, npm, dan Git.
2. **Clone Repository:**
   ```bash
   git clone <url-repository-anda>
   cd samplesitusdesa
   ```
3. **Install Dependensi:**
   ```bash
   npm install
   ```
4. **Setup Database (Prisma):**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Opsional)* Anda juga dapat menjalankan `npx prisma db seed` jika ingin memasukkan data awal.
5. **Build Aplikasi Next.js:**
   ```bash
   npm run build
   ```
6. **Jalankan Aplikasi dengan PM2 (Process Manager):**
   ```bash
   # Install PM2 secara global jika belum ada
   npm install -g pm2
   
   # Jalankan aplikasi di background
   pm2 start npm --name "situs-desa" -- run start
   
   # Simpan konfigurasi agar PM2 berjalan otomatis saat server di-restart
   pm2 save
   pm2 startup
   ```

Aplikasi sekarang akan berjalan di port `3000`. Untuk mengaksesnya menggunakan domain (misalnya `www.desa.id`), Anda disarankan untuk melakukan *setup Reverse Proxy* menggunakan Nginx atau Apache yang diarahkan ke `http://localhost:3000`.

---
*Catatan: Pastikan untuk merestart server `npm run dev` jika Anda baru saja mengubah skema database pada Windows untuk menghindari error `EPERM` pada Prisma Client.*
