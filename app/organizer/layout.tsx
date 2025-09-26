import type React from "react"
import { OrganizerSidebar } from "@/components/organizer-sidebar"

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <OrganizerSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
