import "./globals.css";
import { site } from "@/data/site";

const titre = `${site.nom} — Web, mobile et IA à ${site.ville}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titre,
    template: `%s | ${site.nom}`,
  },
  description: site.description,
  keywords: [
    "HeyTech Center",
    "développement web Niamey",
    "application mobile Niger",
    "intelligence artificielle Niger",
    "transformation IA entreprise",
    "formation développement",
    "startup tech Niger",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.nom,
    title: titre,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.nom }],
  },
  twitter: {
    card: "summary_large_image",
    title: titre,
    description: site.description,
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#1A1A1A",
};

// Données structurées JSON-LD : Organization + LocalBusiness (Niamey)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.nom,
      url: site.url,
      logo: `${site.url}/logo.png`,
      description: site.description,
      email: site.email,
      sameAs: Object.values(site.reseaux),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.whatsapp.affichage.replace(/\s/g, ""),
        contactType: "customer service",
        availableLanguage: ["French"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#localbusiness`,
      name: site.nom,
      url: site.url,
      image: `${site.url}/og-image.png`,
      telephone: site.whatsapp.affichage.replace(/\s/g, ""),
      email: site.email,
      parentOrganization: { "@id": `${site.url}/#organization` },
      // TODO : ajouter streetAddress et openingHours quand ils seront connus
      address: {
        "@type": "PostalAddress",
        addressLocality: site.ville,
        addressCountry: site.codePays,
      },
      areaServed: site.pays,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Échappement de « < » pour qu'aucune donnée ne puisse fermer la balise script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
