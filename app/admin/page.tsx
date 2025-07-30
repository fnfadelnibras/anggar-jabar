"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Star,
  Eye,
  Plus
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
  regionDetails: { id: string; name: string; code: string; athleteCount: number }[]
}

// Simple Bar Chart Component
const BarChart = ({ data, title }: { data: { label: string; value: number }[]; title: string }) => {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple Pie Chart Component
const PieChartComponent = ({ data, title }: { data: { label: string; value: number; color: string }[]; title: string }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{item.value}</Badge>
              <span className="text-xs text-muted-foreground">
                {total > 0 ? Math.round((item.value / total) * 100) : 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
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
    topRegions: [],
    regionDetails: []
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

      // Region details (for new bar chart)
      const regionDetails = regions.map((region: any) => ({
        id: region.id,
        name: region.name,
        code: region.code,
        athleteCount: region._count?.athletes || 0
      }))

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
        topRegions,
        regionDetails
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
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-gray-400 mx-auto mb-4"></div>
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
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
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
                <PieChartComponent
                  data={stats.athletesByCategory.map((item, index) => ({
                    label: item.category,
                    value: item.count,
                    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]
                  }))}
                  title="Athletes by Category"
                />
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
                <BarChart
                  data={stats.topRegions.map(r => ({ label: r.name, value: r.count }))}
                  title="Top Regions"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="regions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Region Details Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    Region Details
                  </div>
                  <Button asChild size="sm">
                    <Link href="/admin/regions">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Region
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Showing {stats.regionDetails.length} regions
                    </span>
                    <Badge variant="outline">
                      Total: {stats.regionDetails.reduce((sum, r) => sum + r.athleteCount, 0)} athletes
                    </Badge>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Athlete Count</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.regionDetails.map((region) => (
                        <TableRow key={region.id}>
                          <TableCell className="font-medium">{region.name}</TableCell>
                          <TableCell>{region.code}</TableCell>
                          <TableCell>
                            <Badge variant={region.athleteCount > 0 ? "default" : "secondary"}>
                              {region.athleteCount} athletes
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/regions/${region.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart for Region Athlete Counts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Athlete Count by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={stats.regionDetails
                    .sort((a, b) => b.athleteCount - a.athleteCount)
                    .map(r => ({ label: r.name, value: r.athleteCount }))}
                  title="Athlete Count by Region"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

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