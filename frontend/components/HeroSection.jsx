'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r:  Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(26, 122, 74, ${1 - dist / 140})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#1A7A4A';
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="accueil"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#1A1A1A] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[#1A1A1A]/60" />

      {/* pt-24 pour ne pas coller au header fixe */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-24">

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
          Hey<span className="text-[#1A7A4A]">Tech</span> Center
        </h1>

        {/* Accroche */}
        <p className="text-[#F5C518] text-lg md:text-xl font-medium mb-8 tracking-wide">
          Engineering the Digital Future of Africa
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Nous transformons vos idées en solutions digitales —
          web, mobile et intelligence artificielle.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projets"
            className="bg-[#1A7A4A] hover:bg-[#145f3a] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Voir nos projets
          </a>
          <a
            href="#contact"
            className="border border-[#1A7A4A] text-[#1A7A4A] hover:bg-[#1A7A4A] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Nous contacter
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-50">
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-[#1A7A4A] animate-bounce" />
        </div>

      </div>
    </section>
  );
}