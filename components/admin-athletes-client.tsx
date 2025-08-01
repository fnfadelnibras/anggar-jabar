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
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Users, CheckCircle, ChevronLeft, ChevronRight, ArrowUpDown, Filter, X } from "lucide-react"
import { toast } from "sonner"
import { ImageCropper } from "@/components/ui/image-cropper"
import Image from "next/image"

interface Athlete {
  id: string
  name: string
  birthDate: string
  gender: string
  category: string
  status: string
  image?: string // Cloudinary URL for athlete photo
  region: {
    id: string
    name: string
    code: string
  }
  createdAt: string
  updatedAt: string
}

interface Region {
  id: string
  name: string
  code: string
}

type SortField = 'name' | 'category' | 'status' | 'region'
type SortOrder = 'asc' | 'desc'

export function AdminAthletesClient({ athletes: initialAthletes }: { athletes: Athlete[] }) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes)
  const [regions, setRegions] = useState<Region[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    category: '',
    status: '',
    regionId: '',
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
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('all')

  const fetchAthletes = async () => {
    try {
      console.log('Fetching fresh athletes data...')
      const response = await fetch('/api/athletes')
      if (!response.ok) {
        throw new Error('Failed to fetch athletes')
      }
      const data = await response.json()
      console.log('Fresh athletes data:', data)
      setAthletes(data)
    } catch (error) {
      console.error('Failed to fetch athletes:', error)
      toast.error('Failed to refresh athletes data')
    }
  }

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
  const getUniqueCategories = () => {
    const categories = athletes.map(athlete => athlete.category)
    return [...new Set(categories)]
  }

  const getUniqueStatuses = () => {
    const statuses = athletes.map(athlete => athlete.status)
    return [...new Set(statuses)]
  }

  const getUniqueRegions = () => {
    // Use regions from database instead of only from athletes
    return regions.map(region => ({ id: region.id, name: region.name }))
  }

  // Filter and sort athletes
  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = 
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.region.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || athlete.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || athlete.status === statusFilter
    const matchesRegion = regionFilter === 'all' || athlete.region.name === regionFilter

    return matchesSearch && matchesCategory && matchesStatus && matchesRegion
  })

  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortField) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'category':
        aValue = a.category
        bValue = b.category
        break
      case 'status':
        aValue = a.status
        bValue = b.status
        break
      case 'region':
        aValue = a.region.name
        bValue = b.region.name
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
  const totalPages = Math.ceil(sortedAthletes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAthletes = sortedAthletes.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType: 'category' | 'status' | 'region', value: string) => {
    switch (filterType) {
      case 'category':
        setCategoryFilter(value)
        break
      case 'status':
        setStatusFilter(value)
        break
      case 'region':
        setRegionFilter(value)
        break
    }
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setCategoryFilter('all')
    setStatusFilter('all')
    setRegionFilter('all')
    setSortField('name')
    setSortOrder('asc')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || regionFilter !== 'all'

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

  const handleAdd = () => {
    setFormData({
      name: '',
      birthDate: '',
      gender: '',
      category: '',
      status: '',
      regionId: '',
      image: ''
    })
    setSelectedAthlete(null)
    setImageFile(null)
    setImagePreview('')
    setIsAddDialogOpen(true)
  }

  const handleEdit = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setFormData({
      name: athlete.name,
      birthDate: athlete.birthDate,
      gender: athlete.gender,
      category: athlete.category,
      status: athlete.status,
      regionId: athlete.region.id,
      image: athlete.image || ''
    })
    setImageFile(null)
    setImagePreview('')
    setIsEditDialogOpen(true)
  }

  const handleDelete = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveAthlete = async () => {
    if (!formData.name || !formData.birthDate || !formData.gender || !formData.category || !formData.status || !formData.regionId) {
      toast.error("Error", {
        description: "Please fill in all required fields.",
      })
      return
    }

    setLoading(true)
    try {
      let imageUrl = formData.image

      // Upload image if a new file is selected or cropped image is available
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      } else if (imagePreview && imagePreview !== formData.image) {
        // Upload cropped image
        imageUrl = await uploadImage(imagePreview)
      }

      const url = selectedAthlete 
        ? `/api/athletes/${selectedAthlete.id}`
        : '/api/athletes'
      
      const method = selectedAthlete ? 'PUT' : 'POST'
      const body = {
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender,
        category: formData.category,
        status: formData.status,
        regionId: formData.regionId,
        image: imageUrl
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success("Success", {
          description: selectedAthlete 
            ? "Athlete updated successfully." 
            : "Athlete created successfully.",
        })
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        setImageFile(null)
        setImagePreview('')
        // Refresh data from server
        await fetchAthletes()
      } else {
        const errorData = await response.json()
        toast.error("Error", {
          description: errorData.error || "Failed to save athlete.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save athlete.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedAthlete) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/athletes/${selectedAthlete.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success("Athlete berhasil dihapus!", {
          description: "Data atlet telah berhasil dihapus dari sistem.",
        })
        setIsDeleteDialogOpen(false)
        // Refresh data from server
        await fetchAthletes()
      } else {
        const errorData = await response.json()
        toast.error("Gagal menghapus data atlet!", {
          description: errorData.error || "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
        })
      }
    } catch (error) {
      toast.error("Gagal menghapus data atlet!", {
        description: "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Load regions on component mount
  useEffect(() => {
    fetchRegions()
  }, [])

  // Refresh athletes data on component mount and after operations
  useEffect(() => {
    fetchAthletes()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Athletes</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Athlete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Athletes</p>
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
              <p className="text-sm text-muted-foreground">Active Athletes</p>
              <h3 className="text-2xl font-bold mt-1">
                {athletes.filter((a) => a.status === 'ACTIVE').length}
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
              <p className="text-sm text-muted-foreground">Male Athletes</p>
              <h3 className="text-2xl font-bold mt-1">
                {athletes.filter((a) => a.gender === 'Pria').length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Female Athletes</p>
              <h3 className="text-2xl font-bold mt-1">
                {athletes.filter((a) => a.gender === 'Wanita').length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-pink-500" />
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
            placeholder="Search athletes..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category-filter" className="text-sm font-medium">Category</Label>
            <Select value={categoryFilter} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
            <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {getUniqueStatuses().map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
                     <div className="space-y-2">
             <Label htmlFor="region-filter" className="text-sm font-medium">Region</Label>
             <Select value={regionFilter} onValueChange={(value) => handleFilterChange('region', value)}>
               <SelectTrigger>
                 <SelectValue placeholder="All Regions" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Regions</SelectItem>
                 {getUniqueRegions().map((region) => (
                   <SelectItem key={region.id} value={region.name}>
                     {region.name}
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
              <TableHead>Photo</TableHead>
              <TableHead>Birth Date</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('category')}
                  className="h-auto p-0 font-medium"
                >
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('status')}
                  className="h-auto p-0 font-medium"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('region')}
                  className="h-auto p-0 font-medium"
                >
                  Region
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAthletes.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell>
                  {athlete.image && (
                     <Image 
                       src={athlete.image ? `${athlete.image}?f_auto,q_100,w_40,h_40,c_fill` : "/placeholder.svg"} 
                       alt="Athlete" 
                       width={40}
                       height={40}
                       className="rounded-md"
                     />
                   )}
                </TableCell>
                <TableCell>{new Date(athlete.birthDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={athlete.gender === 'Pria' ? 'default' : 'secondary'}>
                    {athlete.gender}
                  </Badge>
                </TableCell>
                <TableCell>{athlete.category}</TableCell>
                <TableCell>
                  <Badge variant={athlete.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {athlete.status}
                  </Badge>
                </TableCell>
                <TableCell>{athlete.region.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(athlete)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(athlete)}
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
            Showing {startIndex + 1} to {Math.min(endIndex, sortedAthletes.length)} of {sortedAthletes.length} results
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
          // Reset form data when dialog closes
          setFormData({
            name: '',
            birthDate: '',
            gender: '',
            category: '',
            status: '',
            regionId: '',
            image: ''
          })
          setImageFile(null)
          setImagePreview('')
          setSelectedAthlete(null)
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Athlete' : 'Add New Athlete'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Update the athlete\'s information.' : 'Enter the athlete\'s information.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Athlete name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium">Birth Date</Label>
              <Input 
                id="birthDate" 
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pria">Pria</SelectItem>
                  <SelectItem value="Wanita">Wanita</SelectItem>
                </SelectContent>
              </Select>
            </div>
                         <div className="space-y-2">
               <Label htmlFor="category" className="text-sm font-medium">Category</Label>
               <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                 <SelectTrigger>
                   <SelectValue placeholder="Select category" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="EPEE">EPEE</SelectItem>
                   <SelectItem value="SABRE">SABRE</SelectItem>
                   <SelectItem value="FOIL">FOIL</SelectItem>
                 </SelectContent>
               </Select>
             </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regionId" className="text-sm font-medium">Region</Label>
              <Select value={formData.regionId} onValueChange={(value) => setFormData({...formData, regionId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueRegions().map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">Photo</Label>
              <div className="space-y-2">
                <Input 
                  id="image" 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {(imagePreview || formData.image) && (
                  <div className="mt-2">
                    <Image 
                      src={imagePreview || (formData.image ? `${formData.image}?f_auto,q_100` : '')} 
                      alt="Preview" 
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    {isEditDialogOpen && formData.image && !imagePreview && (
                      <p className="text-xs text-muted-foreground mt-1">Current image</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false)
              setIsEditDialogOpen(false)
              // Reset form data when canceling
              setFormData({
                name: '',
                birthDate: '',
                gender: '',
                category: '',
                status: '',
                regionId: '',
                image: ''
              })
              setImageFile(null)
              setImagePreview('')
              setSelectedAthlete(null)
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveAthlete} disabled={loading}>
              {loading ? 'Saving...' : (isEditDialogOpen ? 'Save Changes' : 'Save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete this athlete?</DialogDescription>
          </DialogHeader>
          {selectedAthlete && (
            <div>
              <p>You are about to delete <strong>{selectedAthlete.name}</strong>.</p>
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
        aspectRatio={4/5}
        cropShape="rect"
      />
    </div>
  )
} 