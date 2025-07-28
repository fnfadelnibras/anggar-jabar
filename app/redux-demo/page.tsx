"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/store/hooks"
import { fetchRegions } from "@/lib/store/slices/regionsSlice"
import { fetchAthletes } from "@/lib/store/slices/athletesSlice"
import { AthleteForm } from "@/components/redux-example/athlete-form"
import { AthleteList } from "@/components/redux-example/athlete-list"
import { DebugPanel } from "@/components/redux-example/debug-panel"
import { SimpleDemo } from "@/components/redux-example/simple-demo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ReduxDemoPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Fetch regions when component mounts
    dispatch(fetchRegions())
    // Also fetch athletes to ensure we have data
    dispatch(fetchAthletes())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            🚀 Redux Demo - Anggar Jawa Barat
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Demonstrasi penggunaan Redux untuk state management global. 
            Komponen A menambah data, Komponen B menampilkan data yang sama.
          </p>
        </div>

        <div className="mb-8">
          <SimpleDemo />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AthleteForm />
          <AthleteList />
        </div>

        <div className="mb-8">
          <DebugPanel />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📚 Tutorial Penggunaan Redux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Setup Redux Store</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <p><strong>File:</strong> <code>lib/store/index.ts</code></p>
                <p>Konfigurasi store utama dengan semua reducers</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Membuat Slice</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <p><strong>File:</strong> <code>lib/store/slices/athletesSlice.ts</code></p>
                <p>Definisi state, actions, dan reducers untuk athletes</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Menggunakan useSelector (Membaca State)</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <pre className="text-xs">
{`const athletes = useAppSelector(state => state.athletes.list)
const loading = useAppSelector(state => state.athletes.loading)`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Menggunakan useDispatch (Mengubah State)</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <pre className="text-xs">
{`const dispatch = useAppDispatch()
dispatch(addAthlete(newAthlete))
dispatch(fetchAthletes())`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="default">Store</Badge>
                State Global
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Tempat menyimpan semua state aplikasi secara terpusat. 
                Semua komponen bisa mengakses data yang sama.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Actions</Badge>
                Perubahan Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Objek yang mendeskripsikan apa yang terjadi. 
                Contoh: addAthlete, updateAthlete, deleteAthlete.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">Reducers</Badge>
                Update State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Fungsi yang mengubah state berdasarkan action. 
                State tidak bisa diubah langsung, harus melalui reducer.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🎯 Keuntungan Redux untuk Project Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">✅ State Management Terpusat</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Semua data atlet dan wilayah di satu tempat</li>
                  <li>• Tidak perlu prop drilling</li>
                  <li>• Komponen bisa akses data dari mana saja</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✅ Komunikasi Antar Komponen</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Form tambah atlet → List atlet otomatis update</li>
                  <li>• Dashboard → Data real-time dari store</li>
                  <li>• Filter dan search konsisten di semua halaman</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✅ Performance Optimization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Data tidak perlu fetch berulang kali</li>
                  <li>• Hanya komponen yang berubah yang re-render</li>
                  <li>• Caching data di store</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✅ Debugging & Development</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Redux DevTools untuk debugging</li>
                  <li>• Time-travel debugging</li>
                  <li>• Predictable state changes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 