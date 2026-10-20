// Témoignages clients
// TODO : aucun de ces témoignages n'a été confirmé (noms, fonctions et citations
// à valider avec les personnes concernées). Ils restent masqués en production ;
// la section entière disparaît tant qu'aucun témoignage n'est publié.
// Pour publier un témoignage réel : remplacer le contenu et retirer « publie: false ».

const aValider = { publie: false, todo: 'témoignage non confirmé : remplacer par un vrai témoignage validé' };

export const temoignages = [
  {
    id: 1,
    nom: "Dr. Moussa Diallo",
    role: "Directeur, ANSI Niger",
    texte: "HeyTech Center a livré une solution de gestion moderne et fiable en un temps record. Une équipe sérieuse, rigoureuse et à l'écoute du client.",
    note: 5,
    ...aValider,
  },
  {
    id: 2,
    nom: "Aïssata Koné",
    role: "Professeure d'informatique, Université ADU",
    texte: "Ces jeunes ont démontré un niveau technique remarquable. Leur projet capstone dépasse largement ce qu'on attend d'étudiants en licence.",
    note: 5,
    ...aValider,
  },
  {
    id: 3,
    nom: "Ibrahim Mahamane",
    role: "Entrepreneur, Niamey",
    texte: "J'avais une idée, HeyTech l'a transformée en application mobile fonctionnelle. Professionnels, disponibles et passionnés.",
    note: 5,
    ...aValider,
  },
  {
    id: 4,
    nom: "Fatouma Zakari",
    role: "Mentor Tech, HubTech Niamey",
    texte: "Rarement vu une équipe aussi jeune avec une vision aussi claire. Discipline, innovation et impact — ce ne sont pas juste des mots pour eux.",
    note: 5,
    ...aValider,
  },
];
