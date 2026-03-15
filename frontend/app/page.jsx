import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Manifeste from '@/components/Manifeste';
import Services from '@/components/Services';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="bg-[#1A1A1A] min-h-screen">
      <Header />
      <HeroSection />
      <Manifeste />
      <Services />
      <WhatsAppButton />
    </main>
  );
}