import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, MapPin, Clock, DollarSign, Edit, Share2, QrCode } from "lucide-react"

// Mock data - in real app, this would come from your database based on the ID
const event = {
  id: 1,
  title: "Tech Innovation Summit",
  description:
    "Annual technology conference featuring industry leaders and cutting-edge innovations. Join us for a day of inspiring talks, networking opportunities, and hands-on workshops.",
  date: "2025-01-15",
  time: "09:00 AM - 05:00 PM",
  location: "Main Auditorium, Building A",
  capacity: 200,
  registered: 156,
  price: 25,
  status: "upcoming",
  category: "Technology",
  image: "/tech-conference.png",
  organizer: "John Organizer",
  createdAt: "2024-12-01",
  revenue: "$3,900",
}

const attendees = [
  { id: 1, name: "Alice Johnson", email: "alice@university.edu", registeredAt: "2024-12-15", checkedIn: false },
  { id: 2, name: "Bob Smith", email: "bob@university.edu", registeredAt: "2024-12-14", checkedIn: true },
  { id: 3, name: "Carol Davis", email: "carol@university.edu", registeredAt: "2024-12-13", checkedIn: false },
  { id: 4, name: "David Wilson", email: "david@university.edu", registeredAt: "2024-12-12", checkedIn: true },
  { id: 5, name: "Eva Brown", email: "eva@university.edu", registeredAt: "2024-12-11", checkedIn: false },
]

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const attendanceRate = Math.round((event.registered / event.capacity) * 100)
  const checkedInCount = attendees.filter((a) => a.checkedIn).length
  const checkInRate = Math.round((checkedInCount / attendees.length) * 100)

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground">Event details and management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/organizer/events/${event.id}/check-in`}>
                <QrCode className="mr-2 h-4 w-4" />
                Check-in
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/organizer/events/${event.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="aspect-video relative">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="default">{event.status}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.price === 0 ? "Free" : `$${event.price}`}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendees Tab */}
          <Tabs defaultValue="attendees" className="w-full">
            <TabsList>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="attendees">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Attendees</CardTitle>
                  <CardDescription>
                    {event.registered} of {event.capacity} spots filled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-muted-foreground">{attendee.email}</p>
                          <p className="text-xs text-muted-foreground">Registered: {attendee.registeredAt}</p>
                        </div>
                        <Badge variant={attendee.checkedIn ? "default" : "secondary"}>
                          {attendee.checkedIn ? "Checked In" : "Registered"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Event Analytics</CardTitle>
                  <CardDescription>Performance metrics for this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Registration Progress</span>
                        <span className="text-sm text-muted-foreground">{attendanceRate}%</span>
                      </div>
                      <Progress value={attendanceRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Check-in Rate</span>
                        <span className="text-sm text-muted-foreground">{checkInRate}%</span>
                      </div>
                      <Progress value={checkInRate} className="h-2" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{event.registered}</div>
                        <div className="text-sm text-muted-foreground">Total Registrations</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{event.revenue}</div>
                        <div className="text-sm text-muted-foreground">Revenue Generated</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">{event.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline">{event.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="text-sm font-medium">{event.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Registered</span>
                  <span className="text-sm font-medium">{event.registered}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className="text-sm font-medium">{event.capacity - event.registered}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="text-sm font-medium">{event.revenue}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href={`/organizer/events/${event.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/organizer/events/${event.id}/attendees`}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Attendees
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/organizer/events/${event.id}/check-in`}>
                    <QrCode className="mr-2 h-4 w-4" />
                    Check-in Portal
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
