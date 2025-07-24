import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Trophy, Medal, Calendar, MapPin, User } from "lucide-react"
import Link from "next/link"

export default function AthleteProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch athlete data based on the ID
  const athlete = {
    id: params.id,
    name: "Ahmad Fauzi",
    region: "Jakarta",
    age: 24,
    category: "Épée",
    bio: "Ahmad Fauzi is a professional fencer with over 8 years of experience. He specializes in Épée and has represented Jakarta in multiple national competitions. His technical precision and strategic approach have earned him numerous medals throughout his career.",
    achievements: [
      { event: "Jakarta Open 2023", medal: "Gold", category: "Épée Men's Individual" },
      { event: "National Championship 2022", medal: "Silver", category: "Épée Men's Individual" },
      { event: "Regional Tournament 2022", medal: "Gold", category: "Épée Men's Team" },
      { event: "Bali Invitational 2021", medal: "Bronze", category: "Épée Men's Individual" },
      { event: "Jakarta Open 2021", medal: "Gold", category: "Épée Men's Team" },
    ],
    stats: {
      wins: 45,
      losses: 12,
      winRate: "78.9%",
      tournaments: 18,
      medals: { gold: 3, silver: 1, bronze: 2 },
    },
    upcomingEvents: [
      { name: "Jakarta Open 2024", date: "May 15, 2024", location: "Jakarta Convention Center" },
      { name: "National Championship 2024", date: "July 8, 2024", location: "Surabaya Sports Arena" },
    ],
  }

  return (
    <PublicLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/athletes">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Athletes
            </Link>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Image and Basic Info */}
            <Card className="md:col-span-1">
              <div className="relative h-80 w-full">
                <img
                  src={`/placeholder.svg?height=400&width=300&text=${athlete.name}`}
                  alt={athlete.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold mb-1">{athlete.name}</h1>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{athlete.region}</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {athlete.category}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {athlete.age} years
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 w-full gap-2 mb-4">
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <span className="text-lg font-bold">{athlete.stats.medals.gold}</span>
                      <span className="text-xs text-muted-foreground">Gold</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <span className="text-lg font-bold">{athlete.stats.medals.silver}</span>
                      <span className="text-xs text-muted-foreground">Silver</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <span className="text-lg font-bold">{athlete.stats.medals.bronze}</span>
                      <span className="text-xs text-muted-foreground">Bronze</span>
                    </div>
                  </div>
                  <Button className="w-full">Follow Athlete</Button>
                </div>
              </CardContent>
            </Card>

            {/* Bio and Stats */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Athlete Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bio">
                  <TabsList className="mb-4">
                    <TabsTrigger value="bio">Biography</TabsTrigger>
                    <TabsTrigger value="stats">Statistics</TabsTrigger>
                    <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bio" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground">{athlete.bio}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                      <div className="space-y-3">
                        {athlete.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              {achievement.medal === "Gold" && <Trophy className="h-5 w-5 text-secondary" />}
                              {achievement.medal === "Silver" && <Medal className="h-5 w-5 text-accent" />}
                              {achievement.medal === "Bronze" && <Medal className="h-5 w-5 text-amber-600" />}
                            </div>
                            <div>
                              <p className="font-medium">{achievement.event}</p>
                              <p className="text-sm text-muted-foreground">
                                {achievement.medal} Medal - {achievement.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="stats">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <Trophy className="h-5 w-5 text-primary mb-1" />
                          <span className="text-2xl font-bold">{athlete.stats.wins}</span>
                          <span className="text-xs text-muted-foreground">Wins</span>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <User className="h-5 w-5 text-destructive mb-1" />
                          <span className="text-2xl font-bold">{athlete.stats.losses}</span>
                          <span className="text-xs text-muted-foreground">Losses</span>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <Medal className="h-5 w-5 text-secondary mb-1" />
                          <span className="text-2xl font-bold">{athlete.stats.winRate}</span>
                          <span className="text-xs text-muted-foreground">Win Rate</span>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <Calendar className="h-5 w-5 text-accent mb-1" />
                          <span className="text-2xl font-bold">{athlete.stats.tournaments}</span>
                          <span className="text-xs text-muted-foreground">Tournaments</span>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Performance History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-60 flex items-center justify-center">
                          <p className="text-muted-foreground">Performance chart will be displayed here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="events">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Upcoming Competitions</h3>
                      {athlete.upcomingEvents.map((event, i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{event.name}</h4>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <Button size="sm">View Event</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
