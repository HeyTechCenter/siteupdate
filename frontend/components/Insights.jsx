'use client';
import { useEffect, useRef } from 'react';

const ressources = [
  {
    id: 1,
    titre: "L'avenir de l'IA en Afrique",
    source: "TechCrunch",
    date: "Décembre 2024",
    commentaire: "Un article qui confirme notre vision : l'Afrique devient un acteur majeur de l'IA. Nous partageons particulièrement l'analyse sur les talents locaux.",
    url: "https://techcrunch.com/",
    auteur: "Ibrahim",
    categorie: "IA"
  },
  {
    id: 2,
    titre: "Guide de cybersécurité pour les PME",
    source: "ANSSI",
    date: "Janvier 2025",
    commentaire: "Des recommandations pratiques et accessibles. Chez HeyTech, nous appliquons ces standards dans tous nos projets.",
    url: "https://www.ssi.gouv.fr/",
    auteur: "Fatima",
    categorie: "Sécurité"
  },
  {
    id: 3,
    titre: "État du développement mobile en 2025",
    source: "State of JS",
    date: "Février 2025",
    commentaire: "Une étude passionnante sur les tendances du développement mobile. Nos choix technologiques (React Native, Flutter) sont alignés.",
    url: "https://stateofjs.com/",
    auteur: "Amadou",
    categorie: "Mobile"
  },
  {
    id: 4,
    titre: "Guide UX/UI pour les marchés africains",
    source: "UX Collective",
    date: "Janvier 2025",
    commentaire: "Des conseils précieux pour concevoir des applications adaptées aux réalités locales. À lire absolument !",
    url: "https://uxdesign.cc/",
    auteur: "Sarah",
    categorie: "Design"
  }
];

export default function Ressources() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="ressources" className="bg-[#111111] py-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">

        {/* En-tête */}
        <div
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Partage de connaissances
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Veille <span className="text-[#1A7A4A]">& Ressources</span>
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Chaque semaine, notre équipe partage les articles, études et outils qui ont retenu notre attention. 
            Une veille technologique pour rester à la pointe.
          </p>
        </div>

        {/* Grille de ressources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ressources.map((ressource, index) => (
            <a
              key={ressource.id}
              href={ressource.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (cardsRef.current[index] = el)}
              className="opacity-0 translate-y-8 transition-all duration-700 bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#1A7A4A]/20 hover:border-[#1A7A4A]/60 hover:shadow-[0_0_30px_rgba(26,122,74,0.15)] group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-6">
                {/* En-tête avec catégorie et source */}
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-[#1A7A4A]/20 text-[#1A7A4A] text-xs font-semibold px-2 py-1 rounded">
                    {ressource.categorie}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {ressource.source}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#1A7A4A] transition-colors duration-300">
                  {ressource.titre}
                </h3>

                {/* Commentaire de l'équipe */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">
                  "{ressource.commentaire}"
                </p>

                {/* Auteur et date */}
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Par {ressource.auteur}</span>
                  <span>{ressource.date}</span>
                </div>

                {/* Lien externe (visible au survol) */}
                <div className="mt-4 flex items-center text-[#1A7A4A] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Lire l'article original</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

      
      </div>
    </section>
  );
}