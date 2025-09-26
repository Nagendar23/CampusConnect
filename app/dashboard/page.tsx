import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

// Mock data for student dashboard
const upcomingEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "2025-01-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    attendees: 156,
    capacity: 200,
    price: 25,
    status: "registered",
    category: "Technology",
  },
  {
    id: 2,
    title: "Music Festival",
    date: "2025-01-20",
    time: "06:00 PM",
    location: "Outdoor Stage",
    attendees: 67,
    capacity: 500,
    price: 15,
    status: "available",
    category: "Entertainment",
  },
  {
    id: 3,
    title: "Career Workshop",
    date: "2025-01-25",
    time: "02:00 PM",
    location: "Conference Room B",
    attendees: 45,
    capacity: 50,
    price: 0,
    status: "waitlist",
    category: "Career",
  },
]

const myEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "2025-01-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    status: "confirmed",
  },
]

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-bold">C</span>
            </div>
            <span className="text-xl font-bold">Campus Connect</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Discover and manage your campus events</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* My Events */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Registered Events</CardTitle>
                <CardDescription>Events you've signed up for</CardDescription>
              </CardHeader>
              <CardContent>
                {myEvents.length > 0 ? (
                  <div className="space-y-4">
                    {myEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <Badge variant="default">{event.status}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No events registered</h3>
                    <p className="text-muted-foreground">Browse events below to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Discover new events happening on campus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees}/{event.capacity}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-lg font-semibold">
                            {event.price === 0 ? "Free" : `$${event.price}`}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {event.status === "registered" ? (
                          <Badge variant="default">Registered</Badge>
                        ) : event.status === "waitlist" ? (
                          <Button size="sm" variant="outline">
                            Join Waitlist
                          </Button>
                        ) : (
                          <Button size="sm">Register</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Events Attended</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming Events</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hours Participated</span>
                    <span className="font-medium">48</span>
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
                  <Button className="w-full bg-transparent" variant="outline">
                    Browse All Events
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    My QR Code
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Event History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
