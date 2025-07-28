# CRUD Athletes dan Regions - Setup Guide

## Fitur yang Sudah Diimplementasikan

### 1. API Routes
- **`/api/athletes`** - CRUD untuk athletes
- **`/api/regions`** - CRUD untuk regions

### 2. Fitur CRUD
- ✅ **Create** - Tambah data baru
- ✅ **Read** - Tampilkan data dengan pagination
- ✅ **Update** - Edit data yang ada
- ✅ **Delete** - Hapus data

### 3. Fitur Tambahan
- ✅ **Search** - Pencarian berdasarkan nama, region, dan category
- ✅ **Filter** - Filter berdasarkan category, region, status, dan athletes count
- ✅ **Sorting** - Urutkan berdasarkan kolom (klik header tabel)
- ✅ **Pagination** - Maksimal 15 data per halaman
- ✅ **Real-time Updates** - Data terupdate otomatis setelah operasi CRUD
- ✅ **Clear Filters** - Tombol untuk menghapus semua filter sekaligus

## Setup Database

### 1. Buat file `.env`
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/anggar_jabar"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Generate Prisma Client
```bash
npm run generate
```

### 3. Migrate Database
```bash
npx prisma migrate dev
```

### 4. Seed Database (Opsional)
```bash
npm run seed
```

## Cara Menggunakan

### 1. Halaman Admin Athletes
- **URL**: `/admin/athletes`
- **Fitur**:
  - Tampilkan daftar athletes dengan pagination (15 per halaman)
  - **Search**: Pencarian berdasarkan nama, region, atau category
  - **Filter**:
    - Category: Filter berdasarkan EPEE, SABRE, FOIL
    - Region: Filter berdasarkan region yang dipilih
    - Status: Filter berdasarkan ACTIVE/INACTIVE
  - **Sorting**: Klik header tabel untuk sorting (ascending/descending)
  - **Clear Filters**: Tombol untuk menghapus semua filter
  - Tambah athlete baru (tombol "Add Athlete")
  - Edit athlete (klik menu dropdown → Edit)
  - Delete athlete (klik menu dropdown → Delete)

### 2. Halaman Admin Regions
- **URL**: `/admin/regions`
- **Fitur**:
  - Tampilkan daftar regions dengan pagination (15 per halaman)
  - **Search**: Pencarian berdasarkan nama atau kode region
  - **Filter**:
    - Athletes Count: Filter berdasarkan jumlah athletes di region
  - **Sorting**: Klik header tabel untuk sorting (ascending/descending)
  - **Clear Filters**: Tombol untuk menghapus semua filter
  - Tambah region baru (tombol "Add Region")
  - Edit region (klik menu dropdown → Edit)
  - Delete region (klik menu dropdown → Delete)

## Struktur Database

### Model Athlete
```prisma
model Athlete {
  id        String    @id @default(cuid())
  name      String
  birthDate DateTime
  gender    Gender
  category  Category
  status    Status
  region    Region    @relation(fields: [regionId], references: [id])
  regionId  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Model Region
```prisma
model Region {
  id       String    @id @default(cuid())
  name     String
  code     String    @unique
  athletes Athlete[]
}
```

## API Endpoints

### Athletes API
- `GET /api/athletes` - Ambil semua athletes
- `POST /api/athletes` - Tambah athlete baru
- `PUT /api/athletes` - Update athlete
- `DELETE /api/athletes` - Hapus athlete

### Regions API
- `GET /api/regions` - Ambil semua regions
- `POST /api/regions` - Tambah region baru
- `PUT /api/regions` - Update region
- `DELETE /api/regions` - Hapus region

## Komponen yang Digunakan

### 1. `components/athlete-client.tsx`
- Komponen utama untuk halaman admin athletes
- Fitur: CRUD, search, filter (category, region, status), sorting, pagination

### 2. `components/regions-client.tsx`
- Komponen utama untuk halaman admin regions
- Fitur: CRUD, search, filter (athletes count), sorting, pagination

### 3. `app/admin/athletes/page.tsx`
- Server component untuk halaman admin athletes

### 4. `app/admin/regions/page.tsx`
- Server component untuk halaman admin regions

## Fitur Filter Detail

### Athletes Filter
- **Category Filter**: Dropdown dengan opsi EPEE, SABRE, FOIL
- **Region Filter**: Dropdown dengan daftar semua regions
- **Status Filter**: Dropdown dengan opsi ACTIVE, INACTIVE
- **Search**: Pencarian real-time berdasarkan nama, region, category

### Regions Filter
- **Athletes Count Filter**: Dropdown dengan jumlah athletes yang tersedia
- **Search**: Pencarian real-time berdasarkan nama region atau kode

### Filter Behavior
- Filter bersifat **AND** (semua kondisi harus terpenuhi)
- Reset pagination ke halaman 1 saat filter berubah
- Tombol "Clear Filters" muncul hanya saat ada filter aktif
- Filter bekerja bersamaan dengan search dan sorting

## Troubleshooting

### 1. Database Connection Error
- Pastikan PostgreSQL sudah berjalan
- Cek konfigurasi DATABASE_URL di file .env
- Jalankan `npx prisma db push` untuk sync schema

### 2. Prisma Client Error
- Jalankan `npm run generate` untuk generate Prisma client
- Restart development server

### 3. API Error
- Cek console browser untuk error detail
- Pastikan database sudah terisi data
- Cek network tab untuk response API

### 4. Filter Tidak Berfungsi
- Pastikan data di database sudah sesuai dengan enum values
- Cek apakah ada data yang null/undefined
- Refresh halaman jika filter tidak muncul

## Next Steps

1. **Authentication** - Tambah login system
2. **Authorization** - Role-based access control
3. **File Upload** - Upload foto athlete
4. **Export Data** - Export ke Excel/PDF
5. **Bulk Operations** - Import/export data massal
6. **Audit Log** - Log perubahan data
7. **Real-time Updates** - WebSocket untuk real-time updates
8. **Advanced Filtering** - Date range filter, multiple selection
9. **Saved Filters** - Simpan filter favorit
10. **Export Filtered Data** - Export data sesuai filter yang aktif 