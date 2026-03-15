'use client';
import { useEffect, useRef } from 'react';

const services = [
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
];

export default function Services() {
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
    <section id="services" className="bg-[#1A1A1A] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Nos expertises
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Ce que nous construisons
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((s, i) => (
            <div
              key={s.titre}
              ref={(el) => (itemsRef.current[1 + i] = el)}
              className="opacity-0 translate-y-8 transition-all duration-700 group bg-[#111111] border border-[#1A7A4A]/20 rounded-2xl p-8 hover:border-[#1A7A4A]/70 hover:shadow-[0_0_40px_rgba(26,122,74,0.12)] hover:-translate-y-1 cursor-default"
              style={{ transitionDelay: `${(i + 1) * 120}ms` }}
            >
              <div className="text-5xl mb-6">{s.icon}</div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#1A7A4A] transition-colors duration-300">
                {s.titre}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bouton */}
        <div
          ref={(el) => (itemsRef.current[4] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 delay-500 text-center"
        >
          <a
            href="#projets"
            className="inline-block bg-[#1A7A4A] hover:bg-[#145f3a] text-white font-semibold px-10 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Voir nos projets
          </a>
        </div>

      </div>
    </section>
  );
}