'use client';
import { useEffect, useRef } from 'react';

const moments = [
  { emoji: "🏗️", titre: "Naissance du projet", desc: "Tout a commencé avec une idée et beaucoup d'ambition. On a refusé d'attendre la fin des études.", date: "2024" },
  { emoji: "💻", titre: "Premières sessions", desc: "Des nuits entières à coder, déboguer, apprendre. Chaque erreur était une leçon.", date: "2024" },
  { emoji: "🤝", titre: "L'équipe se forme", desc: "11 profils complémentaires réunis autour d'une vision commune. DEV, IA, Communication.", date: "2025" },
  { emoji: "🚀", titre: "Premiers projets livrés", desc: "De l'idée à la production. Des clients satisfaits et des solutions qui tournent.", date: "2025" },
  { emoji: "🏆", titre: "Reconnaissance",  desc: "Hackathons, concours, présentations. HeyTech commence à faire parler de lui.", date: "2025" },
  { emoji: "🌍", titre: "L'Afrique comme terrain de jeu", desc: "On ne construit pas juste pour Niger. On construit pour l'Afrique.", date: "2025" },
];

export default function BuildInPublic() {
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
      { threshold: 0.1 }
    );
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="buildinpublic" className="bg-[#1A1A1A] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Coulisses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Building HeyTech
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Derrière chaque ligne de code, il y a une vraie histoire. Voici la nôtre.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-[#1A7A4A]/20 hidden md:block" />

          <div className="space-y-8">
            {moments.map((moment, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[1 + i] = el)}
                className={`opacity-0 translate-y-8 transition-all duration-700 flex items-center gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                {/* Carte */}
                <div className="flex-1 bg-[#111111] border border-[#1A7A4A]/20 rounded-2xl p-6 hover:border-[#1A7A4A]/50 hover:shadow-[0_0_20px_rgba(26,122,74,0.1)] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{moment.emoji}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-bold">{moment.titre}</h3>
                        <span className="text-xs text-[#F5C518] border border-[#F5C518]/30 px-2 py-0.5 rounded-full">
                          {moment.date}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{moment.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Point central (desktop) */}
                <div className="hidden md:flex w-4 h-4 bg-[#1A7A4A] rounded-full flex-shrink-0 border-2 border-[#1A1A1A] z-10" />

                {/* Espace côté opposé */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={(el) => (itemsRef.current[7] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 delay-700 text-center mt-16"
        >
          <p className="text-gray-400 mb-4">Suis notre aventure en temps réel</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/heytechcenter"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white text-sm font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/administration-heytech-center/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A66C2] text-white text-sm font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}