"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Users, MapPin, Plus, Search, MoreHorizontal, Edit, Eye, Trash2, Copy } from "lucide-react"

// Mock data - in real app, this would come from your database
const events = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    description: "Annual technology conference featuring industry leaders",
    date: "2025-01-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    capacity: 200,
    registered: 156,
    price: 25,
    status: "upcoming",
    category: "Technology",
    image: "/tech-conference.png",
  },
  {
    id: 2,
    title: "Career Fair 2025",
    description: "Connect with top employers and explore career opportunities",
    date: "2025-01-10",
    time: "10:00 AM",
    location: "Student Center",
    capacity: 100,
    registered: 89,
    price: 0,
    status: "completed",
    category: "Career",
    image: "/career-fair.jpg",
  },
  {
    id: 3,
    title: "Student Orientation",
    description: "Welcome new students to campus life",
    date: "2025-01-08",
    time: "02:00 PM",
    location: "Campus Quad",
    capacity: 250,
    registered: 234,
    price: 0,
    status: "completed",
    category: "Academic",
    image: "/student-orientation.jpg",
  },
  {
    id: 4,
    title: "Music Festival",
    description: "Annual campus music festival with local bands",
    date: "2025-01-20",
    time: "06:00 PM",
    location: "Outdoor Stage",
    capacity: 500,
    registered: 67,
    price: 15,
    status: "upcoming",
    category: "Entertainment",
    image: "/vibrant-music-festival.png",
  },
  {
    id: 5,
    title: "Workshop: Web Development",
    description: "Learn modern web development techniques",
    date: "2025-01-12",
    time: "03:00 PM",
    location: "Computer Lab",
    capacity: 30,
    registered: 28,
    price: 10,
    status: "draft",
    category: "Education",
    image: "/web-development-workshop.png",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "completed":
        return "secondary"
      case "draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getAttendanceRate = (registered: number, capacity: number) => {
    return Math.round((registered / capacity) * 100)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground">Manage your campus events</p>
          </div>
          <Button asChild>
            <Link href="/organizer/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <Badge variant={getStatusColor(event.status)}>{event.status}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/organizer/events/${event.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/organizer/events/${event.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Event
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">{event.description}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {event.registered}/{event.capacity} registered ({getAttendanceRate(event.registered, event.capacity)}
                  %)
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-semibold">{event.price === 0 ? "Free" : `$${event.price}`}</span>
                  <Badge variant="outline">{event.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first event"}
          </p>
          <Button asChild>
            <Link href="/organizer/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
