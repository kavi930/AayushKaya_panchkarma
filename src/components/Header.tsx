import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, Menu, X } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

interface HeaderProps {
  onOpenBooking: (therapyName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: '24 Therapies', href: '#therapies' },
    { label: 'Health Tracking', href: '#health-tracking' },
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Location', href: '#location' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/98 backdrop-blur-md border-b border-[#0E2A21]/15 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-28">
          
          {/* Zone 1: Large prominent wordmark in serif font */}
          <a href="#home" className="group flex flex-col justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] py-1">
            <span className="font-serif text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-[#0E2A21] group-hover:text-[#059669] transition-colors leading-[1.05]">
              AyushKaya
            </span>
            <span className="text-[12px] sm:text-[13px] tracking-[0.22em] uppercase font-semibold text-[#8C6B1B] mt-0.5">
              Panchkarma Therapies
            </span>
          </a>

          {/* Zone 2: 4–6 clean nav links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-[#2C3E34]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#059669] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#059669] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single primary action CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0E2A21] hover:bg-[#163D31] active:scale-95 rounded-xl shadow-sm transition-all whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Book Session</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3.5 py-2 text-xs font-bold text-white bg-[#0E2A21] rounded-lg shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0E2A21] hover:bg-[#0E2A21]/5 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F4] border-b border-[#0E2A21]/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#2C3E34] hover:bg-[#0E2A21]/5 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#0E2A21]/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-[#0E2A21] rounded-xl shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book a Session</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
