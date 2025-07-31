import { prisma } from "@/lib/prisma"
import { AdminAthletesClient } from "@/components/admin-athletes-client"

export default async function AdminAthletesPage() {
  const athletes = await prisma.athlete.findMany({
    include: {
      region: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  return <AdminAthletesClient athletes={athletes} />
}
