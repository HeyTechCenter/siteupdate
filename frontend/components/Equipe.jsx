'use client';
import { useEffect, useRef } from 'react';

const membres = [
  { nom: "Ibrahim", role: "CEO & AI Engineer", specialites: ["Machine Learning", "Architecture système"], dept: "AI & Research", icon: "👑" },
  { nom: "Penouel", role: "Chef DEV", specialites: ["Full Stack", "Architecture logicielle"], dept: "DEV", icon: "⚙️" },
  { nom: "Hapsat", role: "Chef IA", specialites: ["Deep Learning", "Computer Vision"], dept: "AI & Research", icon: "🤖" },
  { nom: "Aysha", role: "Chef Akatsuki", specialites: ["Communication", "Marketing digital"], dept: "Akatsuki", icon: "📣" },
  { nom: "Adam", role: "Dev Backend & IA", specialites: ["Node.js", "Python", "Prompt Engineering"], dept: "DEV", icon: "🏗️" },
  { nom: "Noé", role: "Développeur Full Stack", specialites: ["React", "Next.js", "UI/UX"], dept: "DEV", icon: "💻" },
  { nom: "Membre 7", role: "Développeur Mobile", specialites: ["React Native", "Flutter"], dept: "DEV", icon: "📱" },
  { nom: "Membre 8", role: "Data Scientist", specialites: ["Analyse de données", "Statistiques"], dept: "AI & Research", icon: "📊" },
  { nom: "Membre 9", role: "Community Manager", specialites: ["Réseaux sociaux", "Contenu"], dept: "Akatsuki", icon: "🎨" },
  { nom: "Membre 10", role: "Développeur Web", specialites: ["Vue.js", "Laravel"], dept: "DEV", icon: "🌐" },
  { nom: "Membre 11", role: "Ingénieur Cloud", specialites: ["AWS", "Docker", "CI/CD"], dept: "DEV", icon: "☁️" },
];

const deptColors = {
  "DEV": { bg: "bg-[#1A7A4A]/10", border: "border-[#1A7A4A]/30", text: "text-[#1A7A4A]" },
  "AI & Research": { bg: "bg-[#F5C518]/10", border: "border-[#F5C518]/30", text: "text-[#F5C518]" },
  "Akatsuki": { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
};

export default function Equipe() {
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
    <section id="equipe" className="bg-[#111111] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-[#F5C518] text-xs font-semibold tracking-widest uppercase">
            Les builders
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Notre équipe
          </h2>
          <div className="w-16 h-1 bg-[#1A7A4A] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            11 passionnés du digital qui construisent avant même d'avoir fini d'apprendre.
          </p>
        </div>

        {/* Grille membres */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {membres.map((m, i) => {
            const colors = deptColors[m.dept] || deptColors["DEV"];
            return (
              <div
                key={i}
                ref={(el) => (itemsRef.current[1 + i] = el)}
                className="opacity-0 translate-y-8 transition-all duration-700 bg-[#1A1A1A] border border-[#1A7A4A]/20 rounded-2xl p-5 text-center hover:border-[#1A7A4A]/50 hover:shadow-[0_0_20px_rgba(26,122,74,0.1)] group"
                style={{ transitionDelay: `${(i + 1) * 60}ms` }}
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-[#1A7A4A]/20 group-hover:border-[#1A7A4A]/60 transition-colors duration-300">
                  {m.icon}
                </div>

                {/* Nom */}
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#1A7A4A] transition-colors duration-300">
                  {m.nom}
                </h3>

                {/* Rôle */}
                <p className="text-gray-400 text-xs mb-3">{m.role}</p>

                {/* Badge département */}
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}>
                  {m.dept}
                </span>

                {/* Spécialités */}
                <div className="mt-3 space-y-1">
                  {m.specialites.map((spec) => (
                    <p key={spec} className="text-gray-500 text-xs">{spec}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}