# Anggar Jawa Barat - IKASI JABAR

Aplikasi web untuk manajemen data atlet dan wilayah anggar Jawa Barat yang dikembangkan menggunakan Next.js, Prisma, dan PostgreSQL.

**Project ini dikembangkan sebagai bagian dari program Jabar Digital Academy x Alkademi di kelas Fullstack Engineer with AI.**

## 🏆 Fitur Utama

### **Public Pages (Halaman Publik)**
- **🏠 Beranda**: Dashboard utama dengan statistik atlet dan wilayah
- **👥 Atlet**: Galeri atlet dengan search dan filter (maksimal 12 atlet)
- **🗺️ Wilayah**: Daftar wilayah dengan pagination (10 per halaman)
- **ℹ️ Tentang**: Informasi tentang IKASI Jawa Barat

### **Admin Panel (Panel Admin)**
- **📊 Dashboard**: Statistik lengkap dengan grafik dan data real-time
- **👥 Manajemen Atlet**: CRUD lengkap dengan search, filter, dan pagination
- **🗺️ Manajemen Wilayah**: CRUD lengkap dengan search, filter, dan pagination

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15.3.5
- **Database**: PostgreSQL dengan Prisma ORM
- **UI Components**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 🚀 Fitur Detail

### **Halaman Atlet (Public)**
- ✅ **Search Real-time**: Pencarian berdasarkan nama atlet
- ✅ **Filter**: Filter berdasarkan kategori dan wilayah
- ✅ **Limit Display**: Maksimal 12 atlet per halaman
- ✅ **Responsive Design**: Tampilan yang responsif di semua device
- ✅ **Data Real**: Mengambil data dari database

### **Halaman Wilayah (Public)**
- ✅ **Search Real-time**: Pencarian berdasarkan nama wilayah
- ✅ **Pagination**: 10 wilayah per halaman dengan navigasi
- ✅ **Grid & List View**: Toggle antara tampilan grid dan list
- ✅ **Dynamic Stats**: Statistik berdasarkan data real
- ✅ **Responsive Design**: Tampilan yang responsif

### **Admin Dashboard**
- ✅ **Real-time Stats**: Statistik berdasarkan data database
- ✅ **Gender Distribution**: Distribusi atlet berdasarkan gender
- ✅ **Category Analysis**: Analisis atlet berdasarkan kategori
- ✅ **Top Regions**: Wilayah dengan atlet terbanyak
- ✅ **Recent Activity**: Aktivitas terbaru

### **Admin Athletes Management**
- ✅ **CRUD Operations**: Create, Read, Update, Delete atlet
- ✅ **Advanced Search**: Search berdasarkan nama, wilayah, kategori
- ✅ **Multiple Filters**: Filter berdasarkan kategori, wilayah, status
- ✅ **Sorting**: Sort berdasarkan semua kolom
- ✅ **Pagination**: 15 atlet per halaman
- ✅ **Bulk Actions**: Edit dan delete multiple atlet

### **Admin Regions Management**
- ✅ **CRUD Operations**: Create, Read, Update, Delete wilayah
- ✅ **Search & Filter**: Search nama wilayah, filter berdasarkan jumlah atlet
- ✅ **Sorting**: Sort berdasarkan nama dan jumlah atlet
- ✅ **Pagination**: 15 wilayah per halaman
- ✅ **Athlete Count**: Menampilkan jumlah atlet per wilayah

## 📊 Database Schema

### **Athlete Model**
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

### **Region Model**
```prisma
model Region {
  id       String    @id @default(cuid())
  name     String
  code     String    @unique
  athletes Athlete[]
}
```

### **Enums**
```prisma
enum Gender {
  Pria
  Wanita
}

enum Category {
  EPEE
  FOIL
  SABRE
}

enum Status {
  ACTIVE
  INACTIVE
}
```

## 🚀 Cara Menjalankan

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- npm atau pnpm

### **Installation**

1. **Clone Repository**
```bash
git clone <repository-url>
cd anggar-jabar
```

2. **Install Dependencies**
```bash
npm install
# atau
pnpm install
```

3. **Setup Environment**
```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan database credentials
DATABASE_URL="postgresql://username:password@localhost:5432/anggar_jabar"
```

4. **Setup Database**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

5. **Run Development Server**
```bash
npm run dev
# atau
pnpm dev
```

6. **Build for Production**
```bash
npm run build
npm start
```

## 📁 Struktur Project

```
anggar-jabar/
├── app/
│   ├── admin/
│   │   ├── athletes/
│   │   │   └── page.tsx          # Admin athletes page
│   │   ├── regions/
│   │   │   └── page.tsx          # Admin regions page
│   │   └── page.tsx              # Admin dashboard
│   ├── athletes/
│   │   └── page.tsx              # Public athletes page
│   ├── regions/
│   │   └── page.tsx              # Public regions page
│   ├── api/
│   │   ├── athletes/
│   │   │   └── route.ts          # Athletes API
│   │   └── regions/
│   │       └── route.ts          # Regions API
│   └── page.tsx                  # Home page
├── components/
│   ├── admin-layout.tsx          # Admin layout
│   ├── public-layout.tsx         # Public layout
│   ├── athlete-client.tsx        # Athletes admin component
│   ├── regions-client.tsx        # Regions admin component
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── prisma.ts                 # Prisma client
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.js                   # Database seeder
└── package.json
```

## 🔧 API Endpoints

### **Athletes API** (`/api/athletes`)
- `GET`: Mendapatkan semua atlet
- `POST`: Membuat atlet baru
- `PUT`: Update atlet
- `DELETE`: Hapus atlet

### **Regions API** (`/api/regions`)
- `GET`: Mendapatkan semua wilayah
- `POST`: Membuat wilayah baru
- `PUT`: Update wilayah
- `DELETE`: Hapus wilayah

## 🎨 UI/UX Features

### **Design System**
- **Color Scheme**: Blue primary dengan accent colors
- **Typography**: Inter font family
- **Components**: shadcn/ui component library
- **Responsive**: Mobile-first design

### **User Experience**
- **Loading States**: Spinner dan skeleton loading
- **Toast Notifications**: Feedback untuk user actions
- **Form Validation**: Client-side validation
- **Error Handling**: Graceful error handling
- **Search & Filter**: Real-time search dan filtering

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Security Features

- **Input Validation**: Client dan server-side validation
- **SQL Injection Protection**: Menggunakan Prisma ORM
- **XSS Protection**: Sanitasi input
- **CSRF Protection**: Built-in Next.js protection

## 🚀 Performance

- **Server Components**: Menggunakan Next.js 13+ app router
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Built-in caching mechanisms

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Monitoring & Analytics

- **Error Tracking**: Console error logging
- **Performance Monitoring**: Built-in Next.js analytics
- **User Analytics**: Basic page view tracking

<!-- ## 💡 Next Steps untuk Enhancement

### **🔐 Authentication & Authorization**
- **Login System**: Implementasi authentication untuk admin
- **Role-based Access**: Different roles (Super Admin, Admin, Viewer)
- **JWT/Session Management**: Secure token-based authentication
- **Password Reset**: Email-based password reset functionality

### **📁 File Upload & Media Management**
- **Photo Upload**: Upload foto profil untuk athletes
- **Image Optimization**: Automatic image compression dan resizing
- **Cloud Storage**: Integration dengan AWS S3 atau Cloudinary
- **Gallery Management**: Multiple photos per athlete

### **📊 Data Export & Reporting**
- **PDF Export**: Generate PDF reports untuk athletes dan regions
- **Excel Export**: Export data ke format Excel (.xlsx)
- **Custom Reports**: Advanced reporting dengan filters
- **Scheduled Reports**: Automated report generation

### **⚡ Real-time Features**
- **WebSocket Integration**: Real-time updates menggunakan Socket.io
- **Live Dashboard**: Real-time statistics updates
- **Notifications**: Push notifications untuk admin
- **Collaborative Editing**: Multi-user editing dengan conflict resolution

### **📱 Mobile Application**
- **React Native App**: Companion mobile app untuk athletes
- **Offline Support**: Offline data synchronization
- **Push Notifications**: Mobile push notifications
- **QR Code Scanner**: Scan QR codes untuk quick athlete lookup


### **🔗 API Enhancements**
- **GraphQL**: Implementasi GraphQL untuk flexible data fetching
- **API Rate Limiting**: Protect API dari abuse
- **API Documentation**: Swagger/OpenAPI documentation
- **Webhook Support**: Real-time integrations dengan external systems

### **📈 Advanced Analytics**
- **Google Analytics**: Integration dengan Google Analytics
- **Custom Dashboards**: Advanced admin dashboards
- **Data Visualization**: Charts dan graphs untuk insights
- **Performance Metrics**: Track application performance

### **🔐 Advanced Security**
- **Two-Factor Authentication**: 2FA untuk admin accounts
- **Audit Logs**: Track semua admin actions
- **Data Encryption**: Encrypt sensitive data
- **Backup System**: Automated database backups -->

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

Untuk dukungan teknis atau pertanyaan, silakan hubungi:
- Email: fn.fadelnibras@gmail.com
- Website: https://anggar-jabar.vercel.app/

## 🎓 Program Jabar Digital Academy x Alkademi

Project ini dikembangkan sebagai bagian dari program **Jabar Digital Academy x Alkademi** di kelas **Fullstack Engineer with AI**. Program ini bertujuan untuk:

- **Mengembangkan skill fullstack development** dengan teknologi modern
- **Mempelajari AI integration** dalam pengembangan aplikasi web
- **Membuat project portfolio** yang siap untuk dunia kerja
- **Menguasai best practices** dalam pengembangan aplikasi web

### **Skills yang Dipelajari:**
- ✅ **Frontend Development**: Next.js, React, TypeScript
- ✅ **Backend Development**: API Routes, Database Design
- ✅ **Database Management**: PostgreSQL, Prisma ORM
- ✅ **UI/UX Design**: Modern design dengan shadcn/ui
- ✅ **Fullstack Architecture**: End-to-end application development
- ✅ **AI Integration**: AI Pieces

---


**Program: Jabar Digital Academy x Alkademi - Fullstack Engineer with AI**