import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logAthleteCreated } from '@/lib/activity-logger'

// GET: Ambil semua data athletes
export async function GET() {
  try {
    const athletes = await prisma.athlete.findMany({
      include: {
        region: true
      }
    })
    
    // Transform the data to format dates properly
    const formattedAthletes = athletes.map(athlete => ({
      ...athlete,
      birthDate: athlete.birthDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
      createdAt: athlete.createdAt.toISOString(),
      updatedAt: athlete.updatedAt.toISOString(),
    }))
    
    return NextResponse.json(formattedAthletes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch athletes' }, { status: 500 })
  }
}

// POST: Tambah data athlete baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newAthlete = await prisma.athlete.create({
      data: {
        name: body.name,
        birthDate: new Date(body.birthDate),
        gender: body.gender,
        category: body.category,
        status: body.status,
        regionId: body.regionId,
        image: body.image
      },
      include: {
        region: true
      }
    })
    
    // Log activity
    await logAthleteCreated(newAthlete.name)
    
    // Format the response
    const formattedAthlete = {
      ...newAthlete,
      birthDate: newAthlete.birthDate.toISOString().split('T')[0],
      createdAt: newAthlete.createdAt.toISOString(),
      updatedAt: newAthlete.updatedAt.toISOString(),
    }
    
    return NextResponse.json(formattedAthlete, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 })
  }
} 