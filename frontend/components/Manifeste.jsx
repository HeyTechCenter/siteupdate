'use client';
import { useEffect, useRef } from 'react';

const valeurs = [
  {
    titre: 'Discipline',
    desc:  'La rigueur dans chaque ligne de code, chaque décision, chaque livraison.',
    icon:  '⚙️',
  },
  {
    titre: 'Innovation',
    desc:  'Les technologies les plus avancées au service de chaque projet.',
    icon:  '💡',
  },
  {
    titre: 'Impact',
    desc:  'Des solutions qui transforment réellement des organisations et des vies.',
    icon:  '🚀',
  },
];

export default function Manifeste() {
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
    <section id="manifeste" className="bg-[#111111] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Qui sommes-nous
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Notre histoire
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
        </div>

        {/* 1 seul paragraphe fort — sans "ingénieur" */}
        <div
          ref={(el) => (itemsRef.current[1] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 delay-100 max-w-2xl mx-auto text-center mb-20"
        >
          <p className="text-gray-300 text-xl leading-relaxed">
            Nous sommes un collectif de passionnés du digital qui ont refusé
            d&apos;attendre. Notre ambition est de prouver que{' '}
            <span className="text-white font-semibold">
              l&apos;Afrique peut construire des solutions digitales intelligentes
            </span>{' '}
            capables de rivaliser avec les meilleurs.
          </p>
        </div>

        {/* Séparateur */}
        <div
          ref={(el) => (itemsRef.current[2] = el)}
          className="opacity-0 translate-y-8 transition-all duration-700 delay-200 flex items-center gap-4 mb-16"
        >
          <div className="flex-1 h-px bg-[#1A7A4A]/20" />
          <span className="text-[#1A7A4A] text-sm font-semibold tracking-widest uppercase">
            Nos valeurs
          </span>
          <div className="flex-1 h-px bg-[#1A7A4A]/20" />
        </div>

        {/* Cartes valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valeurs.map((v, i) => (
            <div
              key={v.titre}
              ref={(el) => (itemsRef.current[3 + i] = el)}
              className="opacity-0 translate-y-8 transition-all duration-700 bg-[#1A1A1A] border border-[#1A7A4A]/20 rounded-2xl p-8 text-center hover:border-[#1A7A4A]/60 hover:shadow-[0_0_30px_rgba(26,122,74,0.1)] group"
              style={{ transitionDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1A7A4A] transition-colors duration-300">
                {v.titre}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}