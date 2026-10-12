import React from 'react';
import { X, Calendar, MessageCircle, Clock, Sparkles, Check } from 'lucide-react';
import { Therapy, BRAND } from '../data/ayushkayaData';

interface TherapyDetailModalProps {
  therapy: Therapy | null;
  onClose: () => void;
  onBook: (therapyName: string) => void;
}

export const TherapyDetailModal: React.FC<TherapyDetailModalProps> = ({
  therapy,
  onClose,
  onBook,
}) => {
  if (!therapy) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste AyushKaya, I would like to inquire about the ${therapy.name} (${therapy.sanskritName || ''}) therapy session.`
    );
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#0E2A21]/20 my-8 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual or Banner */}
        <div className="relative bg-[#13382C] text-white p-6 sm:p-8">
          {therapy.image && (
            <div className="absolute inset-0 opacity-25">
              <img
                src={therapy.image}
                alt={therapy.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                #{therapy.number}
              </span>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{therapy.categoryLabel}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {therapy.sessionDuration}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F4]">
              {therapy.name}
            </h2>

            {therapy.sanskritName && (
              <p className="font-serif text-sm text-[#D4AF37] font-medium">
                {therapy.sanskritName}
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#2C3E34]">
          
          {/* Quick Target & Dosha Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {therapy.bodyTarget && (
              <div className="p-3 bg-[#F5F0E8] rounded-xl border border-black/5 text-xs">
                <span className="text-[10px] font-bold text-[#8C6B1B] uppercase tracking-wider block mb-0.5">
                  Target Anatomical Focus
                </span>
                <span className="font-semibold text-[#0E2A21]">{therapy.bodyTarget}</span>
              </div>
            )}
            {therapy.doshaBalancing && (
              <div className="p-3 bg-[#F5F0E8] rounded-xl border border-black/5 text-xs">
                <span className="text-[10px] font-bold text-[#8C6B1B] uppercase tracking-wider block mb-0.5">
                  Ayurvedic Energetics
                </span>
                <span className="font-semibold text-[#059669]">{therapy.doshaBalancing}</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-serif text-base font-bold text-[#0E2A21] mb-2 uppercase tracking-wide">
              Therapy Overview & Procedure
            </h3>
            <p className="text-sm text-[#465A4F] leading-relaxed">
              {therapy.description}
            </p>
          </div>

          {/* Suitability Points */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#0E2A21] mb-2 uppercase tracking-wide">
              Key Focus Areas & Comfort
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {therapy.suitableFor.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-2.5 bg-[#F5F0E8] rounded-xl text-xs text-[#0E2A21]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practitioner Note */}
          <div className="p-4 bg-[#FBF9F4] rounded-2xl border border-[#0E2A21]/10 text-xs text-[#5C6F63] space-y-1">
            <p className="font-semibold text-[#0E2A21]">
              Conducted by Practitioner {BRAND.practitioner}
            </p>
            <p>
              Available at our Sainipuram clinic and as a Home Therapy session across Roorkee. Each session is individually calibrated to your tolerance and comfort.
            </p>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-6 bg-[#F5F0E8] border-t border-[#0E2A21]/10 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0E2A21] bg-white hover:bg-[#0E2A21] hover:text-white rounded-xl border border-[#0E2A21]/20 transition-all min-h-[42px]"
          >
            <MessageCircle className="w-4 h-4 text-[#059669]" />
            <span>Inquire on WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onBook(therapy.name);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-md transition-all min-h-[42px]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Therapy</span>
          </button>
        </div>

      </div>
    </div>
  );
};
