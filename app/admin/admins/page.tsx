"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  EyeOff,
  Save,
  X
} from "lucide-react"
import { toast } from "sonner"
import { ImageCropper } from "@/components/ui/image-cropper"

interface Admin {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  bio: string
  location: string
  lastLogin: string
  createdAt: string
  status: 'active' | 'inactive'
}

interface AdminFormData {
  name: string
  email: string
  password: string
  phone: string
  bio: string
  location: string
  avatar: string
}

// Simplified without roles and permissions for now

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [tempImageSrc, setTempImageSrc] = useState<string>('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    location: '',
    avatar: ''
  })

  const fetchAdmins = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/admins')
      if (response.ok) {
        const data = await response.json()
        setAdmins(data)
      } else {
        toast.error("Failed to fetch admins.")
      }
    } catch (error) {
      toast.error("Failed to fetch admins.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAdmins()
  }, [fetchAdmins])

  useEffect(() => {
    if (dialogOpen && !editingAdmin) {
      resetForm()
    }
  }, [dialogOpen, editingAdmin])

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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

  // Removed permission toggle function

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      bio: '',
      location: '',
      avatar: ''
    })
    setEditingAdmin(null)
    setShowPassword(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || (!editingAdmin && !formData.password)) {
      toast.error("Error", {
        description: "Please fill in all required fields.",
      })
      return
    }

    try {
      let avatarUrl = formData.avatar

      // Upload image if a new file is selected or cropped image is available
      if (imageFile) {
        avatarUrl = await uploadImage(imageFile)
      } else if (imagePreview && imagePreview !== formData.avatar) {
        // Upload cropped image
        avatarUrl = await uploadImage(imagePreview)
      }

      const url = editingAdmin 
        ? `/api/admin/admins/${editingAdmin.id}`
        : '/api/admin/admins'
      
      const method = editingAdmin ? 'PUT' : 'POST'
      const body = editingAdmin 
        ? { ...formData, password: formData.password || undefined, avatar: avatarUrl }
        : { ...formData, avatar: avatarUrl }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast.success("Success", {
          description: editingAdmin 
            ? "Admin updated successfully." 
            : "Admin created successfully.",
        })
        setDialogOpen(false)
        resetForm()
        setImageFile(null)
        setImagePreview('')
        fetchAdmins()
      } else {
        const errorData = await response.json()
        toast.error("Error", {
          description: errorData.error || "Failed to save admin.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save admin.",
      })
    }
  }

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '',
      phone: admin.phone || '',
      bio: admin.bio || '',
      location: admin.location || '',
      avatar: admin.avatar || ''
    })
    setDialogOpen(true)
  }

  const handleDelete = (admin: Admin) => {
    setSelectedAdmin(admin)
    setIsDeleteDialogOpen(true)
    toast.warning("Konfirmasi penghapusan", {
      description: `Anda akan menghapus admin: ${admin.name}`,
    })
  }

  const handleDeleteConfirm = async () => {
    if (!selectedAdmin) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/admins/${selectedAdmin.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success("Admin berhasil dihapus!", {
          description: "Data admin telah berhasil dihapus dari sistem.",
        })
        fetchAdmins()
        setIsDeleteDialogOpen(false)
      } else {
        const errorData = await response.json()
        toast.error("Gagal menghapus data admin!", {
          description: errorData.error || "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
        })
      }
    } catch (error) {
      toast.error("Gagal menghapus data admin!", {
        description: "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (adminId: string, currentStatus: string) => {
    try {
      const response = await fetch(`/api/admin/admins/${adminId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: currentStatus === 'active' ? 'inactive' : 'active'
        }),
      })

      if (response.ok) {
        toast.success("Success", {
          description: "Admin status updated successfully.",
        })
        fetchAdmins()
      } else {
        const errorData = await response.json()
        toast.error("Error", {
          description: errorData.error || "Failed to update admin status.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update admin status.",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-gray-400 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admins...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-muted-foreground mt-1">Manage system administrators and their permissions</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
              </DialogTitle>
              <DialogDescription>
                {editingAdmin 
                  ? 'Update admin information and permissions.' 
                  : 'Create a new admin account with specific permissions.'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    {editingAdmin ? 'New Password (leave blank to keep current)' : 'Password *'}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder={editingAdmin ? "Enter new password" : "Enter password"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Enter bio"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar</Label>
                  <div className="space-y-2">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    {(imagePreview || formData.avatar) && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview || (formData.avatar ? `${formData.avatar}?f_auto,q_100` : '')} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                        {editingAdmin && formData.avatar && !imagePreview && (
                          <p className="text-xs text-muted-foreground mt-1">Current image</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Permissions section removed for now */}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {editingAdmin ? 'Update Admin' : 'Create Admin'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            System Administrators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
                             <TableHeader>
                 <TableRow>
                   <TableHead>Admin</TableHead>
                   <TableHead>Contact</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Last Login</TableHead>
                   <TableHead>Created</TableHead>
                   <TableHead className="w-[50px]">Actions</TableHead>
                 </TableRow>
               </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={admin.avatar ? `${admin.avatar}?f_auto,q_100` : "/placeholder-user.jpg"} alt={admin.name} />
                          <AvatarFallback>
                            {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-sm text-muted-foreground">{admin.email}</div>
                        </div>
                      </div>
                                         </TableCell>
                     <TableCell>
                      <div className="text-sm">
                        {admin.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {admin.phone}
                          </div>
                        )}
                        {admin.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {admin.location}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={admin.status === 'active' ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(admin.id, admin.status)}
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {admin.lastLogin 
                          ? new Date(admin.lastLogin).toLocaleDateString('id-ID')
                          : 'Never'
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(admin.createdAt).toLocaleDateString('id-ID')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(admin)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(admin.id, admin.status)}
                            className="text-orange-600"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(admin)}
                            className="text-red-600"
                          >
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
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete this admin?</DialogDescription>
          </DialogHeader>
          {selectedAdmin && (
            <div>
              <p>You are about to delete <strong>{selectedAdmin.name}</strong>.</p>
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
        aspectRatio={1}
        cropShape="round"
      />
    </div>
  )
} 