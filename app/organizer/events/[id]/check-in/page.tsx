"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QrCode, Search, UserCheck, AlertCircle, CheckCircle, Camera } from "lucide-react"

// Mock data for demonstration
const mockAttendees = [
  { id: 1, name: "Alice Johnson", email: "alice@university.edu", studentId: "STU001", checkedIn: false },
  { id: 2, name: "Bob Smith", email: "bob@university.edu", studentId: "STU002", checkedIn: true },
  { id: 3, name: "Carol Davis", email: "carol@university.edu", studentId: "STU003", checkedIn: false },
]

export default function CheckInPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [scanResult, setScanResult] = useState("")
  const [checkInStatus, setCheckInStatus] = useState<"idle" | "success" | "error" | "not-found">("idle")
  const [lastCheckedIn, setLastCheckedIn] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalRegistered: 156,
    checkedIn: 89,
    checkInRate: 57,
  })

  // Simulate QR code scanning
  const handleQRScan = (qrData: string) => {
    setScanResult(qrData)

    // Mock QR code processing
    const attendee = mockAttendees.find((a) => a.studentId === qrData || a.email === qrData)

    if (!attendee) {
      setCheckInStatus("not-found")
      return
    }

    if (attendee.checkedIn) {
      setCheckInStatus("error")
      return
    }

    // Simulate successful check-in
    attendee.checkedIn = true
    setLastCheckedIn(attendee.name)
    setCheckInStatus("success")
    setStats((prev) => ({
      ...prev,
      checkedIn: prev.checkedIn + 1,
      checkInRate: Math.round(((prev.checkedIn + 1) / prev.totalRegistered) * 100),
    }))

    // Reset status after 3 seconds
    setTimeout(() => {
      setCheckInStatus("idle")
      setScanResult("")
    }, 3000)
  }

  // Manual search and check-in
  const handleManualCheckIn = () => {
    if (!searchTerm) return

    const attendee = mockAttendees.find(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (attendee && !attendee.checkedIn) {
      handleQRScan(attendee.studentId)
      setSearchTerm("")
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Event Check-in</h1>
        <p className="text-muted-foreground">Scan QR codes or manually check in attendees</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checked In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.checkedIn}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-in Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.checkInRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* QR Scanner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <CardDescription>Scan attendee QR codes for instant check-in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock QR Scanner Interface */}
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">Position QR code within the frame</p>
                  <Button variant="outline" size="sm">
                    Enable Camera
                  </Button>
                </div>
              </div>

              {/* Mock QR Input for Testing */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Test QR Code Input</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter QR code data (e.g., STU001)"
                    value={scanResult}
                    onChange={(e) => setScanResult(e.target.value)}
                  />
                  <Button onClick={() => handleQRScan(scanResult)}>Scan</Button>
                </div>
              </div>

              {/* Status Messages */}
              {checkInStatus === "success" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Successfully checked in {lastCheckedIn}!
                  </AlertDescription>
                </Alert>
              )}

              {checkInStatus === "error" && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">This attendee is already checked in.</AlertDescription>
                </Alert>
              )}

              {checkInStatus === "not-found" && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    Attendee not found. Please verify the QR code.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Manual Check-in */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Manual Check-in
            </CardTitle>
            <CardDescription>Search and check in attendees manually</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Attendee</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Name, email, or student ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleManualCheckIn()}
                  />
                  <Button onClick={handleManualCheckIn}>
                    <UserCheck className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Recent Check-ins */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Check-ins</h4>
                <div className="space-y-2">
                  {mockAttendees
                    .filter((a) => a.checkedIn)
                    .slice(0, 5)
                    .map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <p className="text-sm font-medium">{attendee.name}</p>
                          <p className="text-xs text-muted-foreground">{attendee.email}</p>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          Checked In
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Export Check-in List
            </Button>
            <Button variant="outline" size="sm">
              Send Reminder Emails
            </Button>
            <Button variant="outline" size="sm">
              View All Attendees
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
