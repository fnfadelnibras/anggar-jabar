# Admin Settings Documentation

## Overview
Halaman settings admin menyediakan antarmuka lengkap untuk mengelola profil dan preferensi admin. Fitur ini mencakup pengelolaan profil, avatar, password, dan berbagai pengaturan lainnya.

## Fitur Utama

### 1. Profile Management
- **Profile Overview**: Menampilkan informasi lengkap admin termasuk avatar, nama, email, role, dan informasi lainnya
- **Edit Profile**: Form untuk mengubah informasi profil seperti nama, email, nomor telepon, lokasi, dan bio
- **Avatar Upload**: Kemampuan untuk mengupload dan mengubah avatar profil
- **Permissions Display**: Menampilkan daftar permission yang dimiliki admin

### 2. Security Features
- **Change Password**: Dialog untuk mengubah password dengan validasi
- **Password Validation**: Validasi kekuatan password dan konfirmasi
- **Current Password Verification**: Memverifikasi password saat ini sebelum mengubah

### 3. Preferences (Future Features)
- **Notification Settings**: Pengaturan notifikasi email, push, dan SMS
- **Appearance Settings**: Pengaturan tema, bahasa, dan timezone
- **Security Settings**: Two-factor authentication dan session management

## API Endpoints

### 1. Profile Management
```
GET /api/admin/profile - Get admin profile
PUT /api/admin/profile - Update admin profile
```

### 2. Avatar Management
```
POST /api/admin/profile/avatar - Upload avatar
DELETE /api/admin/profile/avatar - Remove avatar
```

### 3. Password Management
```
PUT /api/admin/profile/password - Change password
```

## Components

### 1. AdminSettings Page (`app/admin/settings/page.tsx`)
- Halaman utama settings dengan tab untuk Profile dan Preferences
- Menggunakan AdminLayout untuk konsistensi dengan halaman admin lainnya
- Menampilkan loading state dan error handling

### 2. AdminProfileDropdown (`components/admin-profile-dropdown.tsx`)
- Dropdown menu di header admin untuk akses cepat ke profil
- Menampilkan avatar, nama, email, dan role admin
- Link ke halaman settings

### 3. AdminSidebarProfile (`components/admin-sidebar-profile.tsx`)
- Komponen profil di sidebar admin
- Menampilkan avatar dan informasi admin
- Loading state dengan skeleton

### 4. ChangePasswordDialog (`components/change-password-dialog.tsx`)
- Dialog modal untuk mengubah password
- Validasi password strength dan konfirmasi
- Toggle visibility untuk password fields

## Database Schema

### User Model (Prisma)
```prisma
model User {
  id          String   @id @default(cuid())
  name        String?
  email       String   @unique
  password    String
  phone       String?
  role        String?
  avatar      String?
  bio         String?
  location    String?
  permissions String[]
  lastLogin   DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Security Features

### 1. Authentication
- Semua endpoint memerlukan autentikasi via NextAuth
- Session validation untuk setiap request
- Role-based access control

### 2. Password Security
- Password di-hash menggunakan bcryptjs
- Validasi password strength (minimal 8 karakter)
- Verifikasi password saat ini sebelum mengubah

### 3. File Upload Security
- Validasi tipe file (hanya gambar)
- Batasan ukuran file (max 5MB)
- Konversi ke base64 untuk storage

## Error Handling

### 1. API Error Responses
```json
{
  "error": "Error message",
  "status": 400
}
```

### 2. Frontend Error Handling
- Toast notifications untuk success/error
- Loading states untuk semua operasi async
- Fallback UI untuk data yang tidak tersedia

## Usage Examples

### 1. Mengakses Settings
```typescript
// Navigate to settings page
router.push('/admin/settings')
```

### 2. Update Profile
```typescript
const response = await fetch('/api/admin/profile', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Name',
    email: 'newemail@example.com',
    phone: '+62 812-3456-7890',
    bio: 'Updated bio',
    location: 'Jakarta, Indonesia'
  })
})
```

### 3. Upload Avatar
```typescript
const formData = new FormData()
formData.append('avatar', file)

const response = await fetch('/api/admin/profile/avatar', {
  method: 'POST',
  body: formData
})
```

### 4. Change Password
```typescript
const response = await fetch('/api/admin/profile/password', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    currentPassword: 'oldpassword',
    newPassword: 'newpassword',
    confirmPassword: 'newpassword'
  })
})
```

## Future Enhancements

### 1. Notification System
- Email notification preferences
- Push notification settings
- SMS notification integration

### 2. Appearance Customization
- Theme selection (light/dark)
- Language preferences
- Timezone settings

### 3. Advanced Security
- Two-factor authentication
- Session management
- Login history

### 4. Profile Enhancements
- Social media links
- Professional information
- Activity history

## Troubleshooting

### 1. Common Issues
- **Avatar tidak muncul**: Pastikan file adalah gambar valid dan ukuran < 5MB
- **Password change failed**: Pastikan password saat ini benar dan password baru minimal 8 karakter
- **Profile tidak update**: Pastikan semua field required terisi

### 2. Debug Steps
1. Check browser console untuk error
2. Verify API endpoint responses
3. Check database connection
4. Validate session authentication

## Dependencies

### Required Packages
```json
{
  "bcryptjs": "^2.4.3",
  "next-auth": "^4.24.5",
  "@prisma/client": "^5.7.1"
}
```

### UI Components
- shadcn/ui components
- Lucide React icons
- Custom hooks (useToast)

## Contributing

### Adding New Features
1. Create new API endpoint
2. Add corresponding UI components
3. Update documentation
4. Add tests

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Add loading states for async operations 