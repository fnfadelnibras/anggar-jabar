import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { logAdminCreated } from "@/lib/activity-logger"

// GET /api/admin/admins - Get all admins
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Simplified - no permission check for now
    const admins = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        bio: true,
        location: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Add status field (active by default for now)
    const adminsWithStatus = admins.map(admin => ({
      ...admin,
      status: 'active' as const
    }))

    return NextResponse.json(adminsWithStatus)
  } catch (error) {
    console.error("Error fetching admins:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/admin/admins - Create new admin
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Simplified - no permission check for now
    const body = await request.json()
    const { name, email, password, phone, bio, location, avatar } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new admin
    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        bio,
        location,
        avatar: avatar || '/placeholder-user.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        bio: true,
        location: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Log activity
    await logAdminCreated(newAdmin.name || 'Unknown Admin')

    return NextResponse.json({
      ...newAdmin,
      status: 'active'
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 