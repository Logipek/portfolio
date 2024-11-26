"use client"

import { Card } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { motion } from "framer-motion"
import { 
  Eye,
  MousePointerClick,
  ArrowUpRight,
  Settings,
  Github,
  Palette
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  {
    name: "Visites totales",
    value: "1,234",
    change: "+12.3%",
    icon: Eye,
  },
  {
    name: "Temps moyen",
    value: "2m 45s",
    change: "+8.1%",
    icon: MousePointerClick,
  },
  {
    name: "Taux de rebond",
    value: "42.3%",
    change: "-3.2%",
    icon: ArrowUpRight,
  },
]

const data = [
  { name: "Lun", value: 400 },
  { name: "Mar", value: 300 },
  { name: "Mer", value: 600 },
  { name: "Jeu", value: 800 },
  { name: "Ven", value: 500 },
  { name: "Sam", value: 700 },
  { name: "Dim", value: 900 },
]

const quickActions = [
  {
    name: "Gérer les projets",
    description: "Ajouter ou modifier des projets",
    icon: Github,
    href: "/admin/projects"
  },
  {
    name: "Personnalisation",
    description: "Modifier l'apparence du site",
    icon: Palette,
    href: "/admin/appearance"
  },
  {
    name: "Paramètres",
    description: "Configuration générale",
    icon: Settings,
    href: "/admin/settings"
  }
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Tableau de bord</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className={`text-sm ${
                    stat.change.startsWith("+") 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                  <action.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{action.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Visites sur 7 jours</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}