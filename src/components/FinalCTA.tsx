import React from 'react';
import { Calendar, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 bg-[#0E2A21] text-white relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D4AF37] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          Authentic Panchkarma in Roorkee
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF9F4] tracking-tight text-balance">
          Ready to Book Your Session?
        </h2>

        <p className="text-base sm:text-lg text-[#C5D5CC] max-w-2xl mx-auto leading-relaxed font-light">
          Experience classical Ayurvedic wellness with personalized care by practitioner A.K. Goswami at Sainipuram, Roorkee or in the comfort of your home.
        </p>

        {/* Single Focused Button */}
        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold text-[#0E2A21] bg-[#D4AF37] hover:bg-[#E5C158] active:scale-95 rounded-xl shadow-lg hover:shadow-xl transition-all min-h-[50px]"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Session</span>
          </button>
        </div>

        <p className="text-xs text-[#8FA395] pt-2">
          Open Monday through Sunday · 8:00 AM to 8:00 PM · Sainipuram & Home Visits
        </p>

      </div>
    </section>
  );
};
