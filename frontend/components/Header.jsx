'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { temoignages } from '@/data/temoignages';
import { ressources } from '@/data/insights';
import { sectionVisible } from '@/lib/publication';

// Les liens vers une section sans contenu publié sont retirés du menu
const navLinks = [
  { label: 'Accueil',      href: '#accueil' },
  { label: 'À propos',     href: '#manifeste' },
  { label: 'Services',     href: '#services' },
  { label: 'Départements', href: '#departements' },
  { label: 'Projets',      href: '#projets' },
  { label: 'Équipe',       href: '#equipe' },
  { label: 'Témoignages',  href: '#temoignages', visible: sectionVisible(temoignages) },
  { label: 'Blog',         href: '#ressources',  visible: sectionVisible(ressources) },
  { label: 'Contact',      href: '#contact' },
].filter((link) => link.visible !== false);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermeture du menu mobile avec la touche Échap
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled || menuOpen ? 'bg-[#1A1A1A] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo */}
        <a href="#accueil" aria-label="HeyTech Center — retour à l'accueil">
          <Image
            src="/logo.png"
            alt="HeyTech Center"
            width={90}
            height={100}
            className="object-contain"
            style={{ mixBlendMode: 'screen' }}
            priority
          />
        </a>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#2FA36B] text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bouton CTA */}
        <a
          href="#contact"
          className="hidden md:block bg-[#1A7A4A] hover:bg-[#145f3a] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
        >
          Travailler avec nous
        </a>

        {/* Burger mobile */}
        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="md:hidden bg-[#1A1A1A] px-6 pb-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#2FA36B] text-base py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-3 bg-[#1A7A4A] text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Travailler avec nous
          </a>
        </nav>
      )}
    </header>
  );
}