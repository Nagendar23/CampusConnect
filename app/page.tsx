import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, QrCode, CreditCard, MessageSquare, Award, Users } from "lucide-react"

export default function HomePage() {
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
            <Link href="/login" className="text-sm font-medium hover:underline">
              Log In
            </Link>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container py-24 text-center">
          <Badge variant="secondary" className="mb-4">
            College Event Management
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Campus Events <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Discover, register, and manage campus events with elegant simplicity.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/signup?role=student">Join as Student</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup?role=organizer">Become Organizer</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Essential Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need, nothing you don't</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Event Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse campus events with smart filtering and personalized recommendations
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <QrCode className="h-8 w-8 text-primary mb-2" />
                <CardTitle>QR Check-In</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Instant event check-in with QR codes. No queues, no hassle</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Integrated payment processing with instant confirmation</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Event Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Rate and review events to improve future experiences</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Digital ID</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Your student ID digitized with QR verification</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Organizer Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Complete event management with analytics and insights</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join the modern way to manage campus events</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup?role=organizer">Start Organizing</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">© 2025 Campus Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
