import React from 'react';
import { Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#091D17] text-[#C5D5CC] border-t border-white/10 pt-16 pb-24 lg:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                AyushKaya
              </h3>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mt-1">
                Panchkarma Therapies
              </p>
            </div>
            <p className="text-[#8FA395] leading-relaxed font-light">
              Traditional Ayurvedic wellness, classical oil therapies, and personalized healing care in Sainipuram, Roorkee and at your residence.
            </p>
            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 bg-white/5 rounded-md text-[11px] text-[#A7F3D0]">
                Home Therapy Available in Roorkee
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#therapies" className="hover:text-[#D4AF37] transition-colors">
                  All 24 Therapies
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#D4AF37] transition-colors">
                  Featured Modalities
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                  About & Philosophy
                </a>
              </li>
              <li>
                <a href="#practitioner" className="hover:text-[#D4AF37] transition-colors">
                  Practitioner Profile
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#D4AF37] transition-colors">
                  Client Experiences
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D4AF37] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Practitioner */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Practitioner & Clinic
            </h4>
            <div className="space-y-2.5">
              <p className="text-white font-medium">
                Practitioner: {BRAND.practitioner}
              </p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BRAND.location}, Haridwar District, Uttarakhand</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#059669] shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-white transition-colors">
                  {BRAND.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#059669] shrink-0" />
                <a 
                  href={`https://wa.me/${BRAND.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 {BRAND.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Ethical Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Care Philosophy & Disclaimer
            </h4>
            <p className="text-[#8FA395] leading-relaxed">
              AyushKaya offers traditional Ayurvedic wellness and rejuvenation therapies. Therapies are designed to support natural bodily equilibrium, relaxation, and tissue comfort. Content on this website is for educational and appointment coordination purposes.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6B7E73]">
          <p>
            © {new Date().getFullYear()} AyushKaya – Panchkarma Therapies. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#home" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#location" className="hover:text-white transition-colors">
              Contact & Location
            </a>
            <span className="flex items-center gap-1 text-[#D4AF37]">
              Sainipuram, Roorkee
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
