"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Building, Phone, MapPin, Calendar, Award } from "lucide-react"

// Mock user data
const mockUser = {
  id: 1,
  name: "John Organizer",
  email: "john.organizer@university.edu",
  organization: "Computer Science Department",
  phone: "+1 (555) 123-4567",
  location: "University Campus, Building A",
  bio: "Experienced event organizer with a passion for bringing the campus community together through innovative and engaging events.",
  joinedDate: "2023-09-15",
  avatar: null,
  stats: {
    totalEvents: 12,
    totalAttendees: 1247,
    avgRating: 4.8,
    successRate: 94,
  },
  badges: ["Top Organizer", "Community Builder", "Innovation Leader"],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    organization: mockUser.organization,
    phone: mockUser.phone,
    location: mockUser.location,
    bio: mockUser.bio,
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleCancel = () => {
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      organization: mockUser.organization,
      phone: mockUser.phone,
      location: mockUser.location,
      bio: mockUser.bio,
    })
    setIsEditing(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your organizer profile and information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={mockUser.avatar || ""} />
                <AvatarFallback className="text-2xl">
                  {mockUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{mockUser.name}</CardTitle>
              <CardDescription>{mockUser.organization}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {mockUser.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Joined {new Date(mockUser.joinedDate).toLocaleDateString()}
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Achievements</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockUser.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Events</span>
                  <span className="font-medium">{mockUser.stats.totalEvents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Attendees</span>
                  <span className="font-medium">{mockUser.stats.totalAttendees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <span className="font-medium">{mockUser.stats.avgRating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-medium">{mockUser.stats.successRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and professional details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {formData.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {formData.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    {isEditing ? (
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {formData.organization}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {formData.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {formData.location}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself and your experience organizing events..."
                    />
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">{formData.bio}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
