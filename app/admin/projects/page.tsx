"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash } from "lucide-react"

const mockProjects = [
  {
    id: 1,
    title: "Portfolio Next.js",
    description: "Portfolio personnel avec Next.js et TailwindCSS",
    technologies: ["Next.js", "React", "TailwindCSS"],
    featured: true
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Dashboard d'administration pour une plateforme e-commerce",
    technologies: ["React", "Node.js", "MongoDB"],
    featured: false
  }
]

export default function ProjectsPage() {
  const [projects] = useState(mockProjects)

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Gestion des projets</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </div>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}