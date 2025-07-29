# IKASI JABAR - Sistem Manajemen Kompetisi Anggar

Sistem manajemen kompetisi anggar regional Jawa Barat yang dikembangkan oleh FnCorporation untuk IKASI (Ikatan Anggar Seluruh Indonesia) Jawa Barat.

## 🏆 Tentang Proyek

Sistem ini dirancang untuk mengelola data atlet, wilayah, dan kompetisi anggar di Jawa Barat dengan fitur-fitur modern dan user-friendly.

### Fitur Utama

- **Manajemen Data Atlet**: Pendaftaran, pengelolaan, dan monitoring data atlet
- **Manajemen Wilayah**: Pengelolaan data wilayah dan organisasi anggar
- **Dashboard Admin**: Panel admin untuk monitoring dan pengelolaan sistem
- **Sistem Keamanan**: Autentikasi dan otorisasi berbasis role
- **Responsive Design**: Interface yang responsif untuk desktop dan mobile
- **Real-time Updates**: Update data secara real-time

## 🚀 Teknologi yang Digunakan

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Prisma ORM
- **State Management**: Redux Toolkit
- **Authentication**: JWT
- **Deployment**: Vercel (recommended)

## 📋 Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda memiliki:

- Node.js 18+ 
- pnpm (recommended) atau npm
- Database (PostgreSQL, MySQL, atau SQLite)

## 🛠️ Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/fncorporation/anggar-jabar.git
   cd anggar-jabar
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # atau
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit file `.env.local` dan sesuaikan konfigurasi database:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/anggar_jabar"
   JWT_SECRET="your-secret-key"
   ```

4. **Setup database**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   pnpm prisma db seed
   ```

5. **Jalankan development server**
   ```bash
   pnpm dev
   ```

6. **Buka browser**
   ```
   http://localhost:3000
   ```

## 📁 Struktur Proyek

```
anggar-jabar/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   ├── athletes/          # Athlete pages
│   ├── regions/           # Region pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── privacy/           # Privacy policy
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── admin-layout.tsx  # Admin layout
│   └── public-layout.tsx # Public layout
├── lib/                  # Utilities & configurations
│   ├── prisma.ts         # Prisma client
│   ├── store/            # Redux store
│   └── actions/          # Server actions
├── prisma/               # Database schema & migrations
└── types/                # TypeScript type definitions
```

## 🔧 Konfigurasi

### Database Schema

Proyek menggunakan Prisma dengan schema yang mencakup:
- **Athlete**: Data atlet dengan relasi ke region
- **Region**: Data wilayah/organisasi anggar
- **User**: Data pengguna sistem admin

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/anggar_jabar"

# Authentication
JWT_SECRET="your-secret-key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🎯 Fitur Admin

### Dashboard
- Statistik atlet dan wilayah
- Grafik distribusi kategori
- Aktivitas terbaru
- Quick actions

### Manajemen Atlet
- CRUD operasi data atlet
- Filter dan pencarian
- Export data
- Bulk operations

### Manajemen Wilayah
- CRUD operasi data wilayah
- Monitoring jumlah atlet per wilayah
- Statistik wilayah

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Toggle tema
- **Loading States**: Skeleton loading
- **Error Handling**: User-friendly error pages
- **Accessibility**: WCAG compliant

## 🔒 Keamanan

- **Authentication**: JWT-based auth
- **Authorization**: Role-based access control
- **Data Validation**: Server-side validation
- **CSRF Protection**: Built-in protection
- **Rate Limiting**: API rate limiting

## 📊 Monitoring & Analytics

- **Performance**: Core Web Vitals monitoring
- **Error Tracking**: Error boundary implementation
- **User Analytics**: Page views and interactions
- **Database Monitoring**: Query performance

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
# Build production
pnpm build

# Start production server
pnpm start
```

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📝 License

Proyek ini dikembangkan oleh **FnCorporation** untuk IKASI JABAR.

## 👨‍💻 Developer

**A.M. Hud Nibras Fadhlullah** - Lead Developer
- Email: hud.nibras@fncorporation.com
- LinkedIn: linkedin.com/in/hudnibras
- GitHub: github.com/hudnibras

## 📞 Kontak

**FnCorporation**
- Email: contact@fncorporation.com
- Website: www.fncorporation.com
- Telp: +62 22 123-4567

**IKASI JABAR**
- Email: info@ikasijabar.org
- Website: www.ikasijabar.org
- Alamat: Jl. Padjadjaran No. 123, Bandung, Jawa Barat

## 🙏 Ucapan Terima Kasih

Terima kasih kepada:
- IKASI JABAR untuk kepercayaan dan kerjasamanya
- Tim pengembang FnCorporation
- Komunitas Next.js dan React
- Semua kontributor dan tester

---

**Dikembangkan dengan ❤️ oleh FnCorporation untuk IKASI JABAR**