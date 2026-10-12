import React from 'react';
import { Calendar, MessageCircle, Phone, Award, ShieldCheck, User, Sparkles } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

interface PractitionerSectionProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const PractitionerSection: React.FC<PractitionerSectionProps> = ({
  onOpenBooking,
  onOpenChat,
}) => {
  return (
    <section id="practitioner" className="py-20 bg-[#FBF9F4] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            Dedicated Guidance
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Meet Your Practitioner
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Experience traditional Panchkarma therapies performed with mindful attention and personal consultation.
          </p>
        </div>

        {/* Practitioner Feature Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#0E2A21]/10 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left: Practitioner Photograph Slot / Placeholder */}
            <div className="md:col-span-5 bg-[#13382C] relative min-h-[320px] md:min-h-full flex items-center justify-center p-8 overflow-hidden">
              {BRAND.images.practitioner ? (
                <img
                  src={BRAND.images.practitioner}
                  alt={BRAND.practitioner}
                  className="w-full h-full object-cover object-top absolute inset-0"
                  loading="lazy"
                />
              ) : (
                <div className="text-center relative z-10 space-y-4">
                  <div className="w-28 h-28 mx-auto rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-inner">
                    <User className="w-14 h-14" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#FBF9F4]">
                      {BRAND.practitioner}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
                      {BRAND.practitionerTitle}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#A7B9AF] max-w-xs mx-auto leading-relaxed italic">
                    Original practitioner portrait & documentation asset can be swapped easily in data config.
                  </p>
                </div>
              )}

              {/* Decorative Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A21] via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Right: Practitioner Profile & Direct Actions */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
                    AyushKaya Practitioner
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#0E2A21] mt-1">
                    {BRAND.practitioner}
                  </h3>
                  <p className="text-sm font-medium text-[#059669]">
                    Sainipuram, Roorkee · Home Therapy Available
                  </p>
                </div>

                <p className="text-sm text-[#465A4F] leading-relaxed">
                  {BRAND.practitionerBio}
                </p>

                {/* Qualifications & Credentials Note */}
                <div className="bg-[#F5F0E8] p-4 rounded-xl border border-[#0E2A21]/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0E2A21] uppercase tracking-wide">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span>Practitioner Credentials & Verification</span>
                  </div>
                  <p className="text-xs text-[#5C6F63] leading-relaxed">
                    {BRAND.qualificationsNote}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#059669] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct personal consultations prior to therapy</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#0E2A21] hover:bg-[#163D31] active:scale-95 rounded-xl shadow transition-all min-h-[44px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Request Consultation with A.K. Goswami</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
