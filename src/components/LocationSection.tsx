import React from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Home, Sparkles, Clock } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

export const LocationSection: React.FC = () => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Sainipuram, Roorkee, Uttarakhand')}`;

  return (
    <section id="location" className="py-20 bg-[#F5F0E8] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            <Sparkles className="w-3.5 h-3.5" />
            Accessible Wellness
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Find AyushKaya
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Visit our serene Panchkarma center in Sainipuram, Roorkee or request home sessions across the city.
          </p>
        </div>

        {/* Location Details + Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Clinic Information & CTAs */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#0E2A21]/10 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
                  Panchkarma Sanctuary
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0E2A21] mt-1">
                  AyushKaya Therapy Center
                </h3>
              </div>

              {/* Address card */}
              <div className="flex items-start gap-3 p-4 bg-[#FBF9F4] rounded-2xl border border-[#0E2A21]/10">
                <MapPin className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-[#2C3E34]">
                  <p className="font-bold text-[#0E2A21] text-sm">Sainipuram, Roorkee</p>
                  <p>Haridwar District, Uttarakhand, India</p>
                  <p className="text-[#8C6B1B] mt-1">Contact: {BRAND.practitioner}</p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 p-4 bg-[#FBF9F4] rounded-2xl border border-[#0E2A21]/10">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-[#2C3E34]">
                  <p className="font-bold text-[#0E2A21] text-sm">Therapy Hours</p>
                  <p>Monday – Sunday: 8:00 AM – 8:00 PM</p>
                  <p className="text-[#059669] font-medium mt-1">Sessions by Appointment</p>
                </div>
              </div>

              {/* Home therapy coverage badge */}
              <div className="flex items-start gap-3 p-4 bg-[#0E2A21]/5 rounded-2xl border border-[#059669]/30">
                <Home className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-[#2C3E34]">
                  <p className="font-bold text-[#0E2A21]">Home Therapy Service</p>
                  <p className="text-[#465A4F]">
                    {BRAND.homeTherapyNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 text-xs font-bold text-white bg-[#0E2A21] hover:bg-[#163D31] active:scale-95 rounded-xl shadow transition-all min-h-[46px]"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Embedded Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#0E2A21]/10 overflow-hidden shadow-sm flex flex-col min-h-[380px] relative">
            {/* Embedded OpenStreetMap view centered on Roorkee / Sainipuram area */}
            <iframe
              title="AyushKaya Location Map in Sainipuram Roorkee"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.8500%2C29.8300%2C77.9300%2C29.8800&amp;layer=mapnik&amp;marker=29.8543%2C77.8880"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
            />
            
            {/* Overlay Banner */}
            <div className="p-3 bg-white/95 backdrop-blur-sm border-t border-[#0E2A21]/10 flex flex-wrap items-center justify-between text-xs text-[#2C3E34] px-5">
              <span className="font-semibold text-[#0E2A21]">
                📍 Sainipuram, Roorkee (Uttarakhand)
              </span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#059669] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Google Maps App</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
