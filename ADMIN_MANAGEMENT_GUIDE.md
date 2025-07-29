# Panduan Penggunaan Admin Management

## Overview
Panduan ini menjelaskan cara menggunakan fitur manajemen admin yang disederhanakan dalam sistem Indonesia Fencing.

## Akses Halaman Admin Management

1. **Login sebagai Admin**
   - Buka halaman login di `/login`
   - Masukkan email dan password admin
   - Klik "Sign In"

2. **Navigasi ke Admin Management**
   - Setelah login, Anda akan diarahkan ke dashboard admin
   - Di sidebar kiri, klik menu "Admins"
   - Atau akses langsung ke `/admin/admins`

## Fitur Utama

### 1. Melihat Daftar Admin
- Halaman menampilkan tabel dengan semua admin dalam sistem
- Informasi yang ditampilkan:
  - **Avatar**: Foto profil admin
  - **Nama**: Nama lengkap admin
  - **Email**: Alamat email untuk login
  - **Contact**: Nomor telepon
  - **Status**: Status aktif/nonaktif
  - **Last Login**: Waktu login terakhir
  - **Created**: Tanggal pembuatan akun
  - **Actions**: Tombol untuk edit/delete

### 2. Menambah Admin Baru

#### Langkah-langkah:
1. **Klik "Add Admin"**
   - Tombol berada di pojok kanan atas halaman
   - Dialog form akan muncul

2. **Isi Form**
   - **Name** (Wajib): Nama lengkap admin
   - **Email** (Wajib): Email unik untuk login
   - **Password** (Wajib): Password untuk admin baru
   - **Phone** (Opsional): Nomor telepon
   - **Bio** (Opsional): Deskripsi singkat
   - **Location** (Opsional): Lokasi admin

3. **Simpan**
   - Klik tombol "Save" untuk menyimpan
   - Atau klik "Cancel" untuk membatalkan

#### Contoh Data:
```
Name: John Doe
Email: john@indonesiafencing.com
Password: securepassword123
Phone: +62 812-3456-7890
Bio: Admin untuk kontingen Jakarta
Location: Jakarta, Indonesia
```

### 3. Mengedit Admin

#### Langkah-langkah:
1. **Klik Icon Edit**
   - Icon pensil di kolom Actions
   - Dialog form akan muncul dengan data yang sudah ada

2. **Modifikasi Data**
   - Ubah field yang diperlukan
   - Password bisa dikosongkan jika tidak ingin mengubah
   - Semua field lain bisa diubah

3. **Simpan Perubahan**
   - Klik "Save" untuk menyimpan perubahan
   - Atau klik "Cancel" untuk membatalkan

### 4. Menghapus Admin

#### Langkah-langkah:
1. **Klik Icon Delete**
   - Icon tempat sampah di kolom Actions
   - Konfirmasi dialog akan muncul

2. **Konfirmasi Penghapusan**
   - Klik "Delete" untuk mengkonfirmasi
   - Atau klik "Cancel" untuk membatalkan

#### ⚠️ Peringatan:
- Penghapusan bersifat permanen
- Data admin yang dihapus tidak dapat dipulihkan
- Pastikan admin yang dihapus sudah tidak diperlukan

### 5. Toggle Status Admin

#### Langkah-langkah:
1. **Klik Dropdown Actions**
   - Icon tiga titik di kolom Actions
   - Pilih "Toggle Status"

2. **Status Akan Berubah**
   - Active → Inactive
   - Inactive → Active

## Fitur Tambahan

### 1. Search dan Filter
- **Search**: Ketik di kotak search untuk mencari admin berdasarkan nama atau email
- **Filter**: Filter berdasarkan status (Active/Inactive)

### 2. Responsive Design
- Halaman responsif untuk desktop dan mobile
- Tabel akan menyesuaikan ukuran layar
- Dialog form yang mobile-friendly

### 3. Loading States
- Loading spinner saat mengambil data
- Loading state saat menyimpan perubahan
- Feedback visual untuk semua aksi

## Tips Penggunaan

### 1. Best Practices
- **Password Kuat**: Gunakan password yang sulit ditebak
- **Email Unik**: Pastikan setiap admin memiliki email yang berbeda
- **Data Lengkap**: Isi informasi sebanyak mungkin untuk kemudahan identifikasi

### 2. Keamanan
- **Logout**: Selalu logout setelah selesai menggunakan sistem
- **Password**: Jangan bagikan password admin kepada orang lain
- **Session**: Tutup browser jika menggunakan komputer bersama

### 3. Troubleshooting

#### Masalah Umum:
1. **Form tidak bisa disimpan**
   - Pastikan semua field wajib sudah diisi
   - Cek koneksi internet
   - Refresh halaman jika perlu

2. **Email sudah terdaftar**
   - Gunakan email yang berbeda
   - Atau edit admin yang sudah ada

3. **Password tidak berubah**
   - Pastikan field password diisi saat edit
   - Kosongkan field password jika tidak ingin mengubah

## Struktur Data

### Admin Profile
```json
{
  "id": "unique_id",
  "name": "Nama Lengkap",
  "email": "email@domain.com",
  "phone": "+62 812-3456-7890",
  "avatar": "/path/to/avatar.jpg",
  "bio": "Deskripsi admin",
  "location": "Jakarta, Indonesia",
  "lastLogin": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "status": "active"
}
```

## Notifikasi

### Success Messages
- ✅ "Admin created successfully"
- ✅ "Admin updated successfully"
- ✅ "Admin deleted successfully"
- ✅ "Status updated successfully"

### Error Messages
- ❌ "Name, email, and password are required"
- ❌ "Email already exists"
- ❌ "Failed to create admin"
- ❌ "Failed to update admin"

## Keyboard Shortcuts

- **Escape**: Tutup dialog
- **Enter**: Submit form
- **Tab**: Navigasi antar field

## Support

Jika mengalami masalah atau memiliki pertanyaan:
1. Cek bagian Troubleshooting di atas
2. Pastikan koneksi internet stabil
3. Refresh halaman jika diperlukan
4. Hubungi technical support jika masalah berlanjut

## Catatan Penting

- Sistem ini disederhanakan tanpa role dan permission
- Semua admin memiliki akses yang sama
- Fokus pada manajemen profil admin yang basic
- Sistem dapat dikembangkan untuk menambahkan role dan permission di masa depan 