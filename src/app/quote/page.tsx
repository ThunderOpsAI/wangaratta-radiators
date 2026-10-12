import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { QuoteForm } from '@/components/QuoteForm';
import { SlabEstimator } from '@/components/SlabEstimator';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Get a Free Quote & Slab Estimate | Wangaratta Radiators',
  description: 'Request a free Radiators quote and calculate your slab size, concrete volume in m³, and estimated costs for Wangaratta and North East Victoria.',
  openGraph: {
    title: 'Free Radiators Quote & Slab Estimate | Wangaratta Radiators',
    description: 'Calculate your concrete slab or driveway and request an on-site measure in Wangaratta, Glenrowan, Oxley, Milawa, Beechworth.',
    type: 'website',
  },
};

export default function QuotePage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-4">
        <QuoteForm />
        <div className="border-t border-surface-200">
          <SlabEstimator />
        </div>
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
