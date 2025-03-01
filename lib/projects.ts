// Définition du type Project
export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
  status: "completed" | "in_progress";
  objectives: string[];
  challenges: string[];
  features: string[];
  implementation: string;
}

export const projects: Project[] = [
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
    status: "completed",
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
    githubUrl: "https://github.com/Logipek/Aroah_Security_Bot_Discord",
    featured: true,
    status: "completed",
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
  },
  {
    id: 3,
    slug: "inventory-backend",
    title: "Inventaire de magasin",
    description: "Application web de gestion d'inventaire conçue pour les petits commerçants, permettant de gérer efficacement les stocks, les produits et les utilisateurs..",
    image: "/projects/inventaire-be.png",
    technologies: ["Php", "SQL", "POO", "Docker", "Composer"],
    githubUrl: "https://github.com/Logipek/shop-backend",
    featured: true,
    status: "completed",
    objectives: [
      "Développer une solution de gestion d'inventaire complète et intuitive",
      "Implémenter un système d'authentification robuste et sécurisé",
      "Créer une API RESTful bien structurée et documentée",
      "Assurer une gestion efficace des stocks et des commandes"
    ],
    challenges: [
      "Conception d'une architecture MVC évolutive et maintenable",
      "Implémentation d'un système JWT avec refresh tokens",
      "Gestion des relations complexes entre produits et stocks",
      "Sécurisation des données et protection contre les vulnérabilités"
    ],
    features: [
      "Authentification JWT avec système de refresh tokens",
      "Gestion multi-rôles des utilisateurs",
      "CRUD complet pour la gestion des produits",
      "Système d'alertes de stocks bas",
      "Génération automatique de factures"
    ],
    implementation: `Le système a été développé avec PHP 8 en suivant une architecture MVC robuste. L'authentification utilise JWT pour une sécurité optimale, avec un système de refresh tokens pour une meilleure expérience utilisateur. La base de données MySQL est structurée pour garantir performance et scalabilité. Le projet utilise Composer pour la gestion des dépendances et intègre des variables d'environnement pour une configuration flexible. La sécurité est renforcée par le hashage BCrypt des mots de passe et une validation rigoureuse des données.`
  },
  {
    id: 4,
    slug: "todo-mvc",
    title: "Todo List MVC",
    description: "Une application moderne et intuitive de gestion de tâches construite avec JavaScript vanilla, suivant le pattern MVC et utilisant Webpack pour une expérience utilisateur optimale.",
    image: "/projects/todo-mvc.png",
    technologies: ["JavaScript", "Webpack", "TailwindCSS", "MVC", "LocalStorage"],
    githubUrl: "https://github.com/Logipek/TodoList-NodeJs",
    demoUrl: "https://todolist.hugo-damion.me/",
    featured: true,
    status: "completed",
    objectives: [
      "Créer une application de gestion de tâches moderne et intuitive",
      "Implémenter le pattern MVC avec JavaScript vanilla",
      "Offrir une expérience utilisateur riche avec plusieurs vues",
      "Démontrer les bonnes pratiques de développement front-end"
    ],
    challenges: [
      "Mise en place d'une architecture MVC maintenable",
      "Implémentation du drag & drop dans la vue Kanban",
      "Gestion du state local avec localStorage",
      "Création d'une interface responsive inspirée de shadcn/ui"
    ],
    features: [
      "Interface moderne avec thème clair/sombre",
      "Vues multiples (liste, Kanban avec drag & drop, calendrier)",
      "Filtrage avancé et recherche en temps réel",
      "Catégories personnalisables",
      "Persistance des données via localStorage"
    ],
    implementation: `L'application a été développée en JavaScript vanilla en suivant strictement le pattern MVC. Webpack est utilisé pour le bundling et l'optimisation des ressources. L'interface utilisateur est construite avec TailwindCSS et inspirée de shadcn/ui pour un design moderne et cohérent. La gestion des données est assurée par localStorage avec une structure optimisée. Le projet intègre FullCalendar pour la vue calendrier et implémente un système de drag & drop personnalisé pour la vue Kanban.`
  },
  {
    id: 5,
    slug: "pathfinding",
    title: "Algorithme de Pathfinding",
    description: "Implémentation en C d'un algorithme de recherche du plus court chemin dans un graphe. Projet développé dans le cadre de la formation Coda pour démontrer la maîtrise des algorithmes de pathfinding.",
    image: "/projects/pathfinding.png",
    technologies: ["C", "Makefile", "Algorithmes", "BFS", "Dijkstra"],
    githubUrl: "https://github.com/mtkuwav/Javamon",
    featured: true,
    status: "completed",
    objectives: [
      "Implémenter un algorithme de pathfinding efficace",
      "Créer un système de lecture et analyse de fichiers de graphe",
      "Gérer les différents cas d'erreur et exceptions",
      "Démontrer la maîtrise des structures de données en C"
    ],
    challenges: [
      "Mise en place d'une structure de graphe optimisée en mémoire",
      "Implémentation efficace des algorithmes BFS et Dijkstra",
      "Gestion robuste des fichiers d'entrée et des erreurs",
      "Optimisation des performances pour les grands graphes"
    ],
    features: [
      "Lecture et analyse de fichiers de graphe",
      "Calcul du plus court chemin entre deux nœuds",
      "Affichage détaillé des informations du graphe",
      "Gestion des erreurs et cas limites",
      "Interface en ligne de commande intuitive"
    ],
    implementation: `Le projet a été développé en C en mettant l'accent sur la gestion efficace de la mémoire et les performances. La structure de données du graphe a été optimisée pour permettre un accès rapide aux nœuds et aux liens. Les algorithmes de pathfinding (BFS, Dijkstra) ont été implémentés de manière modulaire pour faciliter l'ajout de nouveaux algorithmes. Le projet utilise un Makefile pour automatiser la compilation et inclut une gestion robuste des erreurs.`
  },
  {
    id: 6,
    slug: "Pokemon Java",
    title: "Pokemon Java",
    description: "Création d'un jeu de type RPG en Java avec JavaFX pour la partie graphique et un système de combat basique réalisé en Java.",
    image: "/projects/pokemon.jpg",
    technologies: ["Java", "JavaFX", "Algorithmes"],
    githubUrl: "https://github.com/Logipek/PokemonJava",
    featured: false,
    status: "in_progress",
    objectives: [
      "Créer un système de lecture et analyse de fichiers de graphe",
      "Gérer les différents cas d'erreur et exceptions",
      "Démontrer la maîtrise des structures de données en C"
    ],
    challenges: [
      "Mise en place d'une structure de graphe optimisée en mémoire",
      "Implémentation efficace des algorithmes BFS et Dijkstra",
      "Gestion robuste des fichiers d'entrée et des erreurs",
      "Optimisation des performances pour les grands graphes"
    ],
    features: [
      "Lecture et analyse de fichiers de graphe",
      "Calcul du plus court chemin entre deux nœuds",
      "Affichage détaillé des informations du graphe",
      "Gestion des erreurs et cas limites",
      "Interface en ligne de commande intuitive"
    ],
    implementation: `Le projet a été développé en C en mettant l'accent sur la gestion efficace de la mémoire et les performances. La structure de données du graphe a été optimisée pour permettre un accès rapide aux nœuds et aux liens. Les algorithmes de pathfinding (BFS, Dijkstra) ont été implémentés de manière modulaire pour faciliter l'ajout de nouveaux algorithmes. Le projet utilise un Makefile pour automatiser la compilation et inclut une gestion robuste des erreurs.`
  }
]
