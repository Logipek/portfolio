// // #############################################
// // ||                                         ||
// // ||Fonctionnalité en cours de développement ||
// // ||Sera disponible dans la prochaine version||
// // ||                                         ||
// // ||                                         ||
// // #############################################

// "use client"

// import * as React from "react"
// import { Globe } from "lucide-react"
// import { useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useI18nStore } from "@/lib/i18n"

// const languages = [
//   { code: 'fr', name: 'Français', flag: '🇫🇷' },
//   { code: 'en', name: 'English', flag: '🇬🇧' },
//   { code: 'es', name: 'Español', flag: '🇪🇸' },
//   { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
// ] as const

// export function LanguageSwitcher() {
//   const { language, setLanguage } = useI18nStore()

//   useEffect(() => {
//     const detectLanguage = async () => {
//       try {
//         const response = await fetch('https://ipapi.co/json/')
//         const data = await response.json()
//         const countryCode = data.country_code.toLowerCase()
        
//         const languageMap: Record<string, typeof language> = {
//           'fr': 'fr',
//           'gb': 'en',
//           'us': 'en',
//           'es': 'es',
//           'de': 'de',
//         }
        
//         const detectedLanguage = languageMap[countryCode] || 'en'
//         if (detectedLanguage !== language) {
//           setLanguage(detectedLanguage)
//         }
//       } catch (error) {
//         console.error('Failed to detect language:', error)
//       }
//     }

//     if (!language) {
//       detectLanguage()
//     }
//   }, [language, setLanguage])

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="hover:bg-primary/10">
//           <Globe className="h-5 w-5" />
//           <span className="sr-only">Change language</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-40">
//         {languages.map((lang) => (
//           <DropdownMenuItem
//             key={lang.code}
//             onClick={() => setLanguage(lang.code)}
//             className="gap-2"
//           >
//             <span>{lang.flag}</span>
//             <span>{lang.name}</span>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }