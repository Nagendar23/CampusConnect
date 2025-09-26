"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Calendar, DollarSign, Target } from "lucide-react"

// Mock data for analytics
const monthlyData = [
  { month: "Jan", events: 4, attendees: 320, revenue: 1200 },
  { month: "Feb", events: 6, attendees: 480, revenue: 1800 },
  { month: "Mar", events: 8, attendees: 640, revenue: 2400 },
  { month: "Apr", events: 5, attendees: 400, revenue: 1500 },
  { month: "May", events: 7, attendees: 560, revenue: 2100 },
  { month: "Jun", events: 9, attendees: 720, revenue: 2700 },
]

const categoryData = [
  { name: "Technology", value: 35, color: "#8884d8" },
  { name: "Academic", value: 25, color: "#82ca9d" },
  { name: "Career", value: 20, color: "#ffc658" },
  { name: "Entertainment", value: 15, color: "#ff7300" },
  { name: "Other", value: 5, color: "#00ff00" },
]

const topEvents = [
  { name: "Tech Innovation Summit", attendees: 156, capacity: 200, revenue: "$3,900" },
  { name: "Career Fair 2025", attendees: 89, capacity: 100, revenue: "$0" },
  { name: "Music Festival", attendees: 67, capacity: 500, revenue: "$1,005" },
  { name: "Web Development Workshop", attendees: 28, capacity: 30, revenue: "$280" },
]

export default function AnalyticsPage() {
  const totalEvents = 12
  const totalAttendees = 1247
  const totalRevenue = 3240
  const avgAttendance = 87

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your event performance and insights</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +2 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttendees.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Events and attendees over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{data.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span>{data.events} events</span>
                            <span className="text-muted-foreground">•</span>
                            <span>{data.attendees} attendees</span>
                          </div>
                          <Progress
                            value={(data.attendees / Math.max(...monthlyData.map((d) => d.attendees))) * 100}
                            className="mt-1 h-2"
                          />
                        </div>
                      </div>
                      <div className="text-sm font-medium">${data.revenue}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Event Categories</CardTitle>
                <CardDescription>Distribution of events by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={category.value} className="w-20 h-2" />
                        <span className="text-sm font-medium w-8">{category.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Events</CardTitle>
              <CardDescription>Your most successful events by attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{event.name}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>
                          {event.attendees}/{event.capacity} attendees
                        </span>
                        <span>{event.revenue} revenue</span>
                      </div>
                      <Progress value={(event.attendees / event.capacity) * 100} className="mt-2 h-2" />
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {Math.round((event.attendees / event.capacity) * 100)}% full
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue from paid events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1">
                        <Progress
                          value={(data.revenue / Math.max(...monthlyData.map((d) => d.revenue))) * 100}
                          className="h-4"
                        />
                      </div>
                    </div>
                    <div className="text-lg font-bold">${data.revenue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
