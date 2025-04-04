"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Settings, Users, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { People, QuestionAnswer } from "@mui/icons-material"

const navigation = [
  { name: "Dashboard", href: "/8d5d8510418b2b901630fbe65bacbd1a/dashboard", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/8d5d8510418b2b901630fbe65bacbd1a/dashboard/blogs", icon: FileText },
  { name: "Team Members", href: "/8d5d8510418b2b901630fbe65bacbd1a/dashboard/team", icon: Users },
  { name: "Website Content", href: "/8d5d8510418b2b901630fbe65bacbd1a/dashboard/content", icon: Settings },
  { name: "Contact Forms", href: "/8d5d8510418b2b901630fbe65bacbd1a/dashboard/contactForms", icon: Mail },
  { name: "Ask an Actuary Queries", href: "/8d5d8510418b2b901630fbe65bacbd1a/dashboard/queries", icon: QuestionAnswer },
  { name: "Enrollments", href : "/8d5d8510418b2b901630fbe65bacbd1a/dashboard/enrollments", icon: People}
]

export function Sidebar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#00415f] transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-center border-b border-white/10">
          <h1 className="text-xl font-bold text-white">Get2Act Admin</h1>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

