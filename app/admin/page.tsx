import DashboardClient, { DashboardStats } from "./dashboard-client"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboardPage() {
  // Fetch data directly via Prisma on the server with error handling
  let athletes: any[] = []
  let regions: any[] = []
  let admins: any[] = []
  
  try {
    [athletes, regions, admins] = await Promise.all([
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
      prisma.user.findMany({
        where: { role: 'admin' },
        orderBy: { createdAt: 'desc' },
      }),
    ])
  } catch (error) {
    console.error('Database connection error:', error)
    // Use empty arrays if database is not available
    athletes = []
    regions = []
    admins = []
  }

  // Calculate statistics
  const totalAthletes = athletes.length
  const totalRegions = regions.length
  const activeAthletes = athletes.filter((a: any) => a.status === "ACTIVE").length
  const inactiveAthletes = athletes.filter((a: any) => a.status === "INACTIVE").length
  const maleAthletes = athletes.filter((a: any) => a.gender === "Pria").length
  const femaleAthletes = athletes.filter((a: any) => a.gender === "Wanita").length

  // Recent athletes (last 5)
  const recentAthletes = athletes
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((athlete: any) => ({
      id: athlete.id,
      name: athlete.name,
      region: athlete.region?.name ?? "-",
      category: athlete.category,
      createdAt: athlete.createdAt.toISOString(),
    }))

  // Recent admins (last 5)
  const recentAdmins = admins
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((admin: any) => ({
      id: admin.id,
      name: admin.name || 'Unknown',
      email: admin.email || 'No email',
      lastLogin: admin.lastLogin?.toISOString() || null,
    }))

  // Recent activity from database
  let recentActivity: any[] = []

  try {
    recentActivity = await prisma.activity.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    // Use empty array if database is not available
    recentActivity = []
  }

  // Transform activity data for dashboard
  const transformedActivity = recentActivity.map((activity: any) => ({
    id: activity.id,
    type: activity.type,
    description: activity.description,
    timestamp: activity.createdAt.toISOString(),
  }))

  const stats: DashboardStats = {
    totalAthletes,
    totalRegions,
    activeAthletes,
    inactiveAthletes,
    maleAthletes,
    femaleAthletes,
    recentAthletes,
    recentAdmins,
    recentActivity: transformedActivity,
  }

  return <DashboardClient stats={stats} />
}