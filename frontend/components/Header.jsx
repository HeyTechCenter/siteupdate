'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Accueil',      href: '#accueil' },
  { label: 'À propos',     href: '#manifeste' },
  { label: 'Départements', href: '#departements' },
  { label: 'Projets',      href: '#projets' },
  { label: 'Équipe',       href: '#equipe' },
  { label: 'Témoignages',  href: '#temoignages' },
  { label: 'Blog',         href: '#blog' },
  { label: 'Contact',      href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#1A1A1A] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo — mix-blend-mode:screen rend le fond blanc invisible sur fond sombre */}
        <a href="#accueil">
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
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#1A7A4A] text-sm transition-colors duration-200"
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
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1A1A] px-6 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#1A7A4A] text-sm transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#1A7A4A] text-white text-sm font-semibold px-5 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Travailler avec nous
          </a>
        </div>
      )}
    </header>
  );
}