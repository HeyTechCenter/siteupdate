// Articles de la section « Veille & Ressources »
// TODO : contenus non confirmés (titres d'articles génériques, liens vers des pages
// d'accueil, auteurs absents de l'équipe). Masqués en production ; la section et le
// lien « Blog » du menu disparaissent tant qu'aucun article n'est publié.
// Pour publier : mettre le vrai titre, l'URL exacte de l'article, l'auteur réel,
// puis retirer « publie: false ».

const aValider = { publie: false, todo: 'article non confirmé : vrai titre, URL exacte et auteur de l\'équipe' };

export const ressources = [
  {
    id: 1,
    titre: "L'avenir de l'IA en Afrique",
    source: "TechCrunch",
    date: "Décembre 2024",
    commentaire: "Un article qui confirme notre vision : l'Afrique devient un acteur majeur de l'IA. Nous partageons particulièrement l'analyse sur les talents locaux.",
    url: "https://techcrunch.com/",
    auteur: "Ibrahim",
    categorie: "IA",
    ...aValider,
  },
  {
    id: 2,
    titre: "Guide de cybersécurité pour les PME",
    source: "ANSSI",
    date: "Janvier 2025",
    commentaire: "Des recommandations pratiques et accessibles. Chez HeyTech, nous appliquons ces standards dans tous nos projets.",
    url: "https://www.ssi.gouv.fr/",
    auteur: "Fatima",
    categorie: "Sécurité",
    ...aValider,
  },
  {
    id: 3,
    titre: "État du développement mobile en 2025",
    source: "State of JS",
    date: "Février 2025",
    commentaire: "Une étude passionnante sur les tendances du développement mobile. Nos choix technologiques (React Native, Flutter) sont alignés.",
    url: "https://stateofjs.com/",
    auteur: "Amadou",
    categorie: "Mobile",
    ...aValider,
  },
  {
    id: 4,
    titre: "Guide UX/UI pour les marchés africains",
    source: "UX Collective",
    date: "Janvier 2025",
    commentaire: "Des conseils précieux pour concevoir des applications adaptées aux réalités locales. À lire absolument !",
    url: "https://uxdesign.cc/",
    auteur: "Sarah",
    categorie: "Design",
    ...aValider,
  },
];
