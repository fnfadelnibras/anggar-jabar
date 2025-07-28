import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: Ambil semua data athletes
export async function GET() {
  try {
    const athletes = await prisma.athlete.findMany({
      include: {
        region: true
      }
    })
    return NextResponse.json(athletes)
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
        regionId: body.regionId
      },
      include: {
        region: true
      }
    })
    return NextResponse.json(newAthlete, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 })
  }
}

// PUT: Update data athlete
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const updatedAthlete = await prisma.athlete.update({
      where: { id: body.id },
      data: {
        name: body.name,
        birthDate: new Date(body.birthDate),
        gender: body.gender,
        category: body.category,
        status: body.status,
        regionId: body.regionId
      },
      include: {
        region: true
      }
    })
    return NextResponse.json(updatedAthlete)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update athlete' }, { status: 500 })
  }
}

// DELETE: Hapus data athlete
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    await prisma.athlete.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete athlete' }, { status: 500 })
  }
} 