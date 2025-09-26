import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, TrendingUp, Clock, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from your database
const stats = [
  {
    title: "Total Events",
    value: "12",
    change: "+2 this month",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Total Attendees",
    value: "1,247",
    change: "+18% from last month",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Revenue",
    value: "$3,240",
    change: "+12% from last month",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Avg. Attendance",
    value: "87%",
    change: "+5% from last month",
    icon: Clock,
    color: "text-orange-600",
  },
]

const recentEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "2025-01-15",
    attendees: 156,
    capacity: 200,
    status: "upcoming",
    revenue: "$1,240",
  },
  {
    id: 2,
    title: "Career Fair 2025",
    date: "2025-01-10",
    attendees: 89,
    capacity: 100,
    status: "completed",
    revenue: "$0",
  },
  {
    id: 3,
    title: "Student Orientation",
    date: "2025-01-08",
    attendees: 234,
    capacity: 250,
    status: "completed",
    revenue: "$0",
  },
]

export default function OrganizerDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your events.</p>
          </div>
          <Button asChild>
            <Link href="/organizer/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Your latest event activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>
                        {event.attendees}/{event.capacity} attendees
                      </span>
                      {event.revenue !== "$0" && <span>{event.revenue} revenue</span>}
                    </div>
                    <Progress value={(event.attendees / event.capacity) * 100} className="mt-2 h-2" />
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/organizer/events/${event.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/organizer/events/${event.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button asChild className="justify-start h-auto p-4">
                <Link href="/organizer/events/create">
                  <div className="flex items-center gap-3">
                    <Plus className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Create New Event</div>
                      <div className="text-sm text-muted-foreground">Set up your next campus event</div>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" asChild className="justify-start h-auto p-4 bg-transparent">
                <Link href="/organizer/events">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Manage Events</div>
                      <div className="text-sm text-muted-foreground">View and edit your events</div>
                    </div>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" asChild className="justify-start h-auto p-4 bg-transparent">
                <Link href="/organizer/analytics">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">View Analytics</div>
                      <div className="text-sm text-muted-foreground">Track event performance</div>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
