"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ArrowUpRight } from 'lucide-react'

interface Repository {
  id: number
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  html_url: string
  language: string
  topics: string[]
}

export default function GithubRepos() {
  const username = 'Logipek' // Nom d'utilisateur GitHub
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        if (!response.ok) throw new Error('Échec de la récupération des dépôts')
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('Échec de la récupération des dépôts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-md bg-secondary/50 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group flex flex-col justify-between p-6 rounded-md bg-secondary/50 backdrop-blur-sm border border-primary/5 hover:bg-secondary/70 hover:border-primary/10 transition-all duration-300"
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {repo.name}
              </h3>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {repo.description || "Aucune description"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {repo.language && (
                <span className="flex items-center text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/80 mr-1.5" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-1" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center text-sm">
                <GitFork className="h-4 w-4 mr-1" />
                {repo.forks_count}
              </span>
            </div>

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}