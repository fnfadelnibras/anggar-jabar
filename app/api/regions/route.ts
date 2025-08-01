import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logRegionCreated, logRegionUpdated } from '@/lib/activity-logger'

// GET: Ambil semua data regions
export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      include: {
        _count: {
          select: {
            athletes: true
          }
        }
      }
    })
    return NextResponse.json(regions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 })
  }
}

// POST: Tambah data region baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newRegion = await prisma.region.create({
      data: {
        name: body.name,
        code: body.code,
        description: body.description,
        image: body.image
      },
      include: {
        _count: {
          select: {
            athletes: true
          }
        }
      }
    })
    
    // Log activity
    await logRegionCreated(newRegion.name)
    
    return NextResponse.json(newRegion, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create region' }, { status: 500 })
  }
}

// PUT: Update data region
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const updatedRegion = await prisma.region.update({
      where: { id: body.id },
      data: {
        name: body.name,
        code: body.code,
        description: body.description,
        image: body.image
      },
      include: {
        _count: {
          select: {
            athletes: true
          }
        }
      }
    })
    
    // Log activity
    await logRegionUpdated(updatedRegion.name)
    
    return NextResponse.json(updatedRegion)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update region' }, { status: 500 })
  }
}

// DELETE: Hapus data region
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    await prisma.region.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete region' }, { status: 500 })
  }
} 