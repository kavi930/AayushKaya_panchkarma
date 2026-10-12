import React from 'react';
import { Calendar, MessageCircle, Phone, MapPin, Home, Sparkles } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0E2A21] text-white pt-8 pb-16 lg:py-24">
      {/* Background Subtle Mandala / Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Grand Website Brand Name */}
            <div className="space-y-1.5 pb-1">
              <div className="flex items-center gap-3">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#D4AF37] leading-none drop-shadow-sm">
                  AyushKaya
                </span>
                <span className="hidden sm:inline-block px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FBF9F4] text-xs font-semibold rounded-full uppercase tracking-wider">
                  Panchkarma Center
                </span>
              </div>
              <p className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-[#A7F3D0]">
                Panchkarma Therapies · Sainipuram, Roorkee
              </p>
            </div>

            {/* Trust markers (Region & Home Delivery) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold tracking-wider uppercase text-[#D4AF37]">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {BRAND.location}
              </span>
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-[#059669]/25 text-[#A7F3D0] rounded-full border border-[#059669]/40 backdrop-blur-sm">
                <Home className="w-3.5 h-3.5" />
                Home Therapy Available
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FBF9F4] leading-[1.15] text-balance">
              Traditional Ayurvedic Therapies.{' '}
              <span className="text-[#D4AF37] italic font-normal">Personalized Care.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#E2EBE4] leading-relaxed max-w-2xl font-light">
              Explore traditional Panchkarma and Ayurvedic wellness therapies with personalized care at AyushKaya. Conducted by practitioner <strong className="text-white font-medium">{BRAND.practitioner}</strong> with pure classical oils and time-honored methods.
            </p>

            {/* Primary Action Suite */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary CTA */}
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 text-sm font-bold text-[#0E2A21] bg-[#D4AF37] hover:bg-[#E5C158] active:scale-95 rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap min-h-[46px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Session</span>
              </button>

              <a
                href="#health-tracking"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all min-h-[46px]"
              >
                <span>Personalized Health Tracker</span>
                <span>→</span>
              </a>

              <a
                href="#therapies"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#A7F3D0] hover:text-white px-2 py-2 transition-colors"
              >
                <span>24 Therapies</span>
                <span>↓</span>
              </a>
            </div>

            {/* Quick Reassurance */}
            <div className="pt-3 flex items-center gap-4 text-xs text-[#A7B9AF]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                24 Classical Therapies
              </span>
              <span>·</span>
              <span>Direct Practitioner Care</span>
              <span>·</span>
              <span>Roorkee & Vicinity</span>
            </div>

          </div>

          {/* Right Column: High-Quality Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/30 to-[#059669]/30 rounded-3xl blur-md opacity-70" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-[#163D31]">
                <img
                  src={BRAND.images.hero}
                  alt="Authentic Ayurvedic therapy sanctuary with traditional brass Shirodhara vessel, wooden table and herbal oils"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('/images/')) {
                      target.src = '/images/hero_ayurveda_panchkarma_1791120408611.jpg';
                    }
                  }}
                />

                {/* Scrim Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A21]/90 via-[#0E2A21]/20 to-transparent pointer-events-none" />

                {/* Floating Image Feature Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0E2A21]/80 backdrop-blur-md rounded-xl border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Classical Panchkarma
                      </p>
                      <p className="text-sm font-medium text-white">
                        Sainipuram Sanctuary & Home Care
                      </p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 bg-[#059669] text-white rounded-md shrink-0">
                      Authentic Oils
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
