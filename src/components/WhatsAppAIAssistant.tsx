import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Calendar, 
  MapPin, 
  Sparkles, 
  UserCheck, 
  ExternalLink 
} from 'lucide-react';
import { BRAND } from '../data/ayushkayaData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface WhatsAppAIAssistantProps {
  onOpenBooking: (therapyName?: string) => void;
}

export const WhatsAppAIAssistant: React.FC<WhatsAppAIAssistantProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const initialMessages: Message[] = [
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Namaste! Welcome to AyushKaya – Panchkarma Therapies in Sainipuram, Roorkee. I am your wellness assistant. How may I assist you with our 24 classical therapies, home sessions, or consultation with practitioner A.K. Goswami?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickReplies = [
    { label: 'All 24 Therapies', query: 'Can you list and explain the 24 therapies available at AyushKaya?' },
    { label: 'Health Tracking', query: 'How does the personalized Ayurvedic health tracking work?' },
    { label: 'Kati & Janu Basti', query: 'Tell me about #1 Kati Basti and #2 Janu Basti for back and knee care.' },
    { label: 'Shirodhara & Sleep', query: 'What are the benefits of #11 Shirodhara for stress and deep sleep?' },
    { label: 'Home Therapy (Roorkee)', query: 'Is home therapy available in Roorkee and how does it work?' },
    { label: 'Book with A.K. Goswami', query: 'I want to schedule an appointment with practitioner A.K. Goswami.' },
  ];

  const getClientSideSmartAnswer = (text: string) => {
    const q = text.toLowerCase();
    if (q.includes('24') || q.includes('therap') || q.includes('list')) {
      return `Namaste! AyushKaya offers 24 classical Ayurvedic therapies:
1. Kati Basti (lower back) • 2. Janu Basti (knee joints) • 3. Griva Basti (cervical neck) • 4. Nabhi Basti (gut core) • 5. Prasth Basti (mid-spine) • 6. Liver Basti • 7. Lung Basti • 8. Shiro Basti • 9. Shiro Abhyang • 10. Shiro Pichu • 11. Shirodhara • 12. Hot Cold Compress • 13. Patar Potli Pind Swedan • 14. Sristhisali Pind Swedan • 15. Fire Cupping • 16. Full Body Massage • 17. Parsal Massage • 18. Abhyang • 19. Leech Therapy • 20. Shiringi Therapy • 21. Nasya • 22. Karandhupan • 23. Karanpuran • 24. Akshi Tarpan. Both Sainipuram clinic & home visits in Roorkee are available!`;
    }
    if (q.includes('track') || q.includes('dosha') || q.includes('health')) {
      return `Our Personalized Health Tracker lets you assess your dominant Dosha (Vata, Pitta, Kapha), log daily pain/stiffness scores (1-10), track digestion & sleep, and match with the 24 therapies. You can access it directly in the Health Tracking section!`;
    }
    if (q.includes('back') || q.includes('kati')) {
      return `#1 Kati Basti (warm medicated oil retained in a dough dam over the lumbar spine) and #13 Patar Potli Swedan provide deep relief from lower back fatigue and stiffness. Practitioner A.K. Goswami can administer this at the clinic or at your home in Roorkee.`;
    }
    if (q.includes('knee') || q.includes('janu')) {
      return `#2 Janu Basti creates a soothing warm herbal oil reservoir directly over the knees, promoting lubrication and joint flexibility. Pairs wonderfully with #14 Sristhisali Pind Swedan!`;
    }
    if (q.includes('stress') || q.includes('sleep') || q.includes('shirodhara')) {
      return `#11 Shirodhara flows a continuous rhythmic stream of warm herbal oil onto the forehead to pacify cranial Vata, relieve mental tension, and encourage deep restorative sleep.`;
    }
    if (q.includes('home') || q.includes('roorkee')) {
      return `Yes! Practitioner A.K. Goswami delivers home therapy sessions across Roorkee with portable massage accessories, medicated oils, and dough dams. Connect on WhatsApp (9058989193) to check availability!`;
    }
    return `Namaste! AyushKaya in Sainipuram, Roorkee offers 24 classical Panchkarma therapies and personalized health tracking. You can connect directly with practitioner A.K. Goswami at 9058989193 for customized care or booking!`;
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: textToSend.trim(),
          messages: [...messages, userMsg],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || getClientSideSmartAnswer(textToSend);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Chat API fetch issue, utilizing smart client fallback:', err);
      const fallbackReply = getClientSideSmartAnswer(textToSend);
      const fallbackMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppDirect = () => {
    const lastUserQuery = messages.filter((m) => m.sender === 'user').pop()?.text;
    const text = encodeURIComponent(
      lastUserQuery
        ? `Namaste AyushKaya, I have an inquiry: "${lastUserQuery}"`
        : `Namaste AyushKaya, I would like to inquire about Panchkarma therapies.`
    );
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#059669] hover:bg-[#047857] text-white rounded-full shadow-2xl active:scale-95 transition-all duration-300 border-2 border-white/20"
            aria-label="Open WhatsApp AI Assistant"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D4AF37]"></span>
            </span>

            <MessageCircle className="w-6 h-6 shrink-0" />
            <span className="font-semibold text-xs tracking-wide pr-1">
              WhatsApp Assistant
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[85vh] sm:max-h-[580px] h-[580px] bg-white rounded-2xl shadow-2xl border border-[#0E2A21]/20 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#0E2A21] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center text-white shadow-inner">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-bold text-white leading-none">
                    AyushKaya
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>
                <p className="text-[11px] text-[#A7F3D0] mt-0.5 font-light">
                  A.K. Goswami · Roorkee
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={openWhatsAppDirect}
                title="Switch to WhatsApp App"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Open on WhatsApp"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Assistant Sub-Banner */}
          <div className="bg-[#13382C] text-[#D8E6DE] px-3.5 py-1.5 text-[11px] flex items-center justify-between border-b border-white/10">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Panchkarma & Booking Assistant
            </span>
            <span className="text-[#D4AF37] font-medium">
              Call: {BRAND.phone}
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#EFEAE2] [background-image:radial-gradient(#C4BEB4_0.75px,transparent_0.75px)] [background-size:16px_16px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-[#059669] text-white rounded-tr-none'
                      : 'bg-white text-[#1E2922] rounded-tl-none border border-black/5'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-white/70' : 'text-[#8C6B1B]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2.5 text-xs text-[#465A4F] border border-black/5 shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#8C6B1B] ml-1">Consulting knowledge...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Pills */}
          <div className="bg-[#F5F0E8] px-3 py-2 border-t border-[#0E2A21]/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickReplies.map((qr) => (
              <button
                key={qr.label}
                onClick={() => {
                  if (qr.label === 'Book a Session') {
                    setIsOpen(false);
                    onOpenBooking();
                  } else {
                    handleSend(qr.query);
                  }
                }}
                className="px-2.5 py-1 bg-white hover:bg-[#0E2A21] text-[#0E2A21] hover:text-white rounded-full text-[11px] font-medium border border-[#0E2A21]/15 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-[#0E2A21]/10 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about therapies, timing, home care..."
              className="flex-1 px-3 py-2 text-xs bg-[#F5F0E8] border border-transparent rounded-xl text-[#0E2A21] placeholder-[#465A4F]/70 focus:outline-none focus:bg-white focus:border-[#059669]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputVal.trim() || loading}
              className="p-2 bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white rounded-xl shadow-sm transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Direct WhatsApp Action Footer */}
          <div className="px-3 py-2 bg-[#FBF9F4] border-t border-[#0E2A21]/5 flex items-center justify-between text-[11px]">
            <a
              href={`tel:${BRAND.phone}`}
              className="text-[#0E2A21] font-medium hover:text-[#059669] flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#059669]" />
              <span>Call: 9058989193</span>
            </a>
            <button
              onClick={openWhatsAppDirect}
              className="text-[#059669] font-bold hover:underline flex items-center gap-1"
            >
              <span>Chat on WhatsApp App</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
