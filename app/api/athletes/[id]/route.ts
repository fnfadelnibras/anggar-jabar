import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logAthleteUpdated, logAthleteDeleted } from '@/lib/activity-logger'

// PUT: Update data athlete
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const updatedAthlete = await prisma.athlete.update({
      where: { id: params.id },
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
    await logAthleteUpdated(updatedAthlete.name)
    
    // Format the response
    const formattedAthlete = {
      ...updatedAthlete,
      birthDate: updatedAthlete.birthDate.toISOString().split('T')[0],
      createdAt: updatedAthlete.createdAt.toISOString(),
      updatedAt: updatedAthlete.updatedAt.toISOString(),
    }
    
    return NextResponse.json(formattedAthlete)
  } catch (error) {
    console.error('Update athlete error:', error)
    return NextResponse.json({ error: 'Failed to update athlete' }, { status: 500 })
  }
}

// DELETE: Hapus data athlete
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get athlete name before deletion for logging
    const athlete = await prisma.athlete.findUnique({
      where: { id: params.id }
    })
    
    await prisma.athlete.delete({
      where: { id: params.id }
    })
    
    // Log activity
    if (athlete) {
      await logAthleteDeleted(athlete.name)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete athlete error:', error)
    return NextResponse.json({ error: 'Failed to delete athlete' }, { status: 500 })
  }
} 