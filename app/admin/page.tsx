"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Map, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Activity,
  BarChart3,
  PieChart,
  Target,
  Award,
  Clock,
  Star
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalAthletes: number
  totalRegions: number
  activeAthletes: number
  inactiveAthletes: number
  maleAthletes: number
  femaleAthletes: number
  athletesByCategory: { category: string; count: number }[]
  athletesByRegion: { region: string; count: number }[]
  recentAthletes: { id: string; name: string; region: string; category: string; createdAt: string }[]
  topRegions: { name: string; count: number }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAthletes: 0,
    totalRegions: 0,
    activeAthletes: 0,
    inactiveAthletes: 0,
    maleAthletes: 0,
    femaleAthletes: 0,
    athletesByCategory: [],
    athletesByRegion: [],
    recentAthletes: [],
    topRegions: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [athletesResponse, regionsResponse] = await Promise.all([
        fetch('/api/athletes'),
        fetch('/api/regions')
      ])
      
      const athletes = await athletesResponse.json()
      const regions = await regionsResponse.json()

      // Calculate stats
      const totalAthletes = athletes.length
      const totalRegions = regions.length
      const activeAthletes = athletes.filter((a: any) => a.status === 'ACTIVE').length
      const inactiveAthletes = athletes.filter((a: any) => a.status === 'INACTIVE').length
      const maleAthletes = athletes.filter((a: any) => a.gender === 'Pria').length
      const femaleAthletes = athletes.filter((a: any) => a.gender === 'Wanita').length

      // Athletes by category
      const categoryCount = athletes.reduce((acc: any, athlete: any) => {
        acc[athlete.category] = (acc[athlete.category] || 0) + 1
        return acc
      }, {})
      const athletesByCategory = Object.entries(categoryCount).map(([category, count]) => ({
        category,
        count: count as number
      }))

      // Athletes by region
      const regionCount = athletes.reduce((acc: any, athlete: any) => {
        acc[athlete.region.name] = (acc[athlete.region.name] || 0) + 1
        return acc
      }, {})
      const athletesByRegion = Object.entries(regionCount).map(([region, count]) => ({
        region,
        count: count as number
      })).sort((a, b) => b.count - a.count)

      // Recent athletes (last 5)
      const recentAthletes = athletes
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map((athlete: any) => ({
          id: athlete.id,
          name: athlete.name,
          region: athlete.region.name,
          category: athlete.category,
          createdAt: new Date(athlete.createdAt).toLocaleDateString('id-ID')
        }))

      // Top regions
      const topRegions = regions
        .map((region: any) => ({
          name: region.name,
          count: region._count?.athletes || 0
        }))
        .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
        .slice(0, 5)

      setStats({
        totalAthletes,
        totalRegions,
        activeAthletes,
        inactiveAthletes,
        maleAthletes,
        femaleAthletes,
        athletesByCategory,
        athletesByRegion,
        recentAthletes,
        topRegions
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of athletes and regions management</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/athletes">
              <Users className="mr-2 h-4 w-4" />
              Manage Athletes
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/regions">
              <Map className="mr-2 h-4 w-4" />
              Manage Regions
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Athletes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAthletes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeAthletes} active, {stats.inactiveAthletes} inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.topRegions.filter(r => r.count > 0).length} active regions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.maleAthletes + stats.femaleAthletes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.maleAthletes} male, {stats.femaleAthletes} female
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalAthletes > 0 ? Math.round((stats.activeAthletes / stats.totalAthletes) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.activeAthletes} active athletes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Athletes by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              Athletes by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.athletesByCategory.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Regions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-4 w-4" />
              Top Regions by Athletes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topRegions.map((region, index) => (
                <div key={region.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm font-medium">{region.name}</span>
                  </div>
                  <Badge variant="secondary">{region.count} athletes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Recent Athletes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentAthletes.map((athlete) => (
                <div key={athlete.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{athlete.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {athlete.region} • {athlete.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{athlete.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/admin/athletes">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Athlete
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/regions">
                  <Map className="mr-2 h-4 w-4" />
                  Add New Region
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/athletes">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View All Athletes
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/regions">
                  <PieChart className="mr-2 h-4 w-4" />
                  View All Regions
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}