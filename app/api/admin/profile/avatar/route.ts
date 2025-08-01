import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"

// POST /api/admin/profile/avatar - Upload avatar
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed" },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 5MB" },
        { status: 400 }
      )
    }

    let avatarUrl = ""

    // Check if Cloudinary credentials are available
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      // Fallback to base64 storage if Cloudinary is not configured
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      avatarUrl = `data:${file.type};base64,${base64}`
    } else {
      // Upload to Cloudinary
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Convert buffer to base64 string for Cloudinary
      const base64String = buffer.toString('base64')
      const dataURI = `data:${file.type};base64,${base64String}`
      
      try {
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'admin-avatars',
          transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:best', fetch_format: 'auto', flags: 'progressive' }
          ]
        })
        
        avatarUrl = result.secure_url
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError)
        return NextResponse.json(
          { error: "Failed to upload image to Cloudinary" },
          { status: 500 }
        )
      }
    }

    // Update user avatar in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        avatar: avatarUrl,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      message: "Avatar updated successfully"
    })
  } catch (error) {
    console.error("Error uploading avatar:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/profile/avatar - Remove avatar
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Remove avatar from user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        avatar: null,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      message: "Avatar removed successfully"
    })
  } catch (error) {
    console.error("Error removing avatar:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 