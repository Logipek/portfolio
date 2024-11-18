"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HexColorPicker } from "react-colorful"

export default function AppearancePage() {
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Personnalisation</h1>
          <Button>Sauvegarder les changements</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Couleur principale</h2>
              <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
              <div className="mt-4">
                <div 
                  className="w-full h-12 rounded-lg"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Prévisualisation</h2>
              <div className="space-y-4">
                <Button style={{ backgroundColor: primaryColor }}>
                  Bouton principal
                </Button>
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  Zone de mise en avant
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}