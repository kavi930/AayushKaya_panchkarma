import React, { useState } from 'react';
import { Calendar, Phone, MessageCircle, User, CheckCircle2, Home, Clock } from 'lucide-react';
import { THERAPIES, BRAND } from '../data/ayushkayaData';

interface BookingSectionProps {
  initialTherapyName?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialTherapyName = '',
  isModal = false,
  onCloseModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    therapy: initialTherapyName || 'Kati Basti',
    preferredDate: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    isHomeTherapy: false,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    whatsappLink: string;
    therapy: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Time slot options
  const timeSlots = [
    'Morning (8 AM - 11 AM)',
    'Midday (11 AM - 2 PM)',
    'Afternoon (2 PM - 5 PM)',
    'Evening (5 PM - 8 PM)',
    'Flexible Time',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMsg('Please provide a valid 10-digit phone number.');
      return;
    }
    if (!formData.therapy) {
      setErrorMsg('Please select a therapy.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      setConfirmedBooking({
        id: data.booking.id,
        whatsappLink: data.whatsappLink,
        therapy: data.booking.therapy,
      });
    } catch (err: any) {
      console.error('Booking error:', err);
      setErrorMsg(err.message || 'Unable to submit booking. You can book directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const waText = encodeURIComponent(
      `*AyushKaya Therapy Inquiry*\n\n` +
      `*Name:* ${formData.name || 'Not provided'}\n` +
      `*Phone:* ${formData.phone || 'Not provided'}\n` +
      `*Therapy:* ${formData.therapy}\n` +
      `*Session Type:* ${formData.isHomeTherapy ? 'Home Therapy (Roorkee)' : 'Clinic (Sainipuram, Roorkee)'}\n` +
      `*Preferred Date:* ${formData.preferredDate || 'Flexible'}\n` +
      `*Preferred Time:* ${formData.preferredTime}\n` +
      (formData.message ? `*Notes:* ${formData.message}\n` : '') +
      `\nPlease check practitioner calendar availability and confirm my session.`
    );
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${waText}`, '_blank');
  };

  const content = (
    <div className="space-y-6">
      
      {confirmedBooking ? (
        <div className="bg-[#13382C] text-white p-8 rounded-2xl border border-[#D4AF37]/30 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#059669] flex items-center justify-center text-white shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F4]">
            Booking Request Received!
          </h3>

          <div className="bg-white/10 p-4 rounded-xl max-w-sm mx-auto text-xs text-[#D8E6DE] space-y-1">
            <p><strong>Reference ID:</strong> {confirmedBooking.id}</p>
            <p><strong>Selected Therapy:</strong> {confirmedBooking.therapy}</p>
            <p className="text-[#D4AF37] pt-1">
              Practitioner A.K. Goswami is checking calendar availability.
            </p>
          </div>

          <p className="text-xs text-[#C5D5CC] max-w-md mx-auto leading-relaxed">
            Your request has been registered. To accelerate instant confirmation, click below to ping practitioner A.K. Goswami on WhatsApp with your reference ID.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={confirmedBooking.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp Now</span>
            </a>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                if (onCloseModal) onCloseModal();
              }}
              className="px-5 py-3 text-xs font-medium text-white/80 hover:text-white bg-white/10 rounded-xl"
            >
              Done / Book Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#0E2A21] uppercase tracking-wide mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C6B1B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#0E2A21]/20 rounded-xl text-sm text-[#0E2A21] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#0E2A21] uppercase tracking-wide mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C6B1B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#0E2A21]/20 rounded-xl text-sm text-[#0E2A21] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>
          </div>

          {/* Therapy Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#0E2A21] uppercase tracking-wide mb-1.5">
              Select Therapy *
            </label>
            <select
              value={formData.therapy}
              onChange={(e) => setFormData({ ...formData, therapy: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#0E2A21]/20 rounded-xl text-sm text-[#0E2A21] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            >
              <optgroup label="Basti Therapies (1 to 8)">
                {THERAPIES.filter((t) => t.category === 'basti').map((t) => (
                  <option key={t.id} value={t.name}>
                    #{t.number} {t.name} ({t.sessionDuration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Head & Senses (9 to 11, 21 to 24)">
                {THERAPIES.filter((t) => t.category === 'head').map((t) => (
                  <option key={t.id} value={t.name}>
                    #{t.number} {t.name} ({t.sessionDuration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Swedana / Compresses (12 to 14)">
                {THERAPIES.filter((t) => t.category === 'swedana').map((t) => (
                  <option key={t.id} value={t.name}>
                    #{t.number} {t.name} ({t.sessionDuration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Ayurvedic Massages (16 to 18)">
                {THERAPIES.filter((t) => t.category === 'massage').map((t) => (
                  <option key={t.id} value={t.name}>
                    #{t.number} {t.name} ({t.sessionDuration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Specialized Detox (15, 19, 20)">
                {THERAPIES.filter((t) => t.category === 'specialized').map((t) => (
                  <option key={t.id} value={t.name}>
                    #{t.number} {t.name} ({t.sessionDuration})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Date & Time Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0E2A21] uppercase tracking-wide mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#8C6B1B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#0E2A21]/20 rounded-xl text-sm text-[#0E2A21] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0E2A21] uppercase tracking-wide mb-1.5">
                Preferred Time Slot
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#8C6B1B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#0E2A21]/20 rounded-xl text-sm text-[#0E2A21] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Home Therapy Checkbox */}
          <div className="p-3.5 bg-[#F5F0E8] rounded-xl border border-[#0E2A21]/10 flex items-start gap-3">
            <input
              type="checkbox"
              id="homeTherapyCheckbox"
              checked={formData.isHomeTherapy}
              onChange={(e) => setFormData({ ...formData, isHomeTherapy: e.target.checked })}
              className="mt-1 h-4 w-4 rounded text-[#059669] focus:ring-[#059669] border-[#0E2A21]/20"
            />
            <label htmlFor="homeTherapyCheckbox" className="text-xs text-[#2C3E34] cursor-pointer">
              <strong className="text-[#0E2A21] flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-[#059669]" />
                Request Home Therapy in Roorkee Area
              </strong>
              <span>
                Practitioner A.K. Goswami brings required therapeutic oils & equipment to your residence.
              </span>
            </label>
          </div>

          {/* Notes / Message */}
          <div>
            <label className="block text-xs font-semibold text-[#0E2A21] uppercase tracking-wide mb-1.5">
              Specific Area of Focus or Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Lower back stiffness for 2 weeks, preference for gentle pressure..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#0E2A21]/20 rounded-xl text-sm text-[#0E2A21] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
            />
          </div>

          {/* Submission Action Trio - The ONE dedicated contact & booking hub */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Option 1: Request Booking */}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#0E2A21] hover:bg-[#163D31] active:scale-[0.98] rounded-xl shadow-md transition-all disabled:opacity-50 min-h-[46px]"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>{loading ? 'Submitting Request...' : 'Book Session Online'}</span>
              </button>

              {/* Option 2: WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] active:scale-[0.98] rounded-xl shadow-md transition-all min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book via WhatsApp</span>
              </button>
            </div>

            {/* Option 3: Call Directly */}
            <div className="text-center pt-1">
              <a
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E2A21] hover:text-[#059669] py-1 px-3 rounded-lg hover:bg-[#0E2A21]/5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#059669]" />
                <span>Prefer to call directly? Call {BRAND.phoneFormatted}</span>
              </a>
            </div>
          </div>

          <p className="text-[11px] text-[#6B7E73] text-center italic">
            * Note: Session dates and times are verified with practitioner A.K. Goswami before confirmation. No advance payment required.
          </p>

        </form>
      )}

    </div>
  );

  if (isModal) {
    return content;
  }

  return (
    <section id="booking" className="py-20 bg-[#FBF9F4] border-b border-[#0E2A21]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6B1B]">
            Direct Scheduling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Schedule Your Therapy
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Reserve your session at our Sainipuram clinic or request home therapy in Roorkee.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#0E2A21]/10 shadow-xl">
          {content}
        </div>

      </div>
    </section>
  );
};
