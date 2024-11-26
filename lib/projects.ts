export const projects = [
  {
    id: 1,
    slug: "portfolio-nextjs",
    title: "Portfolio Next.js",
    description: "Portfolio personnel développé avec Next.js, TailwindCSS et Framer Motion. Un site web moderne et responsive mettant en valeur mes compétences et projets.",
    image: "/projects/portfolio.png",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    demoUrl: "https://hugo-damion.me",
    githubUrl: "https://github.com/Logipek/personnal-portfolio",
    featured: true,
    objectives: [
      "Créer une vitrine professionnelle moderne et interactive",
      "Démontrer mes compétences en développement front-end",
      "Offrir une expérience utilisateur fluide et agréable",
      "Optimiser les performances et le référencement"
    ],
    challenges: [
      "Mise en place d'animations fluides et performantes",
      "Optimisation du chargement des images et des ressources",
      "Création d'un design responsive adapté à tous les écrans",
      "Intégration de l'API Spotify pour afficher la musique en cours"
    ],
    features: [
      "Design moderne avec thème sombre",
      "Animations fluides avec Framer Motion",
      "Intégration des repositories GitHub",
      "Formulaire de contact fonctionnel",
      "Affichage en temps réel de Spotify"
    ],
    implementation: `Le portfolio a été développé avec Next.js 13 en utilisant l'App Router pour une navigation optimale. Le style est géré avec TailwindCSS pour une maintenance facile et une cohérence visuelle. Les animations sont réalisées avec Framer Motion pour une expérience utilisateur fluide et moderne. L'intégration avec l'API GitHub permet d'afficher automatiquement mes derniers projets, tandis que l'API Spotify ajoute une touche personnelle en montrant ma musique en cours d'écoute.`
  },
  {
    id: 2,
    slug: "aroah-security-bot",
    title: "Aroah Security Bot",
    description: "Bot Discord optimisé pour la sécurité des serveurs, offrant des fonctionnalités anti-raid, anti-spam et bien plus.",
    image: "/projects/discord.webp",
    technologies: ["Eris", "Node.js", "JavaScript"],
    demoUrl: "https://github.com/Logipek/AroahSecurityBot",
    githubUrl: "https://github.com/Logipek/AroahSecurityBot",
    featured: true,
    objectives: [
      "Protéger les serveurs Discord contre les attaques",
      "Offrir des outils anti-raid et anti-spam performants",
      "Faciliter la gestion des serveurs avec des outils intuitifs",
      "Assurer une optimisation complète pour une utilisation fluide"
    ],
    challenges: [
      "Mise en œuvre d'un système anti-raid robuste",
      "Gestion efficace des limites d'API Discord",
      "Optimisation des performances avec la bibliothèque Eris",
      "Création d'un système de logs détaillé pour les administrateurs"
    ],
    features: [
      "Système anti-raid et anti-spam configurable",
      "Outils de gestion avancés pour administrateurs",
      "Logs détaillés pour surveiller les activités suspectes",
      "Détection automatique des comportements malveillants",
      "Personnalisation des paramètres de sécurité"
    ],
    implementation: `Le bot Aroah utilise la bibliothèque Eris pour une optimisation maximale des performances sur Discord. Les systèmes de sécurité, comme l'anti-raid et l'anti-spam, sont conçus pour détecter et bloquer automatiquement les comportements malveillants. Les logs détaillés permettent aux administrateurs de suivre les actions en temps réel. Le projet met l'accent sur l'efficacité et la simplicité d'utilisation pour les administrateurs de serveurs.`
  }

]