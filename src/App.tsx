import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { PersonalizedHealthTracking } from './components/PersonalizedHealthTracking';
import { FeaturedTherapies } from './components/FeaturedTherapies';
import { TherapiesCatalog } from './components/TherapiesCatalog';
import { AboutSection } from './components/AboutSection';
import { PractitionerSection } from './components/PractitionerSection';
import { WhyAyushKaya } from './components/WhyAyushKaya';
import { ClientExperiences } from './components/ClientExperiences';
import { HowBookingWorks } from './components/HowBookingWorks';
import { BookingSection } from './components/BookingSection';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WhatsAppAIAssistant } from './components/WhatsAppAIAssistant';
import { TherapyDetailModal } from './components/TherapyDetailModal';
import { BookingModal } from './components/BookingModal';
import { Therapy } from './data/ayushkayaData';

export default function App() {
  const [selectedTherapyForDetail, setSelectedTherapyForDetail] = useState<Therapy | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedTherapy, setPreselectedTherapy] = useState<string>('Kati Basti');

  const handleOpenBooking = (therapyName?: string) => {
    if (therapyName) {
      setPreselectedTherapy(therapyName);
    }
    setIsBookingModalOpen(true);
  };

  const handleOpenChatFromPractitioner = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1E2922] flex flex-col font-sans relative selection:bg-[#059669]/20 selection:text-[#0E2A21]">
      
      {/* 1. Sticky Navigation Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Trust / Quick Information Strip */}
        <TrustStrip />

        {/* 4. Personalized Ayurvedic Health Tracking & Dosha Balance Module */}
        <PersonalizedHealthTracking
          onSelectTherapy={(therapy) => setSelectedTherapyForDetail(therapy)}
          onBookTherapy={(name) => handleOpenBooking(name)}
        />

        {/* 5. Featured Therapies */}
        <FeaturedTherapies
          onSelectTherapy={(therapy) => setSelectedTherapyForDetail(therapy)}
          onBookTherapy={(name) => handleOpenBooking(name)}
        />

        {/* 6. Complete Therapies Section (All 24 modalities categorized and numbered) */}
        <TherapiesCatalog
          onSelectTherapy={(therapy) => setSelectedTherapyForDetail(therapy)}
          onBookTherapy={(name) => handleOpenBooking(name)}
        />

        {/* 7. About AyushKaya */}
        <AboutSection />

        {/* 8. Practitioner Section */}
        <PractitionerSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenChat={handleOpenChatFromPractitioner}
        />

        {/* 9. Why AyushKaya */}
        <WhyAyushKaya />

        {/* 10. Client Experiences - Social proof & authentic patient feedback */}
        <ClientExperiences />

        {/* 11. How Booking Works */}
        <HowBookingWorks onOpenBooking={() => handleOpenBooking()} />

        {/* 12. Prominent Booking Form Section */}
        <BookingSection initialTherapyName={preselectedTherapy} />

        {/* 13. Location Section */}
        <LocationSection />

        {/* 14. FAQ Section */}
        <FAQSection />

        {/* 15. Final High-Contrast CTA */}
        <FinalCTA onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 16. Footer */}
      <Footer />

      {/* 17. WhatsApp AI Assistant (Floating widget with resilient backend connection & quick replies) */}
      <WhatsAppAIAssistant onOpenBooking={handleOpenBooking} />

      {/* Interactive Detail Modal for Therapy cards */}
      <TherapyDetailModal
        therapy={selectedTherapyForDetail}
        onClose={() => setSelectedTherapyForDetail(null)}
        onBook={(name) => handleOpenBooking(name)}
      />

      {/* Quick Booking Modal dialog */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedTherapyName={preselectedTherapy}
      />
    </div>
  );
}
