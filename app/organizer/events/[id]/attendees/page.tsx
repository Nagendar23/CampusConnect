"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MoreHorizontal, Mail, Download, UserCheck, UserX, Filter } from "lucide-react"

// Mock data - in real app, this would come from your database
const attendees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@university.edu",
    studentId: "STU001",
    registeredAt: "2024-12-15T10:30:00Z",
    checkedIn: true,
    checkedInAt: "2025-01-15T09:15:00Z",
    status: "confirmed",
    paymentStatus: "paid",
    ticketType: "regular",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@university.edu",
    studentId: "STU002",
    registeredAt: "2024-12-14T14:20:00Z",
    checkedIn: false,
    checkedInAt: null,
    status: "confirmed",
    paymentStatus: "paid",
    ticketType: "regular",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@university.edu",
    studentId: "STU003",
    registeredAt: "2024-12-13T16:45:00Z",
    checkedIn: false,
    checkedInAt: null,
    status: "pending",
    paymentStatus: "pending",
    ticketType: "regular",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@university.edu",
    studentId: "STU004",
    registeredAt: "2024-12-12T11:10:00Z",
    checkedIn: true,
    checkedInAt: "2025-01-15T09:30:00Z",
    status: "confirmed",
    paymentStatus: "paid",
    ticketType: "vip",
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@university.edu",
    studentId: "STU005",
    registeredAt: "2024-12-11T13:25:00Z",
    checkedIn: false,
    checkedInAt: null,
    status: "waitlist",
    paymentStatus: "pending",
    ticketType: "regular",
  },
]

const eventStats = {
  totalRegistered: 156,
  checkedIn: 89,
  confirmed: 134,
  pending: 12,
  waitlist: 10,
}

export default function AttendeesPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [checkedInFilter, setCheckedInFilter] = useState("all")
  const [selectedAttendee, setSelectedAttendee] = useState<(typeof attendees)[0] | null>(null)

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || attendee.status === statusFilter
    const matchesCheckedIn =
      checkedInFilter === "all" ||
      (checkedInFilter === "checked-in" && attendee.checkedIn) ||
      (checkedInFilter === "not-checked-in" && !attendee.checkedIn)

    return matchesSearch && matchesStatus && matchesCheckedIn
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "waitlist":
        return "outline"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCheckIn = (attendeeId: number) => {
    // In real app, this would call your API
    console.log(`Checking in attendee ${attendeeId}`)
  }

  const handleSendEmail = (attendeeId: number) => {
    // In real app, this would call your email API
    console.log(`Sending email to attendee ${attendeeId}`)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Event Attendees</h1>
        <p className="text-muted-foreground">Manage registrations and check-ins</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventStats.totalRegistered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checked In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{eventStats.checkedIn}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{eventStats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{eventStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Waitlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{eventStats.waitlist}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendee Management</CardTitle>
              <CardDescription>Search, filter, and manage your event attendees</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search attendees..."
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                </SelectContent>
              </Select>
              <Select value={checkedInFilter} onValueChange={setCheckedInFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Check-in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="not-checked-in">Not Checked In</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendees Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell className="font-medium">{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.studentId}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(attendee.status)}>{attendee.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {attendee.checkedIn ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-green-600">
                          Checked In
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {attendee.checkedInAt && formatDate(attendee.checkedInAt)}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline">Not Checked In</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(attendee.registeredAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Details</DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Attendee Details</DialogTitle>
                              <DialogDescription>Complete information for {attendee.name}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Name</Label>
                                <p>{attendee.name}</p>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Email</Label>
                                <p>{attendee.email}</p>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Student ID</Label>
                                <p>{attendee.studentId}</p>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Registration Status</Label>
                                <Badge variant={getStatusColor(attendee.status)}>{attendee.status}</Badge>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Payment Status</Label>
                                <Badge variant={attendee.paymentStatus === "paid" ? "default" : "secondary"}>
                                  {attendee.paymentStatus}
                                </Badge>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Ticket Type</Label>
                                <p className="capitalize">{attendee.ticketType}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {!attendee.checkedIn && (
                          <DropdownMenuItem onClick={() => handleCheckIn(attendee.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Check In
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleSendEmail(attendee.id)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <UserX className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredAttendees.length === 0 && (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No attendees found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
