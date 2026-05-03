'use client';
import { useEffect, useRef, useState } from 'react';

const temoignages = [
  {
    id: 1,
    nom: "Dr. Moussa Diallo",
    role: "Directeur, ANSI Niger",
    texte: "HeyTech Center a livré une solution de gestion moderne et fiable en un temps record. Une équipe sérieuse, rigoureuse et à l'écoute du client.",
    note: 5,
  },
  {
    id: 2,
    nom: "Aïssata Koné",
    role: "Professeure d'informatique, Université ADU",
    texte: "Ces jeunes ont démontré un niveau technique remarquable. Leur projet capstone dépasse largement ce qu'on attend d'étudiants en licence.",
    note: 5,
  },
  {
    id: 3,
    nom: "Ibrahim Mahamane",
    role: "Entrepreneur, Niamey",
    texte: "J'avais une idée, HeyTech l'a transformée en application mobile fonctionnelle. Professionnels, disponibles et passionnés.",
    note: 5,
  },
  {
    id: 4,
    nom: "Fatouma Zakari",
    role: "Mentor Tech, HubTech Niamey",
    texte: "Rarement vu une équipe aussi jeune avec une vision aussi claire. Discipline, innovation et impact — ce ne sont pas juste des mots pour eux.",
    note: 5,
  },
];

function Etoiles({ note }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < note ? 'text-[#F5C518]' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Temoignages() {
  const [actif, setActif] = useState(0);
  const itemsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActif((prev) => (prev + 1) % temoignages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <section id="temoignages" className="bg-[#1A1A1A] py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Ce qu'ils disent
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Ils nous font confiance
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
        </div>

        {/* Carte active */}
        <div
          ref={(el) => (itemsRef.current[1] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 delay-100"
        >
          <div className="bg-[#111111] border border-[#1A7A4A]/20 rounded-2xl p-10 text-center relative">
            {/* Guillemet décoratif */}
            <div className="text-[#1A7A4A]/20 text-8xl font-serif absolute top-4 left-8 leading-none">
              "
            </div>

            <Etoiles note={temoignages[actif].note} />

            <p className="text-gray-300 text-lg leading-relaxed mb-8 italic relative z-10">
              "{temoignages[actif].texte}"
            </p>

            <div>
              <p className="text-white font-bold">{temoignages[actif].nom}</p>
              <p className="text-[#1A7A4A] text-sm mt-1">{temoignages[actif].role}</p>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-3 mt-8">
            {temoignages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActif(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === actif ? 'bg-[#1A7A4A] w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grille mini cartes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {temoignages.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActif(i)}
              ref={(el) => (itemsRef.current[2 + i] = el)}
              className={`opacity-0 translate-y-8 transition-all duration-700 p-4 rounded-xl border text-left ${
                i === actif
                  ? 'border-[#1A7A4A] bg-[#1A7A4A]/10'
                  : 'border-[#1A7A4A]/10 bg-[#111111] hover:border-[#1A7A4A]/40'
              }`}
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              <p className="text-white text-xs font-bold truncate">{t.nom}</p>
              <p className="text-gray-500 text-xs mt-1 truncate">{t.role}</p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}