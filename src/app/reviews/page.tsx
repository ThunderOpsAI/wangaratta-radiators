import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';
import { ApprovedReviews } from '@/components/ApprovedReviews';
import { ReviewSubmitForm } from '@/components/ReviewSubmitForm';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';

export const metadata: Metadata = {
  title: 'Client Reviews & Builder Endorsements | Wangaratta Radiators',
  description: 'Read reviews and testimonials from Wangaratta home owners, shed builders, and farmers who trust Wangaratta Radiators for quality slabs and driveways.',
  openGraph: {
    title: 'Client Reviews & Builder Endorsements | Wangaratta Radiators',
    description: 'Verified testimonials from custom home builders, farmers, and homeowners across North East Victoria.',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <ApprovedReviews />
        <ReviewSubmitForm />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
