// #############################################
// ||                                         ||
// ||Fonctionnalité en cours de développement ||
// ||Sera disponible dans la prochaine version||
// ||                                         ||
// ||                                         ||
// #############################################

// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// type Language = 'fr' | 'en' | 'es' | 'de'

// interface I18nStore {
//   language: Language
//   translations: typeof defaultTranslations
//   setLanguage: (lang: Language) => Hugo
//   t: (key: string) => string
// }

// const defaultTranslations = {
//   fr: {
//     'nav.home': 'Accueil',
//     'nav.projects': 'Projets',
//     'nav.stack': 'Stack',
//     'nav.contact': 'Contact',
//     'hero.title': 'Shape the Future of Web',
//     'hero.subtitle': 'Développeur Full Stack',
//     'hero.description': 'Créons ensemble des expériences web innovantes et performantes',
//     'hero.cta.projects': 'Découvrir mes projets',
//     'hero.cta.contact': 'Me contacter',
//     'about.title': 'Pourquoi me choisir ?',
//     'about.description': 'Je m\'efforce constamment d\'améliorer mes compétences et services pour offrir les meilleures solutions à mes clients.',
//     'projects.title': 'Projets Récents',
//     'projects.description': 'Découvrez une sélection de mes derniers projets',
//     'projects.viewMore': 'Voir plus de projets',
//     'projects.viewAll': 'Voir tous les projets',
//     'contact.title': 'Contact',
//     'contact.description': 'Une idée de projet ? N\'hésitez pas à me contacter pour en discuter.',
//     'theme.light': 'Clair',
//     'theme.dark': 'Sombre',
//     'theme.system': 'Système',
//   },
//   en: {
//     'nav.home': 'Home',
//     'nav.projects': 'Projects',
//     'nav.stack': 'Stack',
//     'nav.contact': 'Contact',
//     'hero.title': 'Shape the Future of Web',
//     'hero.subtitle': 'Full Stack Developer',
//     'hero.description': 'Let\'s create innovative and performant web experiences together',
//     'hero.cta.projects': 'Discover my projects',
//     'hero.cta.contact': 'Contact me',
//     'about.title': 'Why choose me?',
//     'about.description': 'I constantly strive to improve my skills and services to offer the best solutions to my clients.',
//     'projects.title': 'Recent Projects',
//     'projects.description': 'Discover a selection of my latest projects',
//     'projects.viewMore': 'View more projects',
//     'projects.viewAll': 'View all projects',
//     'contact.title': 'Contact',
//     'contact.description': 'Have a project idea? Don\'t hesitate to contact me to discuss it.',
//     'theme.light': 'Light',
//     'theme.dark': 'Dark',
//     'theme.system': 'System',
//   },
//   es: {
//     'nav.home': 'Inicio',
//     'nav.projects': 'Proyectos',
//     'nav.stack': 'Stack',
//     'nav.contact': 'Contacto',
//     'hero.title': 'Forma el Futuro de la Web',
//     'hero.subtitle': 'Desarrollador Full Stack',
//     'hero.description': 'Creemos juntos experiencias web innovadoras y eficientes',
//     'hero.cta.projects': 'Descubre mis proyectos',
//     'hero.cta.contact': 'Contáctame',
//     'about.title': '¿Por qué elegirme?',
//     'about.description': 'Me esfuerzo constantemente por mejorar mis habilidades y servicios para ofrecer las mejores soluciones a mis clientes.',
//     'projects.title': 'Proyectos Recientes',
//     'projects.description': 'Descubre una selección de mis últimos proyectos',
//     'projects.viewMore': 'Ver más proyectos',
//     'projects.viewAll': 'Ver todos los proyectos',
//     'contact.title': 'Contacto',
//     'contact.description': '¿Tienes una idea de proyecto? No dudes en contactarme para discutirla.',
//     'theme.light': 'Claro',
//     'theme.dark': 'Oscuro',
//     'theme.system': 'Sistema',
//   },
//   de: {
//     'nav.home': 'Startseite',
//     'nav.projects': 'Projekte',
//     'nav.stack': 'Stack',
//     'nav.contact': 'Kontakt',
//     'hero.title': 'Gestalte die Zukunft des Webs',
//     'hero.subtitle': 'Full Stack Entwickler',
//     'hero.description': 'Lass uns gemeinsam innovative und leistungsstarke Web-Erlebnisse schaffen',
//     'hero.cta.projects': 'Entdecke meine Projekte',
//     'hero.cta.contact': 'Kontaktiere mich',
//     'about.title': 'Warum mich wählen?',
//     'about.description': 'Ich strebe ständig danach, meine Fähigkeiten und Dienstleistungen zu verbessern, um meinen Kunden die besten Lösungen zu bieten.',
//     'projects.title': 'Aktuelle Projekte',
//     'projects.description': 'Entdecke eine Auswahl meiner neuesten Projekte',
//     'projects.viewMore': 'Mehr Projekte anzeigen',
//     'projects.viewAll': 'Alle Projekte anzeigen',
//     'contact.title': 'Kontakt',
//     'contact.description': 'Hast du eine Projektidee? Zögere nicht, mich zu kontaktieren, um darüber zu sprechen.',
//     'theme.light': 'Hell',
//     'theme.dark': 'Dunkel',
//     'theme.system': 'System',
//   },
// }

// export const useI18nStore = create<I18nStore>()(
//   persist(
//     (set, get) => ({
//       language: 'fr',
//       translations: defaultTranslations,
//       setLanguage: (lang) => set({ language: lang }),
//       t: (key: string) => {
//         const state = get()
//         const translation = state.translations[state.language][key]
//         return translation || key
//       },
//     }),
//     {
//       name: 'i18n-storage',
//     }
//   )
// )
