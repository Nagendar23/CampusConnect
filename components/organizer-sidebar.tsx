"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, BarChart3, Settings, Plus, User, LogOut, Home } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/organizer/dashboard", icon: Home },
  { name: "Events", href: "/organizer/events", icon: Calendar },
  { name: "Analytics", href: "/organizer/analytics", icon: BarChart3 },
  { name: "Profile", href: "/organizer/profile", icon: User },
  { name: "Settings", href: "/organizer/settings", icon: Settings },
]

export function OrganizerSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-bold">C</span>
          </div>
          <span className="text-lg font-bold">Campus Connect</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <Button asChild className="w-full">
            <Link href="/organizer/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Organizer</p>
            <p className="text-xs text-muted-foreground truncate">Event Organizer</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
