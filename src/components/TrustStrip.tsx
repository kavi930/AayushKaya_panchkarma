import React from 'react';
import { Leaf, UserCheck, Home, MessageCircle } from 'lucide-react';
import { TRUST_POINTS } from '../data/ayushkayaData';

export const TrustStrip: React.FC = () => {
  const icons = [Leaf, UserCheck, Home, MessageCircle];

  return (
    <section className="bg-[#13382C] text-[#FBF9F4] border-y border-[#D4AF37]/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_POINTS.map((item, idx) => {
            const Icon = icons[idx] || Leaf;
            return (
              <div 
                key={item.title}
                className="flex items-start gap-3.5 group p-2 rounded-xl transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#D4AF37] group-hover:bg-[#059669] group-hover:text-white group-hover:border-[#059669] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#FBF9F4] group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#C5D5CC] mt-0.5 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
