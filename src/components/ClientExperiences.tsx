import React, { useState } from 'react';
import { Quote, Sparkles, CheckCircle, Home, Building2, MapPin } from 'lucide-react';
import { CLIENT_EXPERIENCES, ClientExperience } from '../data/ayushkayaData';

export const ClientExperiences: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'clinic' | 'home'>('all');

  const filtered = CLIENT_EXPERIENCES.filter((exp) => {
    if (filter === 'clinic') return exp.sessionType === 'Clinic Session';
    if (filter === 'home') return exp.sessionType === 'Home Therapy';
    return true;
  });

  return (
    <section id="experiences" className="py-20 bg-[#FBF9F4] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            Social Proof & Trust
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Client Experiences
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed font-light">
            Read authentic feedback from individuals in Roorkee who have experienced personalized care, traditional dough reservoirs, and warm herbal compress therapies with A.K. Goswami.
          </p>

          {/* Interactive Filter Controls */}
          <div className="pt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-[#0E2A21] text-white shadow-xs'
                  : 'bg-white text-[#465A4F] hover:text-[#0E2A21] border border-[#0E2A21]/10'
              }`}
            >
              All Experiences ({CLIENT_EXPERIENCES.length})
            </button>
            <button
              onClick={() => setFilter('clinic')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'clinic'
                  ? 'bg-[#0E2A21] text-white shadow-xs'
                  : 'bg-white text-[#465A4F] hover:text-[#0E2A21] border border-[#0E2A21]/10'
              }`}
            >
              Clinic Sessions
            </button>
            <button
              onClick={() => setFilter('home')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'home'
                  ? 'bg-[#0E2A21] text-white shadow-xs'
                  : 'bg-white text-[#465A4F] hover:text-[#0E2A21] border border-[#0E2A21]/10'
              }`}
            >
              Home Therapy
            </button>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item: ClientExperience) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-[#0E2A21]/10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#059669]/30"
            >
              <div className="space-y-4">
                
                {/* Top Metatag Row */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#0E2A21]/5">
                  <span className="inline-flex items-center gap-1 font-medium text-[#059669]">
                    {item.sessionType === 'Home Therapy' ? (
                      <Home className="w-3.5 h-3.5" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5" />
                    )}
                    {item.sessionType}
                  </span>
                  <span className="text-[#8C6B1B] text-[11px] font-medium">
                    {item.durationTreated}
                  </span>
                </div>

                {/* Quote Symbol & Content */}
                <div className="space-y-2">
                  <Quote className="w-6 h-6 text-[#D4AF37]/50" />
                  <p className="text-sm text-[#2C3E34] leading-relaxed italic font-light">
                    “{item.quote}”
                  </p>
                </div>

                {/* Outcome Highlight Callout */}
                <div className="p-3 bg-[#FBF9F4] rounded-xl border border-[#0E2A21]/5 text-xs text-[#13382C] space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6B1B] block">
                    Observed Outcome
                  </span>
                  <p className="font-medium text-[#0E2A21]">
                    {item.outcomeHighlight}
                  </p>
                </div>

              </div>

              {/* Reviewer Attribution Footer */}
              <div className="pt-4 mt-5 border-t border-[#0E2A21]/5 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0E2A21]">
                    {item.clientName}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#5C6F63] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#8C6B1B] shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] font-semibold text-[#0E2A21] bg-[#F5F0E8] px-2 py-0.5 rounded">
                    {item.therapyName}
                  </span>
                  <span className="block text-[10px] text-[#7C8F83] mt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Quiet Trust Adjacency Note */}
        <div className="mt-12 text-center text-xs text-[#5C6F63] max-w-xl mx-auto flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
          <span>
            Reflecting genuine patient feedback gathered following completed Panchkarma courses in Roorkee.
          </span>
        </div>

      </div>
    </section>
  );
};
