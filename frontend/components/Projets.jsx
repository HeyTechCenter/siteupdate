'use client';
import { useEffect, useRef, useState } from 'react';

const projets = [
  {
    id: 1,
    titre: "Haské Énergie",
    description: "Système de monitoring IoT pour mini-réseaux solaires avec prédiction ML et dashboard temps réel.",
    stack: ["React", "Flask", "Firebase", "ESP32"],
    categorie: "capstone",
    image: "⚡",
    lien: "#",
  },
  {
    id: 2,
    titre: "NIGERBIZ 360",
    description: "Application mobile de gestion commerciale pour petits marchands au Niger — inventaire, ventes, finances.",
    stack: ["React Native", "Expo", "Firebase"],
    categorie: "interne",
    image: "📦",
    lien: "#",
  },
  {
    id: 3,
    titre: "Système de gestion ANSI",
    description: "Plateforme de gestion des entrées/sorties des stagiaires, visiteurs et employés avec authentification JWT.",
    stack: ["Node.js", "Express", "MySQL", "JavaScript"],
    categorie: "client",
    image: "🏢",
    lien: "#",
  },
  {
    id: 4,
    titre: "LingoLocal",
    description: "Application de traduction et d'apprentissage des langues locales africaines avec NLP.",
    stack: ["Python", "React Native", "FastAPI"],
    categorie: "interne",
    image: "🌍",
    lien: "#",
  },
  {
    id: 5,
    titre: "Plateforme E-learning",
    description: "Système de formation en ligne avec cours vidéo, quiz interactifs et suivi de progression.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    categorie: "capstone",
    image: "📚",
    lien: "#",
  },
  {
    id: 6,
    titre: "Système IA reconnaissance d'image",
    description: "Modèle de classification d'images pour contrôle qualité en milieu industriel.",
    stack: ["Python", "TensorFlow", "Flask", "React"],
    categorie: "client",
    image: "🔍",
    lien: "#",
  },
];

const categories = [
  { id: 'tous', label: 'Tous' },
  { id: 'capstone', label: 'Projets Capstone' },
  { id: 'interne', label: 'Projets Internes' },
  { id: 'client', label: 'Projets Clients' },
];

export default function Projets() {
  const [filtre, setFiltre] = useState('tous');
  const itemsRef = useRef([]);

  const projetsFiltres = filtre === 'tous'
    ? projets
    : projets.filter((p) => p.categorie === filtre);

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
      { threshold: 0.1 }
    );
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [projetsFiltres]);

  return (
    <section id="projets" className="bg-[#1A1A1A] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Ce qu'on a construit
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Nos projets
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
        </div>

        {/* Filtres */}
        <div
          ref={(el) => (itemsRef.current[1] = el)}
          className="flex flex-wrap justify-center gap-3 mb-12 opacity-0 translate-y-8 transition-all duration-700 delay-100"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFiltre(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filtre === cat.id
                  ? 'bg-[#1A7A4A] text-white'
                  : 'border border-[#1A7A4A]/30 text-gray-400 hover:border-[#1A7A4A] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetsFiltres.map((projet, i) => (
            <div
              key={projet.id}
              ref={(el) => (itemsRef.current[2 + i] = el)}
              className="opacity-0 translate-y-8 transition-all duration-700 bg-[#111111] border border-[#1A7A4A]/20 rounded-2xl overflow-hidden group hover:border-[#1A7A4A]/60 hover:shadow-[0_0_30px_rgba(26,122,74,0.12)]"
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              {/* Image/Icône */}
              <div className="bg-[#1A1A1A] h-36 flex items-center justify-center text-6xl border-b border-[#1A7A4A]/10">
                {projet.image}
              </div>

              <div className="p-6">
                {/* Badge catégorie */}
                <span className="text-xs font-semibold text-[#1A7A4A] bg-[#1A7A4A]/10 border border-[#1A7A4A]/20 px-3 py-1 rounded-full capitalize">
                  {projet.categorie}
                </span>

                {/* Titre */}
                <h3 className="text-white font-bold text-lg mt-3 mb-2 group-hover:text-[#1A7A4A] transition-colors duration-300">
                  {projet.titre}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {projet.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {projet.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-gray-500 bg-[#1A1A1A] border border-gray-700 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bouton */}
                <a
                  href={projet.lien}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A7A4A] hover:text-white transition-colors duration-200"
                >
                  Voir le projet
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}