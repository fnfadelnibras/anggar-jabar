# 🚀 Redux Tutorial - Anggar Jawa Barat

## 📋 Daftar Isi

1. [Apa itu Redux?](#apa-itu-redux)
2. [Struktur Redux di Project](#struktur-redux-di-project)
3. [Cara Menggunakan Redux](#cara-menggunakan-redux)
4. [Contoh Implementasi](#contoh-implementasi)
5. [Best Practices](#best-practices)
6. [Debugging dengan Redux DevTools](#debugging-dengan-redux-devtools)

## 🎯 Apa itu Redux?

**Redux** adalah library state management untuk JavaScript applications, khususnya React. Redux menyediakan cara untuk mengelola state aplikasi secara global dan terpusat.

### Konsep Dasar Redux:

1. **Store** - Tempat menyimpan state global
2. **Actions** - Objek yang mendeskripsikan apa yang terjadi
3. **Reducers** - Fungsi yang mengubah state berdasarkan action
4. **Dispatch** - Cara untuk mengirim action ke store
5. **Selector** - Cara untuk mengambil data dari store

## 📁 Struktur Redux di Project

```
lib/store/
├── index.ts              # Store configuration
├── hooks.ts              # Typed hooks
└── slices/
    ├── athletesSlice.ts  # Athletes state management
    ├── regionsSlice.ts   # Regions state management
    ├── dashboardSlice.ts # Dashboard state management
    └── authSlice.ts      # Authentication state management
```

## 🔧 Cara Menggunakan Redux

### 1. Setup Provider

Redux Provider sudah di-setup di `app/layout.tsx`:

```tsx
import { Providers } from "@/components/providers"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### 2. Menggunakan useSelector (Membaca State)

```tsx
import { useAppSelector } from "@/lib/store/hooks"

function MyComponent() {
  // Mengambil data dari store
  const athletes = useAppSelector(state => state.athletes.list)
  const loading = useAppSelector(state => state.athletes.loading)
  const error = useAppSelector(state => state.athletes.error)
  
  return (
    <div>
      {loading ? "Loading..." : athletes.map(athlete => (
        <div key={athlete.id}>{athlete.name}</div>
      ))}
    </div>
  )
}
```

### 3. Menggunakan useDispatch (Mengubah State)

```tsx
import { useAppDispatch } from "@/lib/store/hooks"
import { addAthlete, fetchAthletes } from "@/lib/store/slices/athletesSlice"

function MyComponent() {
  const dispatch = useAppDispatch()
  
  const handleAddAthlete = async (athleteData) => {
    try {
      await dispatch(addAthlete(athleteData)).unwrap()
      console.log("Athlete added successfully!")
    } catch (error) {
      console.error("Failed to add athlete:", error)
    }
  }
  
  const handleFetchAthletes = () => {
    dispatch(fetchAthletes())
  }
  
  return (
    <button onClick={handleFetchAthletes}>Fetch Athletes</button>
  )
}
```

## 📝 Contoh Implementasi

### Contoh 1: Form Tambah Atlet (Komponen A)

```tsx
"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addAthlete } from "@/lib/store/slices/athletesSlice"

export function AthleteForm() {
  const dispatch = useAppDispatch()
  const regions = useAppSelector(state => state.regions.list)
  const loading = useAppSelector(state => state.athletes.loading)

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    category: '',
    status: '',
    regionId: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await dispatch(addAthlete({
        name: formData.name,
        birthDate: new Date(formData.birthDate),
        gender: formData.gender,
        category: formData.category,
        status: formData.status,
        region: {
          id: formData.regionId,
          name: regions.find(r => r.id === formData.regionId)?.name || ''
        }
      })).unwrap()

      // Reset form
      setFormData({
        name: '',
        birthDate: '',
        gender: '',
        category: '',
        status: '',
        regionId: ''
      })
    } catch (error) {
      console.error("Failed to add athlete:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Athlete"}
      </button>
    </form>
  )
}
```

### Contoh 2: Daftar Atlet (Komponen B)

```tsx
"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchAthletes } from "@/lib/store/slices/athletesSlice"

export function AthleteList() {
  const dispatch = useAppDispatch()
  const { list: athletes, loading, error } = useAppSelector(state => state.athletes)

  useEffect(() => {
    dispatch(fetchAthletes())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Athletes ({athletes.length})</h2>
      {athletes.map(athlete => (
        <div key={athlete.id}>
          <h3>{athlete.name}</h3>
          <p>{athlete.region.name} • {athlete.category}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🎯 Keuntungan Redux untuk Project Ini

### 1. **State Management Terpusat**
- Semua data atlet dan wilayah di satu tempat
- Tidak perlu prop drilling
- Komponen bisa akses data dari mana saja

### 2. **Komunikasi Antar Komponen**
- Form tambah atlet → List atlet otomatis update
- Dashboard → Data real-time dari store
- Filter dan search konsisten di semua halaman

### 3. **Performance Optimization**
- Data tidak perlu fetch berulang kali
- Hanya komponen yang berubah yang re-render
- Caching data di store

### 4. **Debugging & Development**
- Redux DevTools untuk debugging
- Time-travel debugging
- Predictable state changes

## 🔍 Best Practices

### 1. **Struktur Slice**
```tsx
// State interface
interface AthletesState {
  list: Athlete[]
  loading: boolean
  error: string | null
  filters: {
    search: string
    category: string
    region: string
    status: string
  }
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
  }
}

// Initial state
const initialState: AthletesState = {
  list: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    region: 'all',
    status: 'all'
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 15,
    totalPages: 1
  }
}
```

### 2. **Async Actions dengan createAsyncThunk**
```tsx
export const fetchAthletes = createAsyncThunk(
  'athletes/fetchAthletes',
  async () => {
    const response = await fetch('/api/athletes')
    const data = await response.json()
    return data
  }
)

export const addAthlete = createAsyncThunk(
  'athletes/addAthlete',
  async (athlete: Omit<Athlete, 'id'>) => {
    const response = await fetch('/api/athletes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(athlete),
    })
    const data = await response.json()
    return data
  }
)
```

### 3. **Handling Loading & Error States**
```tsx
// Di component
const { list: athletes, loading, error } = useAppSelector(state => state.athletes)

if (loading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>

// Di slice
extraReducers: (builder) => {
  builder
    .addCase(fetchAthletes.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchAthletes.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    .addCase(fetchAthletes.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch athletes'
    })
}
```

### 4. **Optimistic Updates**
```tsx
// Di slice
.addCase(addAthlete.fulfilled, (state, action) => {
  state.list.unshift(action.payload) // Add to beginning
})
.addCase(updateAthlete.fulfilled, (state, action) => {
  const index = state.list.findIndex(athlete => athlete.id === action.payload.id)
  if (index !== -1) {
    state.list[index] = action.payload
  }
})
.addCase(deleteAthlete.fulfilled, (state, action) => {
  state.list = state.list.filter(athlete => athlete.id !== action.payload)
})
```

## 🛠️ Debugging dengan Redux DevTools

### 1. Install Redux DevTools Extension
- Chrome: [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- Firefox: [Redux DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

### 2. Menggunakan DevTools
1. Buka browser developer tools
2. Klik tab "Redux"
3. Lihat state changes real-time
4. Time-travel debugging
5. Action history

### 3. Debugging Tips
```tsx
// Log state changes
useEffect(() => {
  console.log('Athletes state:', athletes)
}, [athletes])

// Log actions
const handleAddAthlete = async (athleteData) => {
  console.log('Dispatching addAthlete:', athleteData)
  try {
    const result = await dispatch(addAthlete(athleteData)).unwrap()
    console.log('Add athlete success:', result)
  } catch (error) {
    console.error('Add athlete failed:', error)
  }
}
```

## 🚀 Demo Redux

Untuk melihat demo Redux dalam action, kunjungi:
**http://localhost:3000/redux-demo**

Demo ini menampilkan:
- Komponen A: Form tambah atlet
- Komponen B: Daftar atlet yang otomatis update
- Tutorial penggunaan Redux
- Keuntungan Redux untuk project

## 📚 Referensi

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## 🎯 Next Steps

1. **Integrasi ke Existing Components**
   - Update `athlete-client.tsx` untuk menggunakan Redux
   - Update `regions-client.tsx` untuk menggunakan Redux
   - Update dashboard untuk menggunakan Redux

2. **Advanced Features**
   - Implementasi caching
   - Optimistic updates
   - Error boundaries
   - Persist state to localStorage

3. **Testing**
   - Unit tests untuk slices
   - Integration tests untuk components
   - E2E tests untuk user flows 