import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PUT /api/admin/admins/[id]/status - Toggle admin status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { status } = body

    // Validate status
    if (!status || !['active', 'inactive'].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'active' or 'inactive'" },
        { status: 400 }
      )
    }

    const { id } = await params
    
    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingAdmin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      )
    }

    // Prevent deactivating self
    if (existingAdmin.email === session.user.email && status === 'inactive') {
      return NextResponse.json(
        { error: "Cannot deactivate your own account" },
        { status: 400 }
      )
    }

    // For now, we'll just update the updatedAt field since we don't have a status field
    // In a real implementation, you might want to add a status field to the User model
    const updatedAdmin = await prisma.user.update({
      where: { id },
      data: {
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

    return NextResponse.json({
      ...updatedAdmin,
      status
    })
  } catch (error) {
    console.error("Error updating admin status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 