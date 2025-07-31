import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get all athletes with region data
    const athletes = await prisma.athlete.findMany({
      include: {
        region: true
      }
    })
    
    // Get all regions with athlete count
    const regions = await prisma.region.findMany({
      include: {
        _count: {
          select: {
            athletes: true
          }
        }
      }
    })

    // Calculate stats for homepage
    const athletesCount = athletes.length
    const regionsCount = regions.length
    
    // For now, we'll use placeholder values for competitions and medals
    // In a real app, these would come from actual competition and medal tables
    const competitionsCount = 12 // Placeholder - would come from competitions table
    const medalsCount = 45 // Placeholder - would come from medals table

    return NextResponse.json({
      athletes: athletesCount,
      regions: regionsCount,
      competitions: competitionsCount,
      medals: medalsCount,
      // Also return the full data for admin dashboard
      athletesData: athletes,
      regionsData: regions
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 