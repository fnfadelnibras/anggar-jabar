# Admin Management System

## Overview
Sistem manajemen admin yang disederhanakan untuk mengelola administrator dalam aplikasi Indonesia Fencing. Sistem ini memungkinkan admin untuk menambah, mengedit, dan mengelola admin lain tanpa kompleksitas role dan permission.

## Features

### 1. Admin Management Page (`/admin/admins`)
- **View All Admins**: Menampilkan daftar semua admin dalam sistem
- **Add New Admin**: Form untuk menambah admin baru
- **Edit Admin**: Mengedit informasi admin yang ada
- **Delete Admin**: Menghapus admin dari sistem
- **Toggle Status**: Mengaktifkan/menonaktifkan admin

### 2. Simplified Admin Interface
- **No Role System**: Semua admin memiliki akses yang sama
- **No Permission System**: Tidak ada pembatasan permission
- **Basic Profile Management**: Nama, email, password, phone, bio, location

## API Endpoints

### GET `/api/admin/admins`
Mengambil daftar semua admin.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "avatar": "string",
    "bio": "string",
    "location": "string",
    "lastLogin": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "status": "active"
  }
]
```

### POST `/api/admin/admins`
Membuat admin baru.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "bio": "string",
  "location": "string"
}
```

### PUT `/api/admin/admins/[id]`
Mengupdate admin yang ada.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (optional)",
  "phone": "string",
  "bio": "string",
  "location": "string"
}
```

### DELETE `/api/admin/admins/[id]`
Menghapus admin.

### PUT `/api/admin/admins/[id]/status`
Toggle status admin (active/inactive).

**Request Body:**
```json
{
  "status": "active" | "inactive"
}
```

## Components

### AdminManagement (`app/admin/admins/page.tsx`)
Komponen utama untuk halaman manajemen admin.

**Features:**
- Tabel daftar admin dengan informasi lengkap
- Dialog untuk menambah/edit admin
- Fungsi delete dan toggle status
- Loading states dan error handling

### AdminProfileDropdown (`components/admin-profile-dropdown.tsx`)
Dropdown menu di header untuk menampilkan profil admin.

### AdminSidebarProfile (`components/admin-sidebar-profile.tsx`)
Tampilan profil admin di sidebar.

## Database Schema

### User Model (Simplified)
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  phone         String?
  avatar        String?
  bio           String?
  location      String?
  lastLogin     DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @default(now())
  accounts      Account[]
  sessions      Session[]
}
```

## Security

### Authentication
- Semua endpoint memerlukan autentikasi
- Menggunakan NextAuth.js untuk session management
- Session validation di setiap API call

### Password Security
- Password di-hash menggunakan bcryptjs
- Salt rounds: 12
- Password validation di frontend dan backend

## Error Handling

### Common Error Responses
```json
{
  "error": "Unauthorized"
}
```
Status: 401 - User tidak terautentikasi

```json
{
  "error": "Name, email, and password are required"
}
```
Status: 400 - Data yang diperlukan tidak lengkap

```json
{
  "error": "Email already exists"
}
```
Status: 400 - Email sudah terdaftar

## Usage Examples

### Adding a New Admin
1. Navigate to `/admin/admins`
2. Click "Add Admin" button
3. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "securepassword"
   - Phone: "+62 812-3456-7890"
   - Bio: "Experienced fencing administrator"
   - Location: "Jakarta, Indonesia"
4. Click "Save"

### Editing an Admin
1. Click the edit icon (pencil) next to an admin
2. Modify the information
3. Click "Save"

### Deleting an Admin
1. Click the delete icon (trash) next to an admin
2. Confirm the deletion

## Future Enhancements

Sistem ini dirancang untuk dapat dengan mudah ditambahkan fitur role dan permission di masa depan:

1. **Role System**: Menambahkan field `role` ke User model
2. **Permission System**: Menambahkan field `permissions` ke User model
3. **Access Control**: Implementasi middleware untuk role-based access
4. **Permission Checks**: Validasi permission di setiap endpoint

## Notes

- Sistem ini disederhanakan untuk memudahkan pengembangan awal
- Semua admin memiliki akses yang sama
- Tidak ada pembatasan permission
- Fokus pada manajemen profil admin yang basic 