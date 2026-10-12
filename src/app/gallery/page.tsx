import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Gallery } from '@/components/Gallery';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Project Gallery & Substrates | Wangaratta Radiators',
  description: 'Browse our portfolio of exposed aggregate driveways, machinery shed slabs, house foundations, and before-and-after substrate comparisons across Wangaratta and North East Victoria.',
  openGraph: {
    title: 'Radiators Gallery & Substrates | Wangaratta Radiators',
    description: 'Explore finished driveways, shed slabs, and substrate engineering across Wangaratta, Glenrowan, Milawa, and Beechworth.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <Gallery />
        <BeforeAfterSection />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
