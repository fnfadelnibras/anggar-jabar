"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Filter,
  FileText,
  Download,
  Users,
  CheckCircle,
  Lock,
  Clock,
  Eye,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Athlete } from "@/types/athlete"

const staticAthletes: Athlete[] = [
  {
    id: 1,
    name: "Andi Setiawan",
    region: "Bandung",
    category: "Épée",
    birthDate: "1999-05-15",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Sari Dewi",
    region: "Bekasi",
    category: "Foil",
    birthDate: "2001-08-20",
    gender: "Perempuan",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Budi Pratama",
    region: "Bogor",
    category: "Sabre",
    birthDate: "1997-12-10",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Dewi Kartika",
    region: "Depok",
    category: "Épée",
    birthDate: "2000-03-25",
    gender: "Perempuan",
    status: "Tidak Aktif",
  },
  {
    id: 5,
    name: "Reza Rahadian",
    region: "Cimahi",
    category: "Foil",
    birthDate: "1998-07-01",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Putri Ayu",
    region: "Tasikmalaya",
    category: "Sabre",
    birthDate: "2002-02-14",
    gender: "Perempuan",
    status: "Aktif",
  },
  {
    id: 7,
    name: "Andi Wijaya",
    region: "Sukabumi",
    category: "Épée",
    birthDate: "1996-09-30",
    gender: "Laki-laki",
    status: "Tidak Aktif",
  },
  {
    id: 8,
    name: "Maya Sari",
    region: "Karawang",
    category: "Foil",
    birthDate: "1999-11-05",
    gender: "Perempuan",
    status: "Aktif",
  },
]

export default function AthletesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [athletes, setAthletes] = useState<Athlete[]>(staticAthletes)

  // Tambahkan state untuk form tambah atlet
  const initialNewAthlete: Athlete = {
    id: 0,
    name: "",
    region: "",
    category: "",
    birthDate: "",
    gender: "",
    status: "Aktif",
  }
  const [newAthlete, setNewAthlete] = useState<Athlete>(initialNewAthlete)

  useEffect(() => {
    fetch('/api/athletes')
      .then(res => res.json())
      .then(data => setAthletes(data))
      .catch(() => setAthletes(staticAthletes))
  }, [])

  // Hapus semua fungsi, state, dan tampilan terkait verifikasi dan dokumen

  const handleEdit = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setIsDeleteDialogOpen(true)
  }

  // Fungsi hapus atlet
  const handleDeleteConfirm = async () => {
    if (!selectedAthlete) return
    setIsLoading(true)
    try {
      await fetch('/api/athletes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedAthlete.id })
      })
      setAthletes(prev => prev.filter(a => a.id !== selectedAthlete.id))
      toast({
        title: "Atlet dihapus",
        description: "Atlet telah dihapus.",
        type: "error",
      })
    } catch {
      toast({ title: "Gagal", description: "Gagal menghapus atlet", type: "error" })
    }
    setIsLoading(false)
    setIsDeleteDialogOpen(false)
  }

  // Fungsi tambah/edit atlet
  const handleSaveAthlete = async (athleteData?: Athlete) => {
    setIsLoading(true)
    const data = athleteData || newAthlete // Use newAthlete for adding new athlete
    if (!data.status) data.status = 'Aktif'
    try {
      if (isEditDialogOpen) {
        const res = await fetch('/api/athletes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const updated = await res.json()
        setAthletes(prev => prev.map(a => a.id === updated.id ? updated : a))
        toast({
          title: "Atlet diperbarui",
          description: `Profil ${updated.name} telah diperbarui.`,
        })
      } else {
        const res = await fetch('/api/athletes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const newAthlete = await res.json()
        setAthletes(prev => [...prev, newAthlete])
        toast({
          title: "Atlet dibuat",
          description: `Atlet baru telah dibuat.`,
        })
      }
    } catch (e) {
      toast({ title: 'Gagal', description: 'Terjadi kesalahan', type: 'error' })
    }
    setIsLoading(false)
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    // Reset form after successful save
    setNewAthlete(initialNewAthlete)
  }

  // Tambahkan fungsi untuk update status verifikasi
  const handleVerificationAction = async (athlete: Athlete, newStatus: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/athletes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...athlete, status: newStatus })
      })
      const updated = await res.json()
      setAthletes(prev => prev.map(a => a.id === updated.id ? updated : a))
      toast({
        title: "Status diperbarui",
        description: `Status atlet ${athlete.name} diubah menjadi ${newStatus}.`,
      })
    } catch {
      toast({ title: "Gagal", description: "Gagal mengubah status atlet", type: "error" })
    }
    setIsLoading(false)
  }

  // Tambahkan fungsi berikut di dalam komponen AthletesPage
  const handleEditSaveClick = async () => {
    if (selectedAthlete) {
      await handleSaveAthlete(selectedAthlete)
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Atlet Anggar Jawa Barat</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Semua
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Atlet
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Atlet</p>
              <h3 className="text-2xl font-bold mt-1">{athletes.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Menunggu Verifikasi</p>
              <h3 className="text-2xl font-bold mt-1">
                {athletes.filter((a) => a.status === "Tidak Aktif").length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Disetujui</p>
              <h3 className="text-2xl font-bold mt-1">
                {athletes.filter((a) => a.status === "Aktif").length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Terkunci</p>
              <h3 className="text-2xl font-bold mt-1">
                {athletes.filter((a) => a.status === "Tidak Aktif").length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari atlet..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kota/Kabupaten" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Wilayah</SelectItem>
              <SelectItem value="bandung">Bandung</SelectItem>
              <SelectItem value="bekasi">Bekasi</SelectItem>
              <SelectItem value="bogor">Bogor</SelectItem>
              <SelectItem value="depok">Depok</SelectItem>
              <SelectItem value="cimahi">Cimahi</SelectItem>
              <SelectItem value="tasikmalaya">Tasikmalaya</SelectItem>
              <SelectItem value="sukabumi">Sukabumi</SelectItem>
              <SelectItem value="karawang">Karawang</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status Verifikasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
              <SelectItem value="Aktif">Aktif</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Athletes Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Kota/Kabupaten</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal Lahir</TableHead>
              <TableHead>Jenis Kelamin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {athletes.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell>{athlete.region}</TableCell>
                <TableCell>{athlete.category}</TableCell>
                <TableCell>{athlete.birthDate}</TableCell>
                <TableCell>{athlete.gender}</TableCell>
                <TableCell>{athlete.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Buka menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(athlete)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(athlete)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
          <span className="font-medium">8</span> athletes
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Add Athlete Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah Atlet Baru</DialogTitle>
            <DialogDescription>Masukkan detail atlet baru. Klik simpan setelah selesai.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detail Personal</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" placeholder="Nama lengkap" value={newAthlete.name} onChange={e => setNewAthlete({ ...newAthlete, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Tanggal Lahir</Label>
                  <Input id="birthDate" type="date" value={newAthlete.birthDate} onChange={e => setNewAthlete({ ...newAthlete, birthDate: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Kota/Kabupaten</Label>
                  <Select value={newAthlete.region} onValueChange={val => setNewAthlete({ ...newAthlete, region: val })}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Pilih kota/kabupaten" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bandung">Bandung</SelectItem>
                      <SelectItem value="bekasi">Bekasi</SelectItem>
                      <SelectItem value="bogor">Bogor</SelectItem>
                      <SelectItem value="depok">Depok</SelectItem>
                      <SelectItem value="cimahi">Cimahi</SelectItem>
                      <SelectItem value="tasikmalaya">Tasikmalaya</SelectItem>
                      <SelectItem value="sukabumi">Sukabumi</SelectItem>
                      <SelectItem value="karawang">Karawang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={newAthlete.category} onValueChange={val => setNewAthlete({ ...newAthlete, category: val })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="epee">Épée</SelectItem>
                      <SelectItem value="foil">Foil</SelectItem>
                      <SelectItem value="sabre">Sabre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Jenis Kelamin</Label>
                <RadioGroup value={newAthlete.gender} onValueChange={val => setNewAthlete({ ...newAthlete, gender: val })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Laki-laki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Perempuan</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked={newAthlete.status === "Aktif"} onCheckedChange={val => setNewAthlete({ ...newAthlete, status: val ? "Aktif" : "Tidak Aktif" })} />
                  <Label htmlFor="active">Aktif</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografi</Label>
                <Textarea id="bio" placeholder="Biografi atlet" />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => handleSaveAthlete(newAthlete)} disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Atlet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Athlete Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Athlete</DialogTitle>
            <DialogDescription>Update the details of the athlete. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>

          {selectedAthlete && (
            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Personal Details</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input id="edit-name" defaultValue={selectedAthlete.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-birthDate">Birth Date</Label>
                    <div className="relative">
                      <Input
                        id="edit-birthDate"
                        type="date"
                        className="w-full"
                        defaultValue={selectedAthlete.birthDate || "2000-01-01"}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-region">Region</Label>
                    <Select defaultValue={selectedAthlete.region.toLowerCase()}>
                      <SelectTrigger id="edit-region">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jakarta">Jakarta</SelectItem>
                        <SelectItem value="bali">Bali</SelectItem>
                        <SelectItem value="surabaya">Surabaya</SelectItem>
                        <SelectItem value="bandung">Bandung</SelectItem>
                        <SelectItem value="makassar">Makassar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select defaultValue={selectedAthlete.category.toLowerCase()}>
                      <SelectTrigger id="edit-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="épée">Épée</SelectItem>
                        <SelectItem value="foil">Foil</SelectItem>
                        <SelectItem value="sabre">Sabre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup defaultValue={selectedAthlete.gender.toLowerCase()} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="edit-male" />
                      <Label htmlFor="edit-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="edit-female" />
                      <Label htmlFor="edit-female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edit-active" defaultChecked={selectedAthlete.status === "Aktif"} />
                    <Label htmlFor="edit-active">Active</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <Textarea id="edit-bio" placeholder="Athlete biography" />
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSaveClick} disabled={isLoading}>
              {isLoading ? "Saving..." : isEditDialogOpen ? "Save Changes" : "Save Athlete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus atlet ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          {selectedAthlete && (
            <div className="py-4">
              <p className="mb-2">
                Anda akan menghapus <span className="font-semibold">{selectedAthlete.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Ini akan menghapus semua data yang terkait dengan atlet ini, termasuk partisipasi dalam event dan
                pertandingan.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
