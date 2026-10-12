import React from 'react';
import { 
  Sparkles, 
  Flame, 
  UserCheck, 
  Home, 
  PhoneCall, 
  CalendarCheck, 
  MapPin 
} from 'lucide-react';
import { WHY_AYUSHKAYA } from '../data/ayushkayaData';

export const WhyAyushKaya: React.FC = () => {
  const cardIcons = [
    Flame,
    UserCheck,
    Home,
    PhoneCall,
    CalendarCheck,
    MapPin,
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F5F0E8] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            Why Choose AyushKaya
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Distinguished by Authenticity & Care
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Discover why residents in Roorkee trust AyushKaya for their restorative Panchkarma therapies and regular wellness routines.
          </p>
        </div>

        {/* Six Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_AYUSHKAYA.map((item, index) => {
            const Icon = cardIcons[index] || Sparkles;
            return (
              <div
                key={item.title}
                className="bg-white p-7 rounded-2xl border border-[#0E2A21]/10 hover:border-[#059669]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon & Index Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0E2A21]/5 border border-[#0E2A21]/10 flex items-center justify-center text-[#059669] group-hover:bg-[#059669] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-lg font-bold text-[#D4AF37]/70">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-[#0E2A21] group-hover:text-[#059669] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#465A4F] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#0E2A21]/5 text-[11px] font-semibold text-[#8C6B1B] uppercase tracking-wider">
                  AyushKaya Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
