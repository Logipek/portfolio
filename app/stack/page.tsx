"use client"

import { motion } from 'framer-motion'
import { Code2, Database, Server, Cloud, Laptop, Sparkles } from 'lucide-react'

const technologies = [
  {
    title: "Frontend",
    icon: Laptop,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 50 },
      { name: "TailwindCSS", level: 92 },
    ]
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "NestJS", level: 20 },
      { name: "Python", level: 50 },    ]
  },
  {
    title: "Base de données",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "Prisma", level: 82 },
    ]
  },
  {
    title: "DevOps",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const progressVariants = {
  hidden: { width: 0 },
  show: (level: number) => ({
    width: `${level}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.5
    }
  })
}

export default function StackPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Stack Technique</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un aperçu des technologies que je maîtrise pour créer des applications
            web modernes et performantes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {technologies.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm border border-primary/5 hover:bg-secondary/70 hover:border-primary/10 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <category.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold">{category.title}</h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="space-y-4"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="group"
                  >
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-primary"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        variants={progressVariants}
                        custom={skill.level}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-primary/10"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm">Toujours en veille technologique et en apprentissage continu</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}