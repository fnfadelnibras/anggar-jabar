"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Users, Calendar, BadgeCheck, Globe2, ChevronLeft, ChevronRight, ArrowUpDown, Filter, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export type Athlete = {
  id: string
  name: string
  gender: string
  birthDate: Date
  category: string
  status: string
  region: {
    id: string
    name: string
  }
}

export type Region = {
  id: string
  name: string
  code: string
}

type SortField = 'name' | 'gender' | 'birthDate' | 'category' | 'status' | 'region'
type SortOrder = 'asc' | 'desc'

export default function AthletesPage({ athletes: initialAthletes }: { athletes: Athlete[] }) {
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
    regionId: ''
  })
  const [loading, setLoading] = useState(false)
  
  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const itemsPerPage = 15

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Fetch regions on component mount
  useEffect(() => {
    fetchRegions()
  }, [])

  const fetchRegions = async () => {
    try {
      const response = await fetch('/api/regions')
      const data = await response.json()
      setRegions(data)
    } catch (error) {
      console.error('Failed to fetch regions:', error)
    }
  }

  const fetchAthletes = async () => {
    try {
      const response = await fetch('/api/athletes')
      const data = await response.json()
      setAthletes(data)
    } catch (error) {
      console.error('Failed to fetch athletes:', error)
    }
  }

  // Get unique values for filter options
  const getUniqueCategories = () => {
    const categories = athletes.map(athlete => athlete.category)
    return [...new Set(categories)].sort()
  }

  const getUniqueStatuses = () => {
    const statuses = athletes.map(athlete => athlete.status)
    return [...new Set(statuses)].sort()
  }

  // Filter and sort athletes
  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = 
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || athlete.category === categoryFilter
    const matchesRegion = regionFilter === 'all' || athlete.region.id === regionFilter
    const matchesStatus = statusFilter === 'all' || athlete.status === statusFilter

    return matchesSearch && matchesCategory && matchesRegion && matchesStatus
  })

  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortField) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'gender':
        aValue = a.gender
        bValue = b.gender
        break
      case 'birthDate':
        aValue = new Date(a.birthDate)
        bValue = new Date(b.birthDate)
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
  const currentAthletes = sortedAthletes.slice(startIndex, endIndex)

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
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilterChange = (filterType: 'category' | 'region' | 'status', value: string) => {
    switch (filterType) {
      case 'category':
        setCategoryFilter(value)
        break
      case 'region':
        setRegionFilter(value)
        break
      case 'status':
        setStatusFilter(value)
        break
    }
    setCurrentPage(1) // Reset to first page when filtering
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setCategoryFilter('all')
    setRegionFilter('all')
    setStatusFilter('all')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm || categoryFilter !== 'all' || regionFilter !== 'all' || statusFilter !== 'all'

  const handleAdd = () => {
    setFormData({
      name: '',
      birthDate: '',
      gender: '',
      category: '',
      status: '',
      regionId: ''
    })
    setIsAddDialogOpen(true)
  }

  const handleEdit = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setFormData({
      name: athlete.name,
      birthDate: new Date(athlete.birthDate).toISOString().split('T')[0],
      gender: athlete.gender,
      category: athlete.category,
      status: athlete.status,
      regionId: athlete.region.id
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (athlete: Athlete) => {
    setSelectedAthlete(athlete)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveAthlete = async () => {
    setLoading(true)
    try {
      const url = isEditDialogOpen ? '/api/athletes' : '/api/athletes'
      const method = isEditDialogOpen ? 'PUT' : 'POST'
      const body = isEditDialogOpen 
        ? { ...formData, id: selectedAthlete?.id }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast({
          title: isEditDialogOpen ? "Athlete updated" : "Athlete created",
          description: isEditDialogOpen 
            ? "The athlete has been updated successfully."
            : "The athlete has been created successfully.",
        })
        await fetchAthletes()
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        setFormData({
          name: '',
          birthDate: '',
          gender: '',
          category: '',
          status: '',
          regionId: ''
        })
      } else {
        throw new Error('Failed to save athlete')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save athlete. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedAthlete) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/athletes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedAthlete.id }),
      })

      if (response.ok) {
        toast({
          title: "Athlete deleted",
          description: "The athlete has been deleted successfully.",
        })
        await fetchAthletes()
        setIsDeleteDialogOpen(false)
      } else {
        throw new Error('Failed to delete athlete')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete athlete. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Athletes</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Athlete
        </Button>
      </div>

       {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              <p className="text-sm text-muted-foreground">Male</p>
              <h3 className="text-2xl font-bold mt-1">{athletes.filter((a) => a.gender === "Pria").length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BadgeCheck className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Female</p>
              <h3 className="text-2xl font-bold mt-1">{athletes.filter((a) => a.gender === "Wanita").length}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center">
              <Globe2 className="h-6 w-6 text-pink-500" />
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
            <Label htmlFor="region-filter" className="text-sm font-medium">Region</Label>
            <Select value={regionFilter} onValueChange={(value) => handleFilterChange('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
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
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('gender')}
                  className="h-auto p-0 font-medium"
                >
                  Gender
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('birthDate')}
                  className="h-auto p-0 font-medium"
                >
                  Birth Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
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
            {currentAthletes.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell>{athlete.name}</TableCell>
                <TableCell>{athlete.gender}</TableCell>
                <TableCell>{new Date(athlete.birthDate).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>{athlete.category}</TableCell>
                <TableCell>{athlete.status}</TableCell>
                <TableCell>{athlete.region.name}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(athlete)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(athlete)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
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
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false)
              setIsEditDialogOpen(false)
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
    </AdminLayout>
  )
}
