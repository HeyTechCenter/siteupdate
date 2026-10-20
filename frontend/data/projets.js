// Projets affichés dans la section « Nos projets »
// TODO : liste finale à fournir (titre, description, catégorie, stack, lien).
// Les projets ci-dessous reprennent le contenu existant du site.
// lien: null → le bouton « Voir le projet » n'est pas affiché.
// publie: false → masqué en production.

export const categories = [
  { id: 'tous',     label: 'Tous' },
  { id: 'capstone', label: 'Projets Capstone' },
  { id: 'interne',  label: 'Projets Internes' },
  { id: 'client',   label: 'Projets Clients' },
];

export const projets = [
  {
    id: 1,
    titre: "Haské Énergie",
    description: "Système de monitoring IoT pour mini-réseaux solaires avec prédiction ML et dashboard temps réel.",
    stack: ["React", "Flask", "Firebase", "ESP32"],
    categorie: "capstone",
    image: "⚡",
    lien: null,
  },
  {
    id: 2,
    titre: "NIGERBIZ 360",
    description: "Application mobile de gestion commerciale pour petits marchands au Niger — inventaire, ventes, finances.",
    stack: ["React Native", "Expo", "Firebase"],
    categorie: "interne",
    image: "📦",
    lien: null,
  },
  {
    id: 3,
    titre: "Système de gestion ANSI",
    description: "Plateforme de gestion des entrées/sorties des stagiaires, visiteurs et employés avec authentification JWT.",
    stack: ["Node.js", "Express", "MySQL", "JavaScript"],
    categorie: "client",
    image: "🏢",
    lien: null,
  },
  {
    id: 4,
    titre: "LingoLocal",
    description: "Application de traduction et d'apprentissage des langues locales africaines avec NLP.",
    stack: ["Python", "React Native", "FastAPI"],
    categorie: "interne",
    image: "🌍",
    lien: null,
  },
  {
    id: 5,
    titre: "Plateforme E-learning",
    description: "Système de formation en ligne avec cours vidéo, quiz interactifs et suivi de progression.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    categorie: "capstone",
    image: "📚",
    lien: null,
  },
  {
    id: 6,
    titre: "Système IA reconnaissance d'image",
    description: "Modèle de classification d'images pour contrôle qualité en milieu industriel.",
    stack: ["Python", "TensorFlow", "Flask", "React"],
    categorie: "client",
    image: "🔍",
    lien: null,
  },
];
