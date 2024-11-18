"use client"

import { signIn } from "next-auth/react"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm w-full p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Hugo. admin
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à l'espace administrateur
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => signIn("github", { callbackUrl: "/admin" })}
        >
          <Github className="mr-2 h-4 w-4" />
          Connexion avec GitHub
        </Button>
      </motion.div>
    </div>
  )
}