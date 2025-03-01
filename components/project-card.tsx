"use client"

import { motion } from 'framer-motion'
import { ArrowUpRight, Github, ArrowRight, Clock } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { toast } = useToast()

  const handleInProgressClick = () => {
    toast({
      title: "Projet en cours de développement",
      description: "Ce projet est actuellement en cours de développement. Revenez plus tard pour en savoir plus !",
      duration: 5000,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-md bg-secondary/50 backdrop-blur-sm border border-primary/5 overflow-hidden hover:bg-secondary/70 hover:border-primary/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={index <= 1}
        />
        {project.featured && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-white backdrop-blur-sm">
            A la une
          </span>
        )}
        {project.status === "in_progress" && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 backdrop-blur-sm flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            En développement
          </span>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4">
          {project.status === "completed" ? (
            <Link href={`/projects/${project.slug}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/10"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10"
              onClick={handleInProgressClick}
            >
              En développement
              <Clock className="ml-2 h-4 w-4" />
            </Button>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button
              variant="outline"
              size="icon"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Github className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
