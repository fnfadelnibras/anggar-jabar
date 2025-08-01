# IKASI JABAR - Sistem Manajemen Kompetisi Anggar

Sistem manajemen kompetisi anggar regional Jawa Barat yang dikembangkan sebagai **Tugas Akhir** untuk program **Fullstack Programming with AI** yang diselenggarakan oleh **Jabar Digital Academy** bekerja sama dengan **Alkademi**.

## 📋 Tentang Proyek

Sistem modern untuk mengelola data atlet, wilayah, dan kompetisi anggar di Jawa Barat dengan fitur-fitur:

- **Manajemen Data Atlet**: Pendaftaran, pengelolaan, dan monitoring data atlet
- **Manajemen Wilayah**: Pengelolaan data wilayah dan organisasi anggar  
- **Dashboard Admin**: Panel admin untuk monitoring dan pengelolaan sistem
- **Sistem Keamanan**: Autentikasi dan otorisasi berbasis role
- **Image Management**: Upload dan crop gambar dengan Cloudinary
- **Activity Logging**: Tracking aktivitas sistem real-time
- **Responsive Design**: Interface yang responsif untuk desktop dan mobile

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## 🛠️ Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/fncorporation/anggar-jabar.git
   cd anggar-jabar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Setup database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

## 🎯 Fitur Admin

- **Dashboard**: Statistik atlet, wilayah, dan aktivitas terbaru
- **Manajemen Atlet**: CRUD operasi data atlet dengan image upload
- **Manajemen Wilayah**: CRUD operasi data wilayah dengan image upload
- **Profile Management**: Pengelolaan profil admin dengan avatar
- **Activity Logging**: Tracking semua aktivitas sistem

## 🚀 Deployment

### Vercel
- **Live Site**: [https://anggar-jabar.vercel.app](https://anggar-jabar.vercel.app)
- **Repository**: [https://github.com/fncorporation/anggar-jabar](https://github.com/fncorporation/anggar-jabar)

## 👨‍💻 Developer

**A.M. Hud Nibras Fadhlullah** - Lead Developer
- **Email**: hud.nibras@fncorporation.com
- **GitHub**: [github.com/fncorporation](https://github.com/fncorporation)
- **Vercel**: [vercel.com/fncorporation](https://vercel.com/fncorporation)

## 🎓 Tugas Akhir

Proyek ini dikembangkan sebagai **Tugas Akhir** untuk program **Fullstack Programming with AI** yang diselenggarakan oleh:

- **Jabar Digital Academy** - Program pengembangan talenta digital Jawa Barat
- **Alkademi** - Platform pembelajaran teknologi

---

**Dikembangkan dengan ❤️ oleh FnCorporation untuk IKASI JABAR**  
**Tugas Akhir Fullstack Programming with AI - Jabar Digital Academy x Alkademi**