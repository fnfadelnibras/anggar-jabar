import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Testing login with:', { email, password })

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log('User found:', {
      id: user.id,
      name: user.name,
      email: user.email,
      hasPassword: !!user.password
    })

    if (!user.password) {
      return NextResponse.json({ error: "User has no password" }, { status: 400 })
    }

    // Test password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (isPasswordValid) {
      return NextResponse.json({ 
        success: true, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

  } catch (error) {
    console.error('Error testing login:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 