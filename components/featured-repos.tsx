"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, GitFork, ArrowUpRight, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

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

export default function FeaturedRepos() {
  const username = 'Logipek'
  const [repos, setRepos] = useState<Repository[]>([])
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const initialDisplayCount = 3

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        if (!response.ok) throw new Error('Échec de la récupération des dépôts')
        const data = await response.json()
        setRepos(data)
        setDisplayedRepos(data.slice(0, initialDisplayCount))
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-lg bg-black/20 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <AnimatePresence mode="popLayout">
          {displayedRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-lg bg-secondary/10 backdrop-blur-sm border border-primary/5 hover:bg-secondary/20 hover:border-primary/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {repo.description || "Aucune description"}
                  </p>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center gap-4 mb-4">
                {repo.language && (
                  <span className="flex items-center text-sm text-foreground/80">
                    <span className="w-3 h-3 rounded-full bg-primary/80 mr-2" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center text-sm text-foreground/80">
                  <Star className="h-4 w-4 mr-1" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center text-sm text-foreground/80">
                  <GitFork className="h-4 w-4 mr-1" />
                  {repo.forks_count}
                </span>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary/90"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="text-center">
        <Link href="/projects">
          <Button 
            variant="outline" 
            className="border-primary/20 hover:bg-primary/10"
          >
            Voir tous les projets
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </>
  )
}