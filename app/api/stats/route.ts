import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Hitung jumlah atlet
    const athleteCount = await prisma.athlete.count()
    
    // Hitung jumlah region
    const regionCount = await prisma.region.count()
    
    // Untuk sementara, kompetisi dan medali masih 0
    const competitionCount = 0
    const medalCount = 0

    return NextResponse.json({
      athletes: athleteCount,
      regions: regionCount,
      competitions: competitionCount,
      medals: medalCount
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 