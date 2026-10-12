import React from 'react';
import { HeartHandshake, ShieldCheck, Sparkles, Droplets } from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F5F0E8] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
              <Sparkles className="w-3.5 h-3.5" />
              Philosophy of Care
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight leading-tight">
              Rooted in Classical Tradition. Dedicated to Individual Equilibrium.
            </h2>

            <div className="space-y-4 text-base text-[#3E5246] leading-relaxed font-light">
              <p>
                At <strong className="text-[#0E2A21] font-semibold">AyushKaya</strong>, we practice Ayurveda as an authentic living tradition. Originating thousands of years ago, classical Panchkarma views each human constitution as a unique balance of biological energies (doshas). When daily stress, physical wear, or seasonal transitions accumulate, traditional therapies help gently coax the body back toward natural harmony.
              </p>
              <p>
                Rather than assembly-line treatments, every session at AyushKaya is conducted with singular dedication. From calibrated herbal oil temperatures to the manual precision of traditional dough reservoirs (basti) and steaming herbal leaf poultices (potli), procedures are carried out with patient dignity and patient-centered pacing.
              </p>
              <p>
                Whether you visit our peaceful sanctuary in Sainipuram, Roorkee or invite us to provide home therapy in your own private sanctuary, you receive direct, personalized care without compromise.
              </p>
            </div>

            {/* Classical Principles Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white p-4 rounded-xl border border-[#0E2A21]/10 shadow-sm">
                <Droplets className="w-5 h-5 text-[#059669] mb-2" />
                <h3 className="font-serif text-base font-bold text-[#0E2A21]">Authentic Medicated Oils</h3>
                <p className="text-xs text-[#465A4F] mt-1">
                  Classical herbal decoctions prepared in cold-pressed sesame and herbal bases.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#0E2A21]/10 shadow-sm">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37] mb-2" />
                <h3 className="font-serif text-base font-bold text-[#0E2A21]">Personalized Attention</h3>
                <p className="text-xs text-[#465A4F] mt-1">
                  Attuned to your tolerance, physical posture, and daily comfort levels.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#0E2A21]/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#059669] mb-2" />
                <h3 className="font-serif text-base font-bold text-[#0E2A21]">Ethical & Grounded</h3>
                <p className="text-xs text-[#465A4F] mt-1">
                  Transparent expectations without exaggerated medical claims or false promises.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Traditional Visual Quote Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0E2A21] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border border-[#D4AF37]/30">
              
              {/* Background Motif */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <span className="font-serif text-5xl text-[#D4AF37] leading-none block">“</span>
                
                <blockquote className="font-serif text-xl sm:text-2xl text-[#FBF9F4] italic leading-snug">
                  स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनं च।
                </blockquote>

                <p className="text-sm text-[#D8E6DE] leading-relaxed font-light">
                  “To protect and sustain the equilibrium of the healthy, and gently ease distress in those seeking comfort.”
                </p>

                <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-[#A7B9AF]">
                  <div>
                    <p className="text-white font-semibold">Ayurvedic Core Tenet</p>
                    <p>Charaka Samhita</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D4AF37] font-semibold">AyushKaya</p>
                    <p>{BRAND.location}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
