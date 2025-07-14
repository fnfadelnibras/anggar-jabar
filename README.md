# anggar-jabar
digunakan untuk memenuhi tugas tahap 2
# Komponen Header Sederhana - IKASI JABAR

Kumpulan komponen header yang sudah disalin dari project fencing-app untuk digunakan di project lain **tanpa fitur dark mode**.

## File yang Tersedia

### 1. `header-simple.tsx`
Komponen header sederhana tanpa mode toggle. Fitur:
- ✅ Responsive design (mobile & desktop)
- ✅ Navigation menu dengan mobile sidebar
- ✅ Logo dan branding IKASI JABAR
- ✅ Tombol login admin
- ❌ **TIDAK ADA** theme toggle (light/dark mode)

### 2. `layout-simple.tsx`
Layout dasar tanpa ThemeProvider

### 3. `dashboard-simple.tsx`
Contoh halaman dashboard yang menggunakan header sederhana

### 4. `globals-simple.css`
File CSS global dengan Tailwind CSS (tanpa dark mode variables)

## Langkah-langkah Penggunaan

### **Step 1: Setup Project Baru**
```bash
# Buat project Next.js baru
npx create-next-app@latest my-new-project --typescript --tailwind --app

# Masuk ke direktori project
cd my-new-project
```

### **Step 2: Install Dependencies**
```bash
# Install dependencies yang diperlukan (tanpa next-themes)
npm install lucide-react
# atau
pnpm add lucide-react
```

### **Step 3: Setup shadcn/ui**
```bash
# Install shadcn/ui
npx shadcn@latest init

# Install komponen yang diperlukan
npx shadcn@latest add button sheet card badge progress toaster
```

### **Step 4: Copy File yang Dibuat**
Copy semua file yang sudah dibuat ke project baru:

```bash
# Copy ke direktori yang sesuai
cp header-simple.tsx components/header.tsx
cp layout-simple.tsx app/layout.tsx
cp dashboard-simple.tsx app/page.tsx
cp globals-simple.css app/globals.css
```

### **Step 5: Update Import Paths**
Pastikan import paths sudah benar di file yang di-copy:

```tsx
// Di header.tsx, pastikan import sudah benar
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Di dashboard/page.tsx, update import header
import { Header } from "@/components/header"
```

### **Step 6: Test Aplikasi**
```bash
# Jalankan development server
npm run dev
# atau
pnpm dev
```

## Cara Menggunakan Header

### **Penggunaan Dasar**
```tsx
// app/page.tsx
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1>Selamat Datang</h1>
        {/* Konten halaman Anda */}
      </main>
    </div>
  )
}
```

### **Penggunaan di Halaman Lain**
```tsx
// app/about/page.tsx
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1>Tentang Kami</h1>
        <p>Informasi tentang IKASI JABAR...</p>
      </main>
    </div>
  )
}
```

## Kustomisasi

### **Mengubah Branding**
Edit bagian logo di `components/header.tsx`:
```tsx
<span className="hidden font-bold sm:inline-block text-sm leading-tight">
  NAMA ORGANISASI ANDA
</span>
<span className="hidden text-xs text-muted-foreground sm:inline-block leading-tight">
  Deskripsi Organisasi
</span>
```

### **Mengubah Navigation Menu**
Edit array `navigation` di `components/header.tsx`:
```tsx
const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Layanan", href: "/services" },
  { name: "Kontak", href: "/contact" },
  // Tambahkan menu sesuai kebutuhan
]
```

### **Mengubah Warna Tema**
Edit CSS variables di `app/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Warna primary */
  --background: 0 0% 100%; /* Warna background */
  --foreground: 222.2 84% 4.9%; /* Warna text */
  /* ... variabel lainnya */
}
```

## Struktur File yang Disarankan

```
my-new-project/
├── app/
│   ├── layout.tsx          # Copy dari layout-simple.tsx
│   ├── page.tsx            # Copy dari dashboard-simple.tsx
│   └── globals.css         # Copy dari globals-simple.css
├── components/
│   ├── ui/
│   │   ├── button.tsx      # shadcn/ui component
│   │   ├── sheet.tsx       # shadcn/ui component
│   │   ├── card.tsx        # shadcn/ui component
│   │   ├── badge.tsx       # shadcn/ui component
│   │   ├── progress.tsx    # shadcn/ui component
│   │   └── toaster.tsx     # shadcn/ui component
│   └── header.tsx          # Copy dari header-simple.tsx
├── package.json
└── tailwind.config.ts
```

## Perbedaan dengan Versi Sebelumnya

| Fitur | Versi Sebelumnya | Versi Sederhana |
|-------|------------------|-----------------|
| Dark Mode Toggle | ✅ Ada | ❌ Tidak Ada |
| Theme Provider | ✅ Ada | ❌ Tidak Ada |
| next-themes | ✅ Diperlukan | ❌ Tidak Diperlukan |
| CSS Variables Dark | ✅ Ada | ❌ Tidak Ada |
| Kompleksitas | Tinggi | Rendah |
| Dependencies | Lebih banyak | Lebih sedikit |

## Keuntungan Versi Sederhana

1. **Lebih Ringan** - Tidak perlu next-themes
2. **Setup Lebih Mudah** - Dependencies lebih sedikit
3. **Tidak Ada Hydration Issues** - Tidak ada client-side theme switching
4. **Lebih Stabil** - Komponen lebih sederhana
5. **Cocok untuk Project Sederhana** - Tidak memerlukan dark mode

## Troubleshooting

### **Error: Cannot find module '@/components/ui/button'**
Pastikan shadcn/ui sudah diinstall dengan benar:
```bash
npx shadcn@latest add button
```

### **Header tidak responsive di mobile**
Pastikan Tailwind CSS sudah dikonfigurasi dengan benar di `tailwind.config.ts`

### **Icon tidak muncul**
Pastikan lucide-react sudah diinstall:
```bash
npm install lucide-react
```

## Catatan Penting

- ✅ Komponen ini menggunakan Tailwind CSS
- ✅ Responsive dan mobile-first design
- ✅ Tidak memerlukan next-themes
- ✅ Tidak ada dark mode functionality
- ✅ Lebih sederhana dan mudah dikustomisasi