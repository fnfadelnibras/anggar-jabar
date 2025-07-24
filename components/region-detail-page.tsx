"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  Phone, Globe, Medal, Clock, Building
} from "lucide-react"

// Terima 'region' sebagai props dari Server Component
export function RegionDetailPageClient({ region }: { region: any }) {
  const router = useRouter()
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
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span>{region.medals.gold + region.medals.silver + region.medals.bronze} Total Medals</span>
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
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Athletes</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="athletes">Top Athletes</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
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
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Medal Achievements</h3>
                      <div className="flex gap-4">
                        <div className="flex-1 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-yellow-600">{region.medals.gold}</div>
                          <div className="text-sm text-muted-foreground">Gold</div>
                        </div>
                        <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-gray-500">{region.medals.silver}</div>
                          <div className="text-sm text-muted-foreground">Silver</div>
                        </div>
                        <div className="flex-1 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-amber-700">{region.medals.bronze}</div>
                          <div className="text-sm text-muted-foreground">Bronze</div>
                        </div>
                      </div>
                    </div>
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
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {region.upcomingEvents.map((event: any) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="relative h-40">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary">Upcoming</Badge>
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Button variant="link" className="p-0 mt-2" asChild>
                            <Link href={`/events/${event.id}`}>
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
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
                          <div className="flex items-center">
                            <Medal className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">
                              {athlete.medals.gold + athlete.medals.silver + athlete.medals.bronze}
                            </span>
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

          <TabsContent value="events" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {region.upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {region.upcomingEvents.map((event: any) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="relative h-40">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-primary">Upcoming</Badge>
                            </div>
                          </div>
                          <CardContent className="pt-4">
                            <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <Button variant="link" className="p-0 mt-2" asChild>
                              <Link href={`/events/${event.id}`}>
                                View Details
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming events scheduled for this region.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Past Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {region.pastEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {region.pastEvents.map((event: any) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="relative h-40">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                          </div>
                          <CardContent className="pt-4">
                            <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.results}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <Button variant="link" className="p-0" asChild>
                                <Link href={`/events/${event.id}`}>Event Details</Link>
                              </Button>
                              <Button variant="link" className="p-0" asChild>
                                <Link href={`/results?event=${event.id}`}>View Results</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No past events found for this region.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
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
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-1">
                                <span className="text-xs font-medium text-yellow-800">{athlete.medals.gold}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Gold</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-1">
                                <span className="text-xs font-medium text-gray-800">{athlete.medals.silver}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Silver</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-1">
                                <span className="text-xs font-medium text-amber-800">{athlete.medals.bronze}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Bronze</span>
                            </div>
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