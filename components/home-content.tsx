"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, FileDown } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import GithubRepos from "@/components/github-repos"
import InternshipAlert from "@/components/internship-alert"

export default function HomeContent() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const scale = useTransform(scrollY, [0, 200], [1, 0.95])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <div className="relative min-h-screen">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pt-40 pb-32 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-3xl text-center"
            style={{
              opacity,
              scale,
              willChange: "opacity, transform"
            }}
          >
            <motion.div variants={itemVariants}>
              <InternshipAlert className="mb-8" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="gradient-text text-5xl font-bold tracking-tight sm:text-7xl"
            >
              Hugo Damion
              <br />
              Developpeur FullStack
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Créons ensemble des expériences web innovantes et performantes
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/projects" className="z-10">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Découvrir mes projets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/cv.pdf" className="z-10">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                Télécharger mon CV
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.div>
      
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 relative"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Projets Récents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection de mes derniers projets
            </p>
          </motion.div>
          <GithubRepos />
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ContactSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </>
  )
}