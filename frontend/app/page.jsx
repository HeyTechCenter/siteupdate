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
    <main className="bg-[#1A1A1A]">
      <Header />
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
      <Footer />
      <WhatsAppButton />
    </main>
  );
}