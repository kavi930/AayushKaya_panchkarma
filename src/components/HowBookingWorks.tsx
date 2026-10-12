import React from 'react';
import { ArrowRight, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { HOW_BOOKING_WORKS, BRAND } from '../data/ayushkayaData';

interface HowBookingWorksProps {
  onOpenBooking: () => void;
}

export const HowBookingWorks: React.FC<HowBookingWorksProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 bg-[#FBF9F4] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            Seamless Process
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            How Booking Works
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Four simple steps from your first inquiry to your authentic Ayurvedic therapy session.
          </p>
        </div>

        {/* 4-Step Process Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_BOOKING_WORKS.map((item, index) => (
            <div
              key={item.step}
              className="bg-white p-6 rounded-2xl border border-[#0E2A21]/10 shadow-sm flex flex-col justify-between relative group hover:border-[#059669]/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-full bg-[#13382C] text-[#D4AF37] font-serif font-bold text-sm flex items-center justify-center shadow">
                    {item.step}
                  </span>
                  {index < HOW_BOOKING_WORKS.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-[#D4AF37]" />
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0E2A21] group-hover:text-[#059669] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#465A4F] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#0E2A21]/5 text-[11px] font-semibold text-[#059669]">
                Step {item.step} of 04
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
