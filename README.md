Field Work Report System (HVE Electrical SPIL)
Sistem manajemen pelaporan pekerjaan lapangan yang mengintegrasikan pencatatan aktivitas harian, pengelolaan tugas, pemantauan perbaikan unit, dan inventaris suku cadang.

Persiapan Lingkungan
Sebelum menjalankan aplikasi, pastikan perangkat Anda telah terpasang:

- Node.js (Versi LTS)

- MySQL Server

- Git

Instruksi Instalasi

1. Kloning Repositori

git clone <url-repository>
cd <nama-folder-proyek> 2. Konfigurasi Backend
Masuk ke direktori backend untuk menginstal dependensi dan mengatur konfigurasi database.

cd backend
npm install
Buat file .env di dalam folder backend dengan konfigurasi berikut:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password_database_anda
DB_NAME=db_laporan
PORT=3000

3. Konfigurasi Frontend
   Kembali ke direktori utama (root) untuk menginstal dependensi antarmuka pengguna.

cd ..
npm install
Menjalankan Aplikasi
Aplikasi ini terdiri dari dua bagian yang harus berjalan secara bersamaan. Gunakan dua jendela terminal terpisah:

Terminal 1: Server (NestJS)

cd backend
npm run start:dev

Terminal 2: Client (React)

npm run dev

STRUKTUR MODUL SISTEM

- Reports: Mencatat detail pekerjaan harian termasuk lokasi, proyek, dan waktu pelaksanaan.

- Tasks: Manajemen penugasan dengan pembaruan status otomatis berdasarkan persentase progres.

- Progress Logs: Dokumentasi riwayat perkembangan setiap tugas secara kronologis.

- Spareparts: Pengelolaan data stok dan status pemesanan suku cadang (Pending, Ordered, Arrived).

- Repairs: Pelacakan status perbaikan unit alat berat dan penugasan teknisi.

KETENTUAN PENGGUNAAN DATA

- Format Tanggal: Sistem menggunakan standar ISO YYYY-MM-DD untuk seluruh entri data tanggal guna memastikan integritas pada basis data MySQL.
- Keamanan: Seluruh permintaan API divalidasi melalui Data Transfer Objects (DTO) untuk menjamin validitas informasi yang masuk ke sistem.
