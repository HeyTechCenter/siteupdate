import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Manifeste from '@/components/Manifeste';
import Services from '@/components/Services';
import Insights from '@/components/Insights'; // Nouveau
import CallToAction from '@/components/CallToAction'; // Nouveau
import ContactForm from '@/components/ContactForm'; // Nouveau
import Footer from '@/components/Footer'; // Nouveau
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="bg-[#1A1A1A]">
      <Header />
      <HeroSection />
      <Manifeste />
      <Services />
      <Insights />        {/* Section 10 */}
      <CallToAction />    {/* Section 11 */}
      <ContactForm />     {/* Section 12 */}
      <Footer />          {/* Section 13 */}
      <WhatsAppButton />  {/* Section 14 - déjà existant */}
    </main>
  );
}