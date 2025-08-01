"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ImageCropper } from "@/components/ui/image-cropper"
import { 
  User, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Key,
  Save,
  Camera,
  Edit
} from "lucide-react"
import { toast } from "sonner"
import { ChangePasswordDialog } from "@/components/change-password-dialog"

interface AdminProfile {
  id: string
  name: string
  email: string
  phone: string
  role: string
  avatar: string
  bio: string
  location: string
  joinDate: string
  lastLogin: string
  permissions: string[]
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  
  // Image crop states
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [tempImageSrc, setTempImageSrc] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  // Mock data - replace with actual data from API
  const [profile, setProfile] = useState<AdminProfile>({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
    bio: "",
    location: "",
    joinDate: "",
    lastLogin: "",
    permissions: []
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: ""
  })

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          bio: data.bio || "",
          location: data.location || ""
        })
      } else {
        toast.error("Failed to fetch profile data.")
      }
          } catch (error) {
        toast.error("Failed to fetch profile data.")
      } finally {
      setInitialLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(prev => ({
          ...prev,
          ...data
        }))
        
        toast.success("Profile Updated", {
          description: "Your profile has been successfully updated.",
        })
      } else {
        const errorData = await response.json()
        toast.error("Error", {
          description: errorData.error || "Failed to update profile. Please try again.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update profile. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCropComplete = async (croppedImageUrl: string) => {
    try {
      // Upload the cropped image to Cloudinary
      const imageUrl = await uploadImage(croppedImageUrl)
      
      // Update the profile with the new avatar URL
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          avatar: imageUrl
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(prev => ({
          ...prev,
          avatar: data.avatar
        }))
        
        toast.success("Avatar Updated", {
          description: "Your avatar has been updated successfully.",
        })
      } else {
        const errorData = await response.json()
        toast.error("Error", {
          description: errorData.error || "Failed to update avatar.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update avatar.",
      })
    } finally {
      setIsCropperOpen(false)
      setImageFile(null)
      setTempImageSrc("")
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-gray-400 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile.id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-muted-foreground mb-4">No profile data available</div>
          <Button onClick={fetchProfile} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="profile" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
          >
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
          >
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar ? `${profile.avatar}?f_auto,q_100` : "/placeholder-user.jpg"} alt={profile.name} />
                    <AvatarFallback className="text-lg">
                      {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AD'}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 cursor-pointer">
                    <div className="bg-primary text-primary-foreground rounded-full p-1 hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                
                                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{profile.name || "Admin User"}</h3>
                      <p className="text-muted-foreground">{profile.email}</p>
                                          <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">Admin</Badge>
                      <span className="text-sm text-muted-foreground">
                        Member since {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString('id-ID') : "N/A"}
                      </span>
                    </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.phone || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.location || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Last login: {profile.lastLogin ? new Date(profile.lastLogin).toLocaleString('id-ID') : "N/A"}</span>
                      </div>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter your location"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself and your experience"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Share information about your background, experience, and role in the organization.
                </p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFormData({
                      name: profile.name,
                      email: profile.email,
                      phone: profile.phone || "",
                      bio: profile.bio || "",
                      location: profile.location || ""
                    })
                  }}
                >
                  Reset
                </Button>
                <Button onClick={handleSaveProfile} disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-transparent border-t-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permissions & Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Role</h4>
                    <p className="text-sm text-muted-foreground">{profile.role}</p>
                  </div>
                  <Badge variant="outline">{profile.role}</Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Access Level</h4>
                  <div className="text-sm text-muted-foreground">
                    Full access to all system features
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">Update your password</p>
                  </div>
                  <ChangePasswordDialog />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>Enable</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Sessions</h4>
                    <p className="text-sm text-muted-foreground">Manage active sessions</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>View</Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Additional security features will be available in future updates.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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