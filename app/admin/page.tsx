import DashboardClient, { DashboardStats } from "./dashboard-client"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboardPage() {
  // Fetch data directly via Prisma on the server
  const [athletes, regions] = await Promise.all([
    prisma.athlete.findMany({
      include: { region: true },
    }),
    prisma.region.findMany({
      include: {
        _count: {
          select: { athletes: true },
        },
      },
    }),
  ])

  // Calculate statistics (mimic previous logic)
  const totalAthletes = athletes.length
  const totalRegions = regions.length
  const activeAthletes = athletes.filter((a) => a.status === "ACTIVE").length
  const inactiveAthletes = athletes.filter((a) => a.status === "INACTIVE").length
  const maleAthletes = athletes.filter((a) => a.gender === "Pria").length
  const femaleAthletes = athletes.filter((a) => a.gender === "Wanita").length

      // Athletes by category
  const categoryCount: Record<string, number> = {}
  for (const athlete of athletes) {
    categoryCount[athlete.category as string] = (categoryCount[athlete.category as string] || 0) + 1
  }
      const athletesByCategory = Object.entries(categoryCount).map(([category, count]) => ({
        category,
    count: count as number,
  }))

      // Athletes by region
  const regionCount: Record<string, number> = {}
  for (const athlete of athletes) {
    const regionName = athlete.region?.name ?? "Unknown"
    regionCount[regionName] = (regionCount[regionName] || 0) + 1
  }
  const athletesByRegion = Object.entries(regionCount)
    .map(([region, count]) => ({ region, count: count as number }))
    .sort((a, b) => b.count - a.count)

      // Recent athletes (last 5)
  const recentAthletes = athletes
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .slice(0, 5)
    .map((athlete) => ({
          id: athlete.id,
          name: athlete.name,
      region: athlete.region?.name ?? "-",
          category: athlete.category,
      createdAt: new Date(athlete.createdAt).toLocaleDateString("id-ID"),
    }))

  // Top regions by athlete count
  const topRegions = regions
    .map((region) => ({ name: region.name, count: region._count?.athletes || 0 }))
    .sort((a, b) => b.count - a.count)
        .slice(0, 5)

  // Region details for table
  const regionDetails = regions.map((region) => ({
        id: region.id,
        name: region.name,
        code: region.code,
    athleteCount: region._count?.athletes || 0,
      }))

  const stats: DashboardStats = {
        totalAthletes,
        totalRegions,
        activeAthletes,
        inactiveAthletes,
        maleAthletes,
        femaleAthletes,
        athletesByCategory,
        athletesByRegion,
        recentAthletes,
        topRegions,
    regionDetails,
  }

  return <DashboardClient stats={stats} />
}