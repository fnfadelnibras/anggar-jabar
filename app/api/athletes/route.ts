import { NextRequest, NextResponse } from 'next/server'

let athletes = [
  { id: 1, name: "Andi Setiawan", region: "Bandung", category: "Épée", birthDate: "1999-05-15", gender: "Laki-laki", status: "Aktif" },
  { id: 2, name: "Sari Dewi", region: "Bekasi", category: "Foil", birthDate: "2001-08-20", gender: "Perempuan", status: "Aktif" },
  { id: 3, name: "Budi Pratama", region: "Bogor", category: "Sabre", birthDate: "1997-12-10", gender: "Laki-laki", status: "Aktif" },
  { id: 4, name: "Dewi Kartika", region: "Depok", category: "Épée", birthDate: "2000-03-25", gender: "Perempuan", status: "Tidak Aktif" },
  { id: 5, name: "Reza Rahadian", region: "Cimahi", category: "Foil", birthDate: "1998-07-01", gender: "Laki-laki", status: "Aktif" },
  { id: 6, name: "Putri Ayu", region: "Tasikmalaya", category: "Sabre", birthDate: "2002-02-14", gender: "Perempuan", status: "Aktif" },
  { id: 7, name: "Andi Wijaya", region: "Sukabumi", category: "Épée", birthDate: "1996-09-30", gender: "Laki-laki", status: "Tidak Aktif" },
  { id: 8, name: "Maya Sari", region: "Karawang", category: "Foil", birthDate: "1999-11-05", gender: "Perempuan", status: "Aktif" },
]

// GET: Ambil semua data
export async function GET() {
  return NextResponse.json(athletes)
}

// POST: Tambah data baru
export async function POST(req: NextRequest) {
  const body = await req.json()
  const newAthlete = {
    ...body,
    id: Date.now(),
  }
  athletes.push(newAthlete)
  return NextResponse.json(newAthlete, { status: 201 })
}

// PUT: Update data
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const idx = athletes.findIndex(a => a.id === body.id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  athletes[idx] = { ...athletes[idx], ...body }
  return NextResponse.json(athletes[idx])
}

// DELETE: Hapus data
export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  athletes = athletes.filter(a => a.id !== id)
  return NextResponse.json({ success: true })
} 