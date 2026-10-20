// Services affichés dans la section « Ce que nous construisons » et dans le footer
// publie: false → masqué en production (voir lib/publication.js)

export const services = [
  {
    titre: 'Développement Web',
    desc:  'Création de plateformes web modernes, performantes et sécurisées pour entreprises et organisations.',
    icon:  '🌐',
  },
  {
    titre: 'Applications Mobiles',
    desc:  'Conception d\'applications mobiles Android et iOS centrées sur l\'expérience utilisateur.',
    icon:  '📱',
  },
  {
    titre: 'Intelligence Artificielle',
    desc:  'Développement de solutions d\'analyse de données, automatisation et systèmes intelligents.',
    icon:  '🤖',
  },
  {
    titre: 'Transformation IA des entreprises',
    desc:  'Nous accompagnons votre entreprise pour tirer parti de l\'intelligence artificielle, service par service.',
    icon:  '🏢',
    points: [
      'Audit service par service des tâches automatisables',
      'Intégration de l\'IA et de l\'automatisation dans vos outils',
      'Formation de vos employés',
    ],
  },
  {
    titre: 'Publication sur le Google Play Store',
    desc:  'Nous publions vos applications Android sur le Google Play Store depuis le compte entreprise de HeyTech Center.',
    icon:  '▶️',
  },
  {
    // TODO : préciser les modules, le lieu et le format des formations
    titre:  'Formations en IA',
    desc:   'Formations en intelligence artificielle dispensées par l\'équipe HeyTech Center.',
    icon:   '🎓',
  },
  {
    // TODO : offre pas encore lancée — passer publie à true au lancement
    titre:  'Hébergement VPS mutualisé',
    desc:   'Hébergement sur VPS mutualisé pour étudiants et développeurs juniors.',
    icon:   '🖥️',
    publie: false,
    todo:   'offre pas encore lancée : passer publie à true au lancement (et préciser tarifs / caractéristiques)',
  },
];
