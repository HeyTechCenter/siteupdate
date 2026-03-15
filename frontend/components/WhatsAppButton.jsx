'use client';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  // Remplace par le vrai numéro WhatsApp HeyTech (format international sans +)
  const phone   = '22790919103';
  const message = 'Bonjour HeyTech Center, je souhaite discuter d\'un projet digital.';
  const url     = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 group"
      aria-label="Discuter sur WhatsApp"
    >
      {/* Label tooltip */}
      <span
        className={`bg-[#1A1A1A] text-white text-sm font-medium px-4 py-2 rounded-full border border-[#1A7A4A]/40 shadow-lg transition-all duration-300 whitespace-nowrap ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        Discuter sur WhatsApp
      </span>

      {/* Bouton rond */}
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300">

        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        {/* Icône WhatsApp SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.77 1.8 6.77L2 30l7.45-1.75A13.93 13.93 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.84-1.6l-.42-.25-4.42 1.04 1.07-4.3-.28-.45A11.46 11.46 0 0 1 4.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5zm6.29-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.08 1.33-.2.23-.39.25-.73.08-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.01-1.9-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.85-1.05-2.54-.28-.67-.56-.58-.77-.59h-.66c-.23 0-.6.09-.91.43-.31.34-1.19 1.16-1.19 2.83s1.22 3.28 1.39 3.51c.17.23 2.4 3.66 5.81 5.13.81.35 1.44.56 1.93.71.81.26 1.55.22 2.13.13.65-.1 2.02-.82 2.3-1.62.28-.8.28-1.48.2-1.62-.09-.14-.31-.23-.65-.4z" />
        </svg>
      </div>
    </a>
  );
}