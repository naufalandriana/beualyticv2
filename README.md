# Beaulytic - Beauty Admin Dashboard

Beaulytic adalah dashboard admin untuk e-commerce kosmetik yang dibangun dengan React, Vite, Tailwind CSS, dan Firebase.

## Fitur

- Autentikasi dengan Email/Password dan Google
- Dashboard analitik
- Manajemen produk
- Manajemen pengguna
- Notifikasi
- Pengaturan profil

## Instalasi

1. Clone repositori ini
2. Install dependensi dengan `npm install`
3. Salin file `.env.example` ke `.env` dan isi dengan konfigurasi Firebase Anda
4. Jalankan aplikasi dengan `npm run dev`

## Konfigurasi Firebase

### Mengaktifkan Autentikasi Google

Untuk mengaktifkan autentikasi Google, ikuti langkah-langkah berikut:

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Klik "Authentication" di menu sidebar
4. Klik tab "Sign-in method"
5. Klik "Google" dalam daftar provider
6. Aktifkan toggle "Enable"
7. Isi "Project support email" dengan email Anda
8. Klik "Save"

![Firebase Authentication Setup](https://firebasestorage.googleapis.com/v0/b/firebase-docs.appspot.com/o/auth%2Fgoogle-provider-config.png?alt=media&token=4511766b-bbf7-4a0e-9fb3-6a1e8c5b9b9c)

### Mengaktifkan Autentikasi Email/Password

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Klik "Authentication" di menu sidebar
4. Klik tab "Sign-in method"
5. Klik "Email/Password" dalam daftar provider
6. Aktifkan toggle "Enable"
7. Klik "Save"

## Struktur Proyek

```
src/
├── components/     # Komponen UI
├── hooks/          # Custom hooks
├── lib/            # Utilitas dan konfigurasi
├── pages/          # Halaman aplikasi
└── main.tsx        # Entry point
```

## Kontribusi

Kontribusi selalu diterima! Silakan buat pull request untuk perbaikan atau penambahan fitur.

## Lisensi

MIT
