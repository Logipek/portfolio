"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface InternshipAlertProps {
  className?: string
}

export default function InternshipAlert({ className }: InternshipAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/10 hover:bg-primary/15 transition-colors",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <Link href="/contact" className="text-primary hover:underline text-sm">
        Recherche actuellement une alternance
        <ArrowRight className="inline-block ml-1 h-3 w-3" />
      </Link>
    </motion.div>
  )
}