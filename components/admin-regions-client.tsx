"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Map, CheckCircle, ChevronLeft, ChevronRight, ArrowUpDown, Filter, X } from "lucide-react"
import { toast } from "sonner"
import { ImageCropper } from "@/components/ui/image-cropper"

interface Region {
  id: string
  name: string
  code: string
  description?: string
  image?: string // Cloudinary URL for region image
  _count?: {
    athletes: number
  }
}

type SortField = 'name' | 'code' | 'athletes'
type SortOrder = 'asc' | 'desc'

export function AdminRegionsClient({ regions: initialRegions }: { regions: Region[] }) {
  const [regions, setRegions] = useState<Region[]>(initialRegions)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [tempImageSrc, setTempImageSrc] = useState<string>('')
  
  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const itemsPerPage = 15

  // Filter state
  const [athletesFilter, setAthletesFilter] = useState<string>('all')

  const fetchRegions = async () => {
    try {
      const response = await fetch('/api/regions')
      const data = await response.json()
      setRegions(data)
    } catch (error) {
      console.error('Failed to fetch regions:', error)
    }
  }

  // Get unique values for filter options
  const getAthletesFilterOptions = () => {
    const athleteCounts = regions.map(region => region._count?.athletes || 0)
    const uniqueCounts = [...new Set(athleteCounts)].sort((a, b) => a - b)
    return uniqueCounts
  }

  // Filter and sort regions
  const filteredRegions = regions.filter(region => {
    const matchesSearch = 
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.code.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAthletes = athletesFilter === 'all' || (region._count?.athletes || 0) === parseInt(athletesFilter)

    return matchesSearch && matchesAthletes
  })

  const sortedRegions = [...filteredRegions].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortField) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'code':
        aValue = a.code
        bValue = b.code
        break
      case 'athletes':
        aValue = a._count?.athletes || 0
        bValue = b._count?.athletes || 0
        break
      default:
        aValue = a.name
        bValue = b.name
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedRegions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRegions = sortedRegions.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    toast.info("Data diurutkan", {
      description: `Data diurutkan berdasarkan ${field} (${sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'})`,
    })
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilterChange = (filterType: 'athletes', value: string) => {
    setAthletesFilter(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setAthletesFilter('all')
    setCurrentPage(1)
    toast.info("Filter telah dibersihkan", {
      description: "Semua filter dan pencarian telah direset.",
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string
        setTempImageSrc(imageSrc)
        setIsCropperOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImageUrl: string) => {
    setImagePreview(croppedImageUrl)
    setImageFile(null) // Reset file since we're using cropped image
    setIsCropperOpen(false)
  }

  const uploadImage = async (file: File | string): Promise<string> => {
    const formData = new FormData()
    
    if (typeof file === 'string') {
      // Convert data URL to blob
      const response = await fetch(file)
      const blob = await response.blob()
      formData.append('file', blob, 'cropped-image.jpg')
    } else {
      formData.append('file', file)
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.url
  }

  const hasActiveFilters = searchTerm || athletesFilter !== 'all'

  const handleAdd = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      image: ''
    })
    setIsAddDialogOpen(true)
    toast.info("Form tambah wilayah dibuka", {
      description: "Silakan isi data wilayah yang akan ditambahkan.",
    })
  }

  const handleEdit = (region: Region) => {
    setSelectedRegion(region)
    setFormData({
      name: region.name,
      code: region.code,
      description: region.description || '',
      image: region.image || ''
    })
    setIsEditDialogOpen(true)
    toast.info("Form edit wilayah dibuka", {
      description: `Mengedit data wilayah: ${region.name}`,
    })
  }

  const handleDelete = (region: Region) => {
    setSelectedRegion(region)
    setIsDeleteDialogOpen(true)
    toast.warning("Konfirmasi penghapusan", {
      description: `Anda akan menghapus wilayah: ${region.name}`,
    })
  }

  const handleSaveRegion = async () => {
    setLoading(true)
    try {
      let imageUrl = formData.image

      // Upload image if a new file is selected or if we have a cropped image
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      } else if (imagePreview && imagePreview !== formData.image) {
        imageUrl = await uploadImage(imagePreview)
      }

      const url = '/api/regions'
      const method = isEditDialogOpen ? 'PUT' : 'POST'
      const body = isEditDialogOpen 
        ? { ...formData, id: selectedRegion?.id, image: imageUrl }
        : { ...formData, image: imageUrl }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success(
          isEditDialogOpen ? "Wilayah berhasil diperbarui!" : "Wilayah berhasil ditambahkan!",
          {
            description: isEditDialogOpen
              ? `Data wilayah ${selectedRegion?.name} telah berhasil diperbarui.`
              : "Data wilayah baru telah berhasil ditambahkan ke sistem.",
          }
        )
        await fetchRegions()
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        setFormData({
          name: '',
          code: '',
          description: '',
          image: ''
        })
        setImageFile(null)
        setImagePreview('')
      } else {
        throw new Error('Failed to save region')
      }
    } catch (error) {
      toast.error("Gagal menyimpan data wilayah!", {
        description: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedRegion) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/regions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedRegion.id }),
      })

      if (response.ok) {
        toast.success("Wilayah berhasil dihapus!", {
          description: "Data wilayah telah berhasil dihapus dari sistem.",
        })
        await fetchRegions()
        setIsDeleteDialogOpen(false)
      } else {
        throw new Error('Failed to delete region')
      }
    } catch (error) {
      toast.error("Gagal menghapus data wilayah!", {
        description: "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Regions</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Region
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Regions</p>
              <h3 className="text-2xl font-bold mt-1">{regions.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Map className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Athletes</p>
              <h3 className="text-2xl font-bold mt-1">
                {regions.reduce((total, region) => total + (region._count?.athletes || 0), 0)}
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
              <p className="text-sm text-muted-foreground">Active Regions</p>
              <h3 className="text-2xl font-bold mt-1">
                {regions.filter((r) => (r._count?.athletes || 0) > 0).length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search regions..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="athletes-filter" className="text-sm font-medium">Athletes Count</Label>
            <Select value={athletesFilter} onValueChange={(value) => handleFilterChange('athletes', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Athletes Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Athletes Count</SelectItem>
                {getAthletesFilterOptions().map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} Athletes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="w-full h-10"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Image</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('code')}
                  className="h-auto p-0 font-medium"
                >
                  Code
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('athletes')}
                  className="h-auto p-0 font-medium"
                >
                  Athletes
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRegions.map((region) => (
              <TableRow key={region.id}>
                <TableCell>{region.name}</TableCell>
                <TableCell>{region.image ? <img src={`${region.image}?f_auto,q_100,w_40,h_40,c_fill`} alt="Region" className="h-10 w-10 rounded-full" /> : 'No Image'}</TableCell>
                <TableCell>{region.code}</TableCell>
                <TableCell className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                  {region._count?.athletes ?? 0}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(region)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(region)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedRegions.length)} of {sortedRegions.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false)
          setIsEditDialogOpen(false)
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Region' : 'Add New Region'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Update the region\'s information.' : 'Enter the region\'s information.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Region Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Region name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">Region Code</Label>
              <Input 
                id="code" 
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                placeholder="3-letter code" 
                maxLength={3} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description" 
              />
            </div>
            {isEditDialogOpen && (
              <div className="space-y-2">
                <Label htmlFor="current-image" className="text-sm font-medium">Current Image</Label>
                {formData.image ? (
                  <div className="flex items-center space-x-2">
                    <img src={formData.image} alt="Current Region" className="h-10 w-10 rounded-full" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="h-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No image uploaded.</p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">Upload New Image</Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
                {(imagePreview || formData.image) && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview || (formData.image ? `${formData.image}?f_auto,q_100` : '')} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    {isEditDialogOpen && formData.image && !imagePreview && (
                      <p className="text-xs text-muted-foreground mt-1">Current image</p>
                    )}
                  </div>
                )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false)
              setIsEditDialogOpen(false)
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveRegion} disabled={loading}>
              {loading ? 'Saving...' : (isEditDialogOpen ? 'Save Changes' : 'Save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete this region?</DialogDescription>
          </DialogHeader>
          {selectedRegion && (
            <div>
              <p>You are about to delete <strong>{selectedRegion.name}</strong>.</p>
              <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Cropper */}
      <ImageCropper
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        aspectRatio={16/9}
        cropShape="rect"
      />
    </div>
  )
} 