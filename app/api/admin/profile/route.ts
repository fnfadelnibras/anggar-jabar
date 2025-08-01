import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/profile - Get admin profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get admin user from database
    const admin = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        permissions: true
      }
    })

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: admin.id,
      name: admin.name || "Admin User",
      email: admin.email,
      phone: admin.phone || "+62 812-3456-7890",
      avatar: admin.avatar || "/placeholder-user.jpg",
      bio: admin.bio || "Administrator untuk sistem IKASI JABAR dengan pengalaman 5 tahun dalam manajemen atlet dan turnamen.",
      location: admin.location || "Jakarta, Indonesia",
      joinDate: admin.createdAt.toISOString(),
      lastLogin: admin.lastLogin?.toISOString() || new Date().toISOString()
    })
  } catch (error) {
    console.error("Error fetching admin profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/profile - Update admin profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, phone, bio, location, avatar } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { email: session.user.email }
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already taken" },
        { status: 400 }
      )
    }

    // Update admin profile
    const updatedAdmin = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        email,
        phone,
        bio,
        location,
        avatar,
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        permissions: true
      }
    })

    return NextResponse.json({
      id: updatedAdmin.id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
      avatar: updatedAdmin.avatar,
      bio: updatedAdmin.bio,
      location: updatedAdmin.location,
      joinDate: updatedAdmin.createdAt.toISOString(),
      lastLogin: updatedAdmin.lastLogin?.toISOString(),
      message: "Profile updated successfully"
    })
  } catch (error) {
    console.error("Error updating admin profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 