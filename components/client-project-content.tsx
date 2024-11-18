"use client"

import { motion } from 'framer-motion'
import { ArrowLeft, Github, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl: string
  objectives: string[]
  challenges: string[]
  features: string[]
  implementation?: string
}

interface ClientProjectContentProps {
  project: Project
}

export default function ClientProjectContent({ project }: ClientProjectContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Link href="/projects">
        <Button variant="outline" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Button>
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold gradient-text">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-video relative rounded-md overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">À propos du projet</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Objectifs</h3>
            <ul className="space-y-2 text-muted-foreground">
              {project.objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Défis techniques</h3>
            <ul className="space-y-2 text-muted-foreground">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Fonctionnalités principales</h3>
            <ul className="space-y-2 text-muted-foreground">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {project.implementation && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Mise en œuvre</h3>
              <p className="text-muted-foreground">{project.implementation}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary text-white hover:bg-primary/90">
                <Globe className="mr-2 h-4 w-4" />
                Voir la démo
              </Button>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Voir sur GitHub
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}