"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Settings,
  Github,
  Mail,
  Palette,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projets", href: "/admin/projects", icon: FileText },
  { name: "GitHub", href: "/admin/github", icon: Github },
  { name: "Contact", href: "/admin/contact", icon: Mail },
  { name: "Apparence", href: "/admin/appearance", icon: Palette },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/admin" className="text-xl font-bold gradient-text">
          Hugo. admin
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                  animate
                />
              )}
            </Link>
          )
        })}
        <Button
          variant="ghost"
          className="justify-start gap-3 mt-auto text-red-500 hover:text-red-600 hover:bg-red-500/5"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </Button>
      </nav>
    </div>
  )
}