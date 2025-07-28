import { prisma } from "@/lib/prisma"
import AthletesPageClient from "@/components/athlete-client"

export default async function AthletesPage() {
  const athletes = await prisma.athlete.findMany({
    include: {
      region: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  return <AthletesPageClient athletes={athletes} />
}
