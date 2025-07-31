import { prisma } from "@/lib/prisma"
import { AdminRegionsClient } from "@/components/admin-regions-client"

export default async function AdminRegionsPage() {
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

  return <AdminRegionsClient regions={regions} />
}
