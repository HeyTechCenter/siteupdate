// Gestion du contenu non validé
//
// Chaque élément des fichiers data/*.js peut porter :
//   publie: false  → masqué en production (npm run build / start), visible en développement
//   todo:  '...'   → note affichée en développement pour indiquer ce qu'il reste à fournir
//
// Ainsi, aucun contenu fictif ou non confirmé n'apparaît sur heytech.top.

export const enProduction = process.env.NODE_ENV === 'production';

// Filtre les éléments à afficher selon l'environnement
export const visibles = (elements) =>
  elements.filter((element) => element.publie !== false || !enProduction);

// Une section est affichée seulement si elle contient au moins un élément visible
export const sectionVisible = (elements) => visibles(elements).length > 0;
