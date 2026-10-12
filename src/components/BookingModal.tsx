import React from 'react';
import { X } from 'lucide-react';
import { BookingSection } from './BookingSection';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTherapyName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedTherapyName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#0E2A21]/20 my-8 relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0E2A21] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              AyushKaya Appointments
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF9F4]">
              Book Your Therapy Session
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <BookingSection
            isModal={true}
            initialTherapyName={selectedTherapyName}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
};
