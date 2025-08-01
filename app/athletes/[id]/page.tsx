import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Trophy, Calendar, MapPin, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Define the PageProps type for Next.js 15
interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AthleteProfilePage({ params }: PageProps) {
  // Await the params since they're now async in Next.js 15
  const { id } = await params
  
  // In a real app, you would fetch athlete data based on the ID
  const athlete = {
    id: id,
    name: "Ahmad Fauzi",
    region: "Jakarta",
    age: 24,
    category: "Épée",
    bio: "Ahmad Fauzi is a professional fencer with over 8 years of experience. He specializes in Épée and has represented Jakarta in multiple national competitions. His technical precision and strategic approach have earned him numerous achievements throughout his career.",
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
    },
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
                <Image
                  src={`/placeholder.svg?height=400&width=300&text=${athlete.name}`}
                  alt={athlete.name}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
                      <span className="text-lg font-bold">{athlete.stats.wins}</span>
                      <span className="text-xs text-muted-foreground">Wins</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <span className="text-lg font-bold">{athlete.stats.tournaments}</span>
                      <span className="text-xs text-muted-foreground">Events</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <span className="text-lg font-bold">{athlete.stats.winRate}</span>
                      <span className="text-xs text-muted-foreground">Win Rate</span>
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
                  <TabsList className="mb-4 flex flex-wrap bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger 
                      value="bio"
                      className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
                    >
                      Biography
                    </TabsTrigger>
                    <TabsTrigger 
                      value="stats"
                      className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 text-gray-600 hover:text-gray-800 border-0"
                    >
                      Statistics
                    </TabsTrigger>
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
                              {achievement.medal === "Silver" && <Trophy className="h-5 w-5 text-accent" />}
                              {achievement.medal === "Bronze" && <Trophy className="h-5 w-5 text-amber-600" />}
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
                          <Trophy className="h-5 w-5 text-secondary mb-1" />
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
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}