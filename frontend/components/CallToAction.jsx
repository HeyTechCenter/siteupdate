'use client';
import { useEffect, useRef } from 'react';

export default function CallToAction() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'scale-100');
            entry.target.classList.remove('opacity-0', 'scale-95');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden" ref={sectionRef}>
      {/* Fond vert avec effet de vague */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A7A4A] to-[#0f4f2f]">
        {/* Motif technologique en arrière-plan */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Cercles flous animés */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F5C518] rounded-full mix-blend-overlay filter blur-3xl animate-pulse opacity-20"></div>
      </div>

      {/* Contenu */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto text-center opacity-0 scale-95 transition-all duration-1000"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Vous avez un projet <span className="text-[#F5C518]">digital</span> ?
        </h2>

        <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed">
          Notre équipe peut vous aider à concevoir, développer et déployer votre solution.
          <span className="block mt-2 text-white/80 text-base">
            Du concept à la mise en production, nous vous accompagnons à chaque étape.
          </span>
        </p>

        {/* Statistiques rapides */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-white/70 text-sm">Projets livrés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">11</div>
            <div className="text-white/70 text-sm">Experts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-white/70 text-sm">Support</div>
          </div>
        </div>

        {/* Boutons CTA - MÊME COMPORTEMENT */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group bg-white text-[#1A7A4A] hover:bg-[#F5C518] hover:text-[#1A1A1A] font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>Contacter HeyTech</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="https://wa.me/22790919103"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white text-[#1A7A4A] hover:bg-[#F5C518] hover:text-[#1A1A1A] font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 border-2 border-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            <span>Discuter sur WhatsApp</span>
          </a>
        </div>

        {/* Réponse rapide */}
        <p className="text-white/60 text-sm mt-6">
          ⚡ Réponse sous 24h ouvrées
        </p>
      </div>
    </section>
  );
}