"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  MapPin, Users, Trophy, Calendar, ChevronLeft, ChevronRight, Share2, Mail,
  Phone, Globe, Clock, Building
} from "lucide-react"

// Terima 'region' sebagai props dari Server Component
export function RegionDetailPageClient({ region }: { region: any }) {
  const [activeTab, setActiveTab] = useState("overview")

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard", {
      description: "You can now share this region page with others.",
    })
  }

  return (
    <PublicLayout>
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src={region.coverImage || "/placeholder.svg"}
            alt={`${region.name} Fencing Region`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container absolute bottom-0 z-20 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Link href="/regions" className="inline-flex items-center text-white/80 hover:text-white mb-2">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Regions
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{region.name}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{region.athletes} Athletes</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span>{region.clubsCount} Clubs</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/athletes">View Athletes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex flex-wrap bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="athletes"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
            >
              Top Athletes
            </TabsTrigger>
            <TabsTrigger 
              value="clubs"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
            >
              Clubs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About {region.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{region.description}</p>
                    <Separator className="my-6" />
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{region.contactInfo.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`mailto:${region.contactInfo.email}`} className="text-primary hover:underline">
                          {region.contactInfo.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${region.contactInfo.phone}`} className="hover:underline">
                          {region.contactInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`https://${region.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {region.contactInfo.website}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Region Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-md h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-2">Interactive map</p>
                        <p className="text-sm text-muted-foreground">Showing {region.name} fencing locations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Top Athletes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {region.topAthletes.slice(0, 3).map((athlete: any) => (
                        <div key={athlete.id} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={athlete.image || "/placeholder.svg"} alt={athlete.name} />
                            <AvatarFallback>
                              {athlete.name.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{athlete.name}</p>
                            <p className="text-sm text-muted-foreground">{athlete.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="w-full mt-2" onClick={() => setActiveTab("athletes")}>
                      View All Athletes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="athletes" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Athletes</CardTitle>
                <Button variant="outline">View All Athletes</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {region.topAthletes.map((athlete: any) => (
                    <Card key={athlete.id} className="overflow-hidden">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center mb-4">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={athlete.image || "/placeholder.svg"} alt={athlete.name} />
                            <AvatarFallback className="text-2xl">
                              {athlete.name.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="font-semibold text-lg">{athlete.name}</h4>
                          <p className="text-sm text-muted-foreground">{athlete.category}</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Achievements:</span>
                            <span className="text-sm font-medium">{athlete.achievements}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4" asChild>
                          <Link href={`/athletes/${athlete.id}`}>View Profile</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Fencing Clubs in {region.name}</CardTitle>
                <Button variant="outline">Add Club</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {region.clubs.map((club: any) => (
                    <Card key={club.id}>
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-lg mb-2">{club.name}</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{club.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{club.members} Members</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Established {club.established}</span>
                          </div>
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{club.achievements}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          View Club Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </PublicLayout>
  )
}