# NextAuth Setup untuk Anggar Jawa Barat

## Overview
Aplikasi ini menggunakan NextAuth.js untuk autentikasi dengan Prisma sebagai database adapter.

## Setup yang Sudah Dikonfigurasi

### 1. Dependencies
- `next-auth` - Framework autentikasi
- `@auth/prisma-adapter` - Adapter untuk Prisma
- `bcryptjs` - Untuk hashing password

### 2. Konfigurasi NextAuth
File `lib/auth.ts` berisi konfigurasi NextAuth dengan:
- Credentials provider untuk login dengan email/password
- Prisma adapter
- JWT session strategy
- Custom callbacks untuk session dan JWT

### 3. API Routes
- `/api/auth/[...nextauth]` - Route NextAuth
- `/api/auth/register` - Route untuk registrasi user baru

### 4. Middleware
File `middleware.ts` untuk melindungi halaman admin

### 5. Components
- `components/session-provider.tsx` - Provider untuk NextAuth
- `components/auth-status.tsx` - Komponen untuk menampilkan status login/logout
- `hooks/use-auth.ts` - Custom hook untuk autentikasi

## Setup Environment

1. Buat file `.env.local` dengan isi:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/anggar_jabar"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
```

2. Generate secret key untuk NextAuth:
```bash
openssl rand -base64 32
```

## Database Setup

1. Jalankan migrasi database:
```bash
npx prisma db push
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Buat user admin pertama:
```bash
npm run create-admin
```

## Login Credentials

Setelah menjalankan script create-admin, Anda bisa login dengan:
- Email: `admin@anggar-jabar.com`
- Password: `admin123`

## Fitur yang Tersedia

### 1. Authentication
- Login dengan email/password
- Session management
- Protected routes untuk halaman admin
- Logout functionality

### 2. UI Components
- Login page dengan form yang responsive
- Auth status component dengan dropdown
- Integration dengan admin layout

### 3. Security
- Password hashing dengan bcrypt
- JWT session strategy
- Middleware protection untuk routes admin

## Penggunaan

### Login
1. Buka `/login`
2. Masukkan email dan password
3. Setelah berhasil, akan redirect ke `/admin`

### Logout
1. Klik avatar user di header admin
2. Pilih "Log out"

### Protected Routes
Semua route yang dimulai dengan `/admin` akan dilindungi dan memerlukan login.

## Customization

### Menambah Provider OAuth
Untuk menambah Google, GitHub, dll:

1. Tambahkan provider di `lib/auth.ts`:
```typescript
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ... existing providers
  ],
}
```

2. Tambahkan environment variables:
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Menambah Role-based Access
Untuk menambah role-based access control:

1. Tambahkan field role ke model User di schema Prisma
2. Update auth callbacks untuk include role
3. Update middleware untuk check role

## Troubleshooting

### Error: "Invalid credentials"
- Pastikan user sudah dibuat dengan script create-admin
- Check password yang dimasukkan

### Error: "Database connection failed"
- Pastikan DATABASE_URL sudah benar
- Pastikan database sudah running

### Error: "NextAuth secret not set"
- Pastikan NEXTAUTH_SECRET sudah diset di .env.local
- Generate secret key baru jika diperlukan 