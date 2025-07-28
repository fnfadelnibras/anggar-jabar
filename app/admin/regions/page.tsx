import { prisma } from "@/lib/prisma"
import RegionsPage from "@/components/regions-client"

export default async function RegionsPageServer() {
  const regions = await prisma.region.findMany({
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

  return <RegionsPage regions={regions} />
}
