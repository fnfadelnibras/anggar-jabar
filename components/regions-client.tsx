"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
  CheckCircle,
  Map,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type Region = {
  id: string
  name: string
  code: string
  description?: string
  _count?: {
    athletes: number
  }
}

type SortField = 'name' | 'code' | 'athletes'
type SortOrder = 'asc' | 'desc'

export default function RegionsPage({ regions: initialRegions }: { regions: Region[] }) {
  const [regions, setRegions] = useState<Region[]>(initialRegions)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  
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
  }

  const hasActiveFilters = searchTerm || athletesFilter !== 'all'

  const handleAdd = () => {
    setFormData({
      name: '',
      code: '',
      description: ''
    })
    setIsAddDialogOpen(true)
  }

  const handleEdit = (region: Region) => {
    setSelectedRegion(region)
    setFormData({
      name: region.name,
      code: region.code,
      description: region.description || ''
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (region: Region) => {
    setSelectedRegion(region)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveRegion = async () => {
    setLoading(true)
    try {
      const url = '/api/regions'
      const method = isEditDialogOpen ? 'PUT' : 'POST'
      const body = isEditDialogOpen 
        ? { ...formData, id: selectedRegion?.id }
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
          title: isEditDialogOpen ? "Region updated" : "Region created",
          description: isEditDialogOpen
            ? `The region ${selectedRegion?.name} has been updated.`
            : "New region has been created.",
        })
        await fetchRegions()
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        setFormData({
          name: '',
          code: '',
          description: ''
        })
      } else {
        throw new Error('Failed to save region')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save region. Please try again.",
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
        toast({
          title: "Region deleted",
          description: "The region has been deleted successfully.",
        })
        await fetchRegions()
        setIsDeleteDialogOpen(false)
      } else {
        throw new Error('Failed to delete region')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete region. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
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
              <Users className="h-6 w-6 text-green-500" />
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
                <TableCell>{region.code}</TableCell>
                <TableCell className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  {region._count?.athletes ?? 0}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(region)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(region)}>
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
    </AdminLayout>
  )
}
