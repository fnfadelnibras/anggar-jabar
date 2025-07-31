import { prisma } from "@/lib/prisma"
import { AdminAthletesClient } from "@/components/admin-athletes-client"

interface Athlete {
  id: string
  name: string
  birthDate: string
  gender: string
  category: string
  status: string
  region: {
    id: string
    name: string
    code: string
  }
  createdAt: string
  updatedAt: string
}

export default async function AdminAthletesPage() {
  const athletesData = await prisma.athlete.findMany({
    include: {
      region: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  // Transform the data to match the expected interface
  const athletes: Athlete[] = athletesData.map(athlete => ({
    id: athlete.id,
    name: athlete.name,
    birthDate: athlete.birthDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
    gender: athlete.gender,
    category: athlete.category,
    status: athlete.status,
    region: {
      id: athlete.region.id,
      name: athlete.region.name,
      code: athlete.region.code,
    },
    createdAt: athlete.createdAt.toISOString(),
    updatedAt: athlete.updatedAt.toISOString(),
  }))

  return <AdminAthletesClient athletes={athletes} />
}
