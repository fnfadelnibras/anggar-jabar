# Panduan Penggunaan Settings Admin

## Cara Mengakses Settings

### 1. Melalui Menu Sidebar
1. Login sebagai admin
2. Klik menu "Settings" di sidebar kiri
3. Halaman settings akan terbuka dengan tab "Profile" aktif

### 2. Melalui Header Dropdown
1. Klik avatar admin di pojok kanan atas header
2. Pilih "Profile" atau "Settings" dari dropdown menu
3. Halaman settings akan terbuka

## Fitur Profile

### 1. Profile Overview
Bagian ini menampilkan:
- **Avatar**: Foto profil admin dengan tombol edit
- **Informasi Dasar**: Nama, email, role, dan tanggal bergabung
- **Kontak**: Nomor telepon dan lokasi
- **Aktivitas**: Waktu login terakhir

### 2. Edit Profile
Form untuk mengubah informasi profil:

#### Field yang Tersedia:
- **Full Name**: Nama lengkap admin
- **Email**: Alamat email (harus unik)
- **Phone Number**: Nomor telepon
- **Location**: Lokasi/alamat
- **Bio**: Deskripsi singkat tentang admin

#### Cara Menggunakan:
1. Klik tab "Profile" jika belum aktif
2. Scroll ke bagian "Edit Profile"
3. Isi field yang ingin diubah
4. Klik "Save Changes" untuk menyimpan
5. Atau klik "Reset" untuk membatalkan perubahan

### 3. Avatar Management
Cara mengubah avatar:
1. Hover pada avatar di bagian "Profile Overview"
2. Klik ikon kamera di pojok kanan bawah avatar
3. Pilih file gambar (JPG, PNG, WebP)
4. File akan otomatis diupload dan avatar akan berubah

**Catatan**: 
- Ukuran file maksimal 5MB
- Format yang didukung: JPG, PNG, WebP
- Avatar akan ditampilkan sebagai base64

### 4. Permissions & Access
Bagian ini menampilkan:
- **Role**: Peran admin dalam sistem
- **Permissions**: Daftar permission yang dimiliki

## Fitur Security

### 1. Change Password
Cara mengubah password:

1. Klik tab "Preferences"
2. Scroll ke bagian "Security"
3. Klik tombol "Change" di sebelah "Change Password"
4. Dialog akan terbuka dengan form:
   - **Current Password**: Password saat ini
   - **New Password**: Password baru
   - **Confirm New Password**: Konfirmasi password baru

#### Validasi Password:
- Password baru minimal 8 karakter
- Password baru dan konfirmasi harus sama
- Password saat ini harus benar

#### Tips Keamanan:
- Gunakan kombinasi huruf besar, kecil, angka, dan simbol
- Jangan gunakan password yang mudah ditebak
- Jangan bagikan password dengan siapapun

## Fitur Preferences (Coming Soon)

### 1. Notification Settings
- Email notifications
- Push notifications
- SMS notifications

### 2. Appearance Settings
- Theme selection (light/dark)
- Language preferences
- Timezone settings

### 3. Advanced Security
- Two-factor authentication
- Session management
- Login history

## Troubleshooting

### 1. Avatar Tidak Muncul
**Penyebab:**
- File terlalu besar (> 5MB)
- Format file tidak didukung
- Error saat upload

**Solusi:**
1. Pastikan file < 5MB
2. Gunakan format JPG, PNG, atau WebP
3. Coba upload ulang
4. Refresh halaman jika masih bermasalah

### 2. Password Change Gagal
**Penyebab:**
- Password saat ini salah
- Password baru terlalu pendek
- Password baru dan konfirmasi tidak sama

**Solusi:**
1. Pastikan password saat ini benar
2. Password baru minimal 8 karakter
3. Pastikan password baru dan konfirmasi sama
4. Coba lagi

### 3. Profile Tidak Update
**Penyebab:**
- Field required tidak diisi
- Email sudah digunakan admin lain
- Error server

**Solusi:**
1. Isi semua field required (nama dan email)
2. Gunakan email yang unik
3. Coba lagi beberapa saat
4. Hubungi administrator jika masih bermasalah

### 4. Halaman Tidak Load
**Penyebab:**
- Koneksi internet bermasalah
- Session expired
- Error server

**Solusi:**
1. Refresh halaman
2. Login ulang jika session expired
3. Cek koneksi internet
4. Hubungi administrator

## Best Practices

### 1. Profile Management
- Update informasi profil secara berkala
- Gunakan foto profil yang profesional
- Isi bio dengan informasi yang relevan
- Pastikan informasi kontak akurat

### 2. Security
- Ganti password secara berkala
- Gunakan password yang kuat
- Jangan bagikan kredensial login
- Logout setelah selesai menggunakan sistem

### 3. Data Privacy
- Jangan bagikan informasi pribadi
- Hati-hati dengan informasi yang diupload
- Laporkan masalah keamanan ke administrator

## Keyboard Shortcuts

### 1. Navigation
- `Tab`: Navigasi antar field
- `Enter`: Submit form
- `Escape`: Tutup dialog
- `Ctrl/Cmd + S`: Save changes (dalam form)

### 2. Accessibility
- Semua elemen dapat diakses dengan keyboard
- Screen reader friendly
- High contrast mode support

## Support

### 1. Bantuan Langsung
- Hubungi administrator sistem
- Email: admin@indonesiafencing.com
- Phone: +62 812-3456-7890

### 2. Dokumentasi
- Lihat file `ADMIN_SETTINGS.md` untuk dokumentasi teknis
- Cek console browser untuk error details
- Review API responses untuk debugging

### 3. Feedback
- Berikan feedback untuk perbaikan fitur
- Laporkan bug yang ditemukan
- Saran untuk enhancement baru 