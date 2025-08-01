"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Map,
  Activity,
  BarChart3,
  Plus,
  Shield,
} from "lucide-react"
import Link from "next/link"

export interface DashboardStats {
  totalAthletes: number
  totalRegions: number
  activeAthletes: number
  inactiveAthletes: number
  maleAthletes: number
  femaleAthletes: number
  recentAthletes: { id: string; name: string; region: string; category: string; createdAt: string }[]
  recentAdmins: { id: string; name: string; email: string; lastLogin: string }[]
  recentActivity: { id: string; type: string; description: string; timestamp: string }[]
}



export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div>
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
               {stats.recentActivity.length} recent activities
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
            <p className="text-xs text-muted-foreground">{stats.activeAthletes} active athletes</p>
          </CardContent>
        </Card>
      </div>

             {/* Recent Activity */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         {/* Recent Athletes */}
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center justify-between">
               <div className="flex items-center">
                 <Users className="mr-2 h-4 w-4" />
                 Recently Added Athletes
               </div>
               <Button asChild size="sm">
                 <Link href="/admin/athletes">
                   <Plus className="mr-2 h-4 w-4" />
                   Add Athlete
                 </Link>
               </Button>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground">Showing {stats.recentAthletes.length} recent athletes</span>
                 <Badge variant="outline">Latest additions</Badge>
               </div>
               <div className="space-y-3">
                 {stats.recentAthletes.slice(0, 5).map((athlete) => (
                   <div key={athlete.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                     <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                         <span className="text-xs font-medium text-primary">
                           {athlete.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                         </span>
                       </div>
                       <div>
                         <p className="font-medium text-sm">{athlete.name}</p>
                         <p className="text-xs text-muted-foreground">{athlete.region} • {athlete.category}</p>
                       </div>
                     </div>
                     <div className="text-xs text-muted-foreground">
                       {new Date(athlete.createdAt).toLocaleDateString('id-ID')}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </CardContent>
         </Card>

                   {/* Recent Admins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Recently Added Admins
                </div>
                <Button asChild size="sm">
                  <Link href="/admin/admins">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
           <CardContent>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground">Showing {stats.recentAdmins.length} recent admins</span>
                 <Badge variant="outline">Latest additions</Badge>
               </div>
               <div className="space-y-3">
                 {stats.recentAdmins.slice(0, 5).map((admin) => (
                   <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                     <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                         <span className="text-xs font-medium text-primary">
                           {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                         </span>
                       </div>
                       <div>
                         <p className="font-medium text-sm">{admin.name}</p>
                         <p className="text-xs text-muted-foreground">{admin.email}</p>
                       </div>
                     </div>
                     <div className="text-xs text-muted-foreground">
                       {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString('id-ID') : 'Never'}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </CardContent>
         </Card>
       </div>

               {/* Recent Activity */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Showing {stats.recentActivity.length} recent activities</span>
                  <Badge variant="outline">Latest updates</Badge>
                </div>
                <div className="space-y-3">
                  {stats.recentActivity.slice(0, 8).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {activity.type.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
} 