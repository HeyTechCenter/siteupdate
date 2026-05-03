'use client';
import { useEffect, useRef, useState } from 'react';

const departements = [
  {
    id: 'dev',
    nom: 'DEV Department',
    slogan: "L'usine de production technologique",
    icon: '💻',
    color: '#1A7A4A',
    description:
      "Notre département développement conçoit et livre des solutions web, mobile et cloud de haute qualité. Chaque projet est traité avec rigueur, de l'architecture au déploiement.",
    competences: ['Frontend', 'Backend', 'Sécurité', 'Cloud', 'APIs REST', 'Bases de données'],
  },
  {
    id: 'ai',
    nom: 'AI & Research Department',
    slogan: "Le laboratoire d'innovation",
    icon: '🤖',
    color: '#F5C518',
    description:
      "Notre laboratoire IA explore, expérimente et intègre les technologies d'intelligence artificielle dans des solutions concrètes. De la recherche appliquée à la production.",
    competences: ['Machine Learning', 'Analyse de données', 'Recherche appliquée', 'NLP', 'Computer Vision', 'MLOps'],
  },
  {
    id: 'akatsuki',
    nom: 'Akatsuki Communication Unit',
    slogan: 'La cellule stratégique de communication',
    icon: '📣',
    color: '#7C3AED',
    description:
      "Akatsuki gère la présence digitale de HeyTech Center et de ses clients. Communication externe, marketing digital, création de contenu et stratégie de marque.",
    competences: ['Marketing digital', 'Réseaux sociaux', 'Communication externe', 'Création de contenu', 'Branding', 'Community Management'],
  },
];

export default function Departements() {
  const [actif, setActif] = useState(null);
  const itemsRef = useRef([]);

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
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="departements" className="bg-[#111111] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Notre organisation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Notre architecture d'expertise
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
        </div>

        {/* Cartes départements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departements.map((dept, i) => (
            <div
              key={dept.id}
              ref={(el) => (itemsRef.current[1 + i] = el)}
              className="opacity-0 translate-y-8 transition-all duration-700 cursor-pointer"
              style={{ transitionDelay: `${(i + 1) * 120}ms` }}
              onClick={() => setActif(actif === dept.id ? null : dept.id)}
            >
              <div
                className={`bg-[#1A1A1A] rounded-2xl p-8 border transition-all duration-300 ${
                  actif === dept.id
                    ? 'border-opacity-100 shadow-lg'
                    : 'border-[#1A7A4A]/20 hover:border-[#1A7A4A]/50'
                }`}
                style={{
                  borderColor: actif === dept.id ? dept.color : undefined,
                  boxShadow: actif === dept.id ? `0 0 30px ${dept.color}20` : undefined,
                }}
              >
                {/* Icône */}
                <div className="text-5xl mb-5">{dept.icon}</div>

                {/* Nom */}
                <h3
                  className="text-xl font-bold mb-2 transition-colors duration-300"
                  style={{ color: actif === dept.id ? dept.color : 'white' }}
                >
                  {dept.nom}
                </h3>

                {/* Slogan */}
                <p className="text-gray-400 text-sm mb-4 italic">{dept.slogan}</p>

                {/* Séparateur */}
                <div
                  className="w-10 h-px mb-4 transition-all duration-300"
                  style={{ backgroundColor: actif === dept.id ? dept.color : '#333' }}
                />

                {/* Description (visible si actif) */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    actif === dept.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {dept.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dept.competences.map((comp) => (
                      <span
                        key={comp}
                        className="text-xs font-medium px-3 py-1 rounded-full border"
                        style={{
                          color: dept.color,
                          borderColor: `${dept.color}40`,
                          backgroundColor: `${dept.color}10`,
                        }}
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bouton expand */}
                <button
                  className="mt-4 text-xs font-semibold flex items-center gap-1 transition-colors duration-200"
                  style={{ color: dept.color }}
                >
                  {actif === dept.id ? 'Réduire' : 'En savoir plus'}
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${actif === dept.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}