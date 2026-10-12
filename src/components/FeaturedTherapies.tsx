import React from 'react';
import { Calendar, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { THERAPIES, Therapy } from '../data/ayushkayaData';

interface FeaturedTherapiesProps {
  onSelectTherapy: (therapy: Therapy) => void;
  onBookTherapy: (therapyName: string) => void;
}

export const FeaturedTherapies: React.FC<FeaturedTherapiesProps> = ({
  onSelectTherapy,
  onBookTherapy,
}) => {
  const featured = THERAPIES.filter((t) => t.isFeatured);

  return (
    <section id="featured" className="py-20 bg-[#F5F0E8] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Offerings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Featured Panchkarma Therapies
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Time-honored procedures curated for deep rejuvenation, musculoskeletal comfort, and harmonious mental calm.
          </p>
        </div>

        {/* 6 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((therapy) => (
            <div
              key={therapy.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#0E2A21]/10 transition-all duration-300 flex flex-col group"
            >
              {/* Image / Visual Header */}
              <div className="relative aspect-[16/10] bg-[#163D31] overflow-hidden">
                {therapy.image ? (
                  <img
                    src={therapy.image}
                    alt={therapy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#13382C] to-[#0E2A21] p-6 text-center">
                    <span className="font-serif text-3xl text-[#D4AF37] font-medium tracking-wide">
                      {therapy.sanskritName || therapy.name}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#A7F3D0] mt-2 font-medium">
                      {therapy.categoryLabel}
                    </span>
                  </div>
                )}

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Tag */}
                {therapy.tag && (
                  <div className="absolute top-3 left-3 bg-[#0E2A21]/80 backdrop-blur-md border border-white/20 text-[#D4AF37] text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {therapy.tag}
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white/90 text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  <span>{therapy.sessionDuration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl font-bold text-[#0E2A21] group-hover:text-[#059669] transition-colors">
                      {therapy.name}
                    </h3>
                    {therapy.sanskritName && (
                      <span className="text-xs font-serif text-[#8C6B1B] shrink-0 font-medium">
                        {therapy.sanskritName}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#465A4F] leading-relaxed line-clamp-3">
                    {therapy.shortDesc}
                  </p>

                  {/* Suitability Pills (Clean Text / Dots) */}
                  <div className="pt-2 flex flex-wrap gap-1.5 text-xs text-[#2C3E34]">
                    {therapy.suitableFor.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="bg-[#F5F0E8] text-[#13382C] px-2 py-0.5 rounded text-[11px] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#0E2A21]/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectTherapy(therapy)}
                    className="text-xs font-semibold text-[#0E2A21] hover:text-[#059669] inline-flex items-center gap-1 group/btn transition-colors"
                  >
                    <span>Learn Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onBookTherapy(therapy.name)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] active:scale-95 rounded-lg shadow-sm transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Session</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
