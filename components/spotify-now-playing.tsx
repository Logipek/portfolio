"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Music2, Loader2 } from 'lucide-react'

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  albumImageUrl?: string
  songUrl?: string
  timestamp?: number
  error?: string
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch('/api/spotify-now-playing', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      })
      
      if (!res.ok) throw new Error('Failed to fetch')
      
      const newData = await res.json()
      
      setData(prev => {
        if (!prev || 
            prev.title !== newData.title || 
            prev.isPlaying !== newData.isPlaying ||
            prev.timestamp !== newData.timestamp) {
          return newData
        }
        return prev
      })
      
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData({ isPlaying: false })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Chargement...</span>
      </div>
    )
  }

  if (error || !data?.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Music2 className="h-4 w-4" />
        <span>Aucune musique</span>
      </div>
    )
  }

  return (
    <motion.a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-md bg-secondary/50 backdrop-blur-sm px-3 py-1.5 hover:bg-secondary/70 transition-colors w-[250px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {data.albumImageUrl && (
        <div className="flex-shrink-0 w-8 h-8 rounded-md overflow-hidden">
          <motion.img
            src={data.albumImageUrl}
            alt={`${data.title} album art`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <motion.p
            className="text-sm font-medium whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: data.title && data.title.length > 20 ? '-50%' : 0 }}
            transition={{
              duration: data.title && data.title.length > 20 ? data.title.length * 0.15 : 0,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              repeatDelay: 1
            }}
          >
            {data.title}
          </motion.p>
        </div>
        <div className="relative w-full overflow-hidden">
          <motion.p
            className="text-xs text-muted-foreground whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: data.artist && data.artist.length > 25 ? '-50%' : 0 }}
            transition={{
              duration: data.artist && data.artist.length > 25 ? data.artist.length * 0.15 : 0,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              repeatDelay: 1
            }}
          >
            {data.artist}
          </motion.p>
        </div>
      </div>
      <div className="flex-shrink-0 flex space-x-1">
        <span className="w-1 h-3 bg-primary rounded-full animate-music-bar" />
        <span className="w-1 h-3 bg-primary rounded-full animate-music-bar [animation-delay:0.2s]" />
        <span className="w-1 h-3 bg-primary rounded-full animate-music-bar [animation-delay:0.4s]" />
      </div>
    </motion.a>
  )
}