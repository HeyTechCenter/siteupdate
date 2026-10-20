import Header        from '@/components/Header';
import HeroSection    from '@/components/HeroSection';
import Manifeste      from '@/components/Manifeste';
import Services       from '@/components/Services';
import Departements   from '@/components/Departements';
import Projets        from '@/components/Projets';
import BuildInPublic  from '@/components/BuildInPublic';
import Equipe         from '@/components/Equipe';
import Temoignages    from '@/components/Temoignages';
import Insights       from '@/components/Insights';
import CallToAction   from '@/components/CallToAction';
import ContactForm    from '@/components/ContactForm';
import Footer         from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      {/* Lien d'évitement : visible uniquement au clavier */}
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[#F5C518] focus:text-[#1A1A1A] focus:font-semibold focus:px-4 focus:py-2 focus:rounded-full"
      >
        Aller au contenu
      </a>
      <Header />
      <main className="bg-[#1A1A1A]">
        <HeroSection />
        <Manifeste />
        <Services />
        <Departements />
        <Projets />
        <BuildInPublic />
        <Equipe />
        <Temoignages />
        <Insights />
        <CallToAction />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
