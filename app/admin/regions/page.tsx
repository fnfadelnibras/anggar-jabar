"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Users, Medal, CheckCircle, Map, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "@/hooks/use-toast"

export default function RegionsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<any>(null)

  // Sample region data
  const regions = [
    { id: 1, name: "Jakarta", code: "JKT", athletes: 45 },
    { id: 2, name: "Bali", code: "BAL", athletes: 38 },
    { id: 3, name: "Surabaya", code: "SBY", athletes: 32 },
    { id: 4, name: "Bandung", code: "BDG", athletes: 28 },
    { id: 5, name: "Makassar", code: "MKS", athletes: 25 },
    { id: 6, name: "Medan", code: "MDN", athletes: 22 },
    { id: 7, name: "Yogyakarta", code: "YOG", athletes: 20 },
    { id: 8, name: "Palembang", code: "PLB", athletes: 18 },
  ]

  const handleEdit = (region: any) => {
    setSelectedRegion(region)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (region: any) => {
    setSelectedRegion(region)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveRegion = () => {
    toast({
      title: isEditDialogOpen ? "Region updated" : "Region created",
      description: isEditDialogOpen
        ? `The region ${selectedRegion.name} has been updated successfully.`
        : "The new region has been created successfully.",
    })
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
  }

  const handleDeleteConfirm = () => {
    toast({
      title: "Region deleted",
      description: "The region has been deleted successfully.",
    })
    setIsDeleteDialogOpen(false)
  }

  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Regions</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Region
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Regions</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Map className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Regions</p>
              <h3 className="text-2xl font-bold mt-1">6</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Athletes</p>
              <h3 className="text-2xl font-bold mt-1">228</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search regions..." className="pl-10" />
        </div>
      </div>

      {/* Regions Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Athletes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.map((region) => (
              <TableRow key={region.id}>
                <TableCell className="font-medium">{region.name}</TableCell>
                <TableCell>{region.code}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    {region.athletes}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(region)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(region)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
          <span className="font-medium">8</span> regions
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Add Region Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Region</DialogTitle>
            <DialogDescription>Enter the details of the new region. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Region Name</Label>
              <Input id="name" placeholder="Region name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Region Code</Label>
              <Input id="code" placeholder="3-letter code" maxLength={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Region description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRegion}>Save Region</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Region Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Region</DialogTitle>
            <DialogDescription>Update the details of the region. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedRegion && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Region Name</Label>
                <Input id="edit-name" defaultValue={selectedRegion.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code">Region Code</Label>
                <Input id="edit-code" defaultValue={selectedRegion.code} maxLength={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" placeholder="Region description" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRegion}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this region? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedRegion && (
            <div className="py-4">
              <p className="mb-2">
                You are about to delete <span className="font-semibold">{selectedRegion.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                This region has {selectedRegion.athletes} athletes associated with it. Deleting this region will not delete the associated data, but it will remove the association.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AdminLayout>
  )
}
