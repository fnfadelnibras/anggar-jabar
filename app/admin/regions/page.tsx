import { prisma } from "@/lib/prisma"
import { AdminRegionsClient } from "@/components/admin-regions-client"

interface Region {
  id: string
  name: string
  code: string
  description?: string
  image?: string
  _count?: {
    athletes: number
  }
}

export default async function AdminRegionsPage() {
  let regionsData: any[] = []
  
  try {
    regionsData = await prisma.region.findMany({
      include: {
        _count: {
          select: {
            athletes: true
          }
        }
      },
      orderBy: {
        name: "asc",
      },
    })
  } catch (error) {
    console.error('Database connection error:', error)
    // Use empty array if database is not available
    regionsData = []
  }

  // Transform the data to match the expected interface
  const regions: Region[] = regionsData.map(region => ({
    id: region.id,
    name: region.name,
    code: region.code,
    description: region.description || undefined,
    image: region.image || undefined,
    _count: region._count
  }))

  return <AdminRegionsClient regions={regions} />
}
