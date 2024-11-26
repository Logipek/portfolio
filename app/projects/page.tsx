"use client"

import { motion } from 'framer-motion'
import GithubRepos from '@/components/github-repos'
import ProjectCard from '@/components/project-card'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Mes Projets</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes projets les plus significatifs,
            mettant en avant mes compétences en développement.
          </p>
        </motion.div>

        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Projets Personnels</h2>
            <p className="text-muted-foreground">
              Une sélection de mes projets personnels les plus significatifs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Repositories GitHub</h2>
            <p className="text-muted-foreground">
              Mes projets open source et contributions sur GitHub.
            </p>
          </motion.div>

          <GithubRepos />
        </section>
      </div>
    </div>
  )
}