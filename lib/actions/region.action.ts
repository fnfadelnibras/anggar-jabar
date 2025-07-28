import { prisma } from "@/lib/prisma"

export async function getAllRegions() {
  return await prisma.region.findMany({
    include: {
      _count: {
        select: { athletes: true }, // kalau relasi atletnya udah disetup
      },
    },
  })
}
