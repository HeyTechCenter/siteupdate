// Informations générales de HeyTech Center
// Utilisées par le SEO (layout.js, JSON-LD, sitemap) et par les composants.

export const site = {
  nom:         'HeyTech Center',
  url:         'https://heytech.top',
  slogan:      'Engineering the Digital Future of Africa',
  description:
    "HeyTech Center, startup tech fondée par des ingénieurs IA à Niamey (Niger) : " +
    "développement web, applications mobiles, solutions d'intelligence artificielle, " +
    'formations et transformation IA des entreprises.',
  ville:       'Niamey',
  pays:        'Niger',
  codePays:    'NE',
  email:       'heytechcenter@gmail.com',

  // WhatsApp : affichage lisible + format international sans « + » pour wa.me
  whatsapp: {
    affichage: '+227 88 13 28 22',
    numero:    '22788132822',
  },

  reseaux: {
    facebook: 'https://www.facebook.com/heytechcenter',
    tiktok:   'https://www.tiktok.com/@heytechcenter',
    linkedin: 'https://www.linkedin.com/in/administration-heytech-center/',
  },
};

// Lien WhatsApp avec message pré-rempli (optionnel)
export const lienWhatsApp = (message) =>
  `https://wa.me/${site.whatsapp.numero}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
