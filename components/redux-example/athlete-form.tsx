"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addAthlete } from "@/lib/store/slices/athletesSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function AthleteForm() {
  const dispatch = useAppDispatch()
  const regions = useAppSelector(state => state.regions.list)
  const loading = useAppSelector(state => state.athletes.loading)
  const regionsLoading = useAppSelector(state => state.regions.loading)

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    category: '',
    status: '',
    regionId: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.birthDate || !formData.gender || !formData.category || !formData.status || !formData.regionId) {
      toast.error("Semua field harus diisi!")
      return
    }

    const selectedRegion = regions.find(r => r.id === formData.regionId)
    
    try {
      await dispatch(addAthlete({
        name: formData.name,
        birthDate: new Date(formData.birthDate),
        gender: formData.gender,
        category: formData.category,
        status: formData.status,
        region: {
          id: formData.regionId,
          name: selectedRegion?.name || ''
        }
      })).unwrap()

      toast.success("Atlet berhasil ditambahkan!")
      setFormData({
        name: '',
        birthDate: '',
        gender: '',
        category: '',
        status: '',
        regionId: ''
      })
    } catch (error) {
      toast.error("Gagal menambahkan atlet!")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Komponen A: Form Tambah Atlet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Atlet</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama atlet"
            />
          </div>

          <div>
            <Label htmlFor="birthDate">Tanggal Lahir</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pria">Pria</SelectItem>
                <SelectItem value="Wanita">Wanita</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EPEE">EPEE</SelectItem>
                <SelectItem value="FOIL">FOIL</SelectItem>
                <SelectItem value="SABRE">SABRE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="region">Wilayah</Label>
            <Select value={formData.regionId} onValueChange={(value) => setFormData({ ...formData, regionId: value })}>
              <SelectTrigger>
                <SelectValue placeholder={regionsLoading ? "Loading regions..." : "Pilih wilayah"} />
              </SelectTrigger>
              <SelectContent>
                {regionsLoading ? (
                  <SelectItem value="loading" disabled>Loading regions...</SelectItem>
                ) : regions && regions.length > 0 ? (
                  regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-regions" disabled>No regions available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Menambahkan..." : "Tambah Atlet"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 