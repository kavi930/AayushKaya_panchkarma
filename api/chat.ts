import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are "Ayush Vaidya AI", the dedicated Ayurvedic wellness consultant and virtual assistant for "AyushKaya – Panchkarma Therapies & Health Tracking" in Sainipuram, Roorkee (Uttarakhand).
Practitioner & Founder: A.K. Goswami
Direct Contact & WhatsApp: 9058989193

AYUSHKAYA CORE OFFERINGS:
1. Authentic Classical Panchkarma Therapies (24 classical modalities)
2. Personalized Health Tracking & Dosha Balance Assessment (Vata, Pitta, Kapha)
3. Both Clinic Sessions (Sainipuram, Roorkee) and Home Therapy (doorstep care across Roorkee with portable therapy equipment & authentic medicated herbal oils).

THE 24 CLASSICAL THERAPIES (as designated by AyushKaya):
1. Kati Basti: Lower back dough-dam warm herbal oil reservoir for lumbar comfort & spinal ease.
2. Janu Basti: Knee joint warm medicated oil pool for lubrication and joint mobility.
3. Griva Basti: Cervical neck & shoulder herbal oil reservoir for desk posture, stiffness, and neck fatigue.
4. Nabhi Basti: Navel center warm herbal oil pooling for core equilibrium, gut balance, and digestion fire.
5. Prasth Basti: Mid-spine / thoracic vertebral herbal oil pooling for back tension and posture alignment.
6. Liver Basti (Yakrit Basti): Hepatic/right abdominal gentle warm oil application for metabolic & digestive ease.
7. Lung Basti (Uro Basti): Thoracic warm medicated oil reservoir for chest openness and deep breathing comfort.
8. Shiro Basti: Classical cranial oil retention using an authentic fitted leather head cap for deep nervous system stillness.
9. Shiro Abhyang: Traditional head, scalp, neck, and shoulder warm herbal oil massage for stress relief & mental clarity.
10. Shiro Pichu: Medicated herbal oil soaked sterile cotton pad placed on the crown (Brahmarandhra) for restful sleep.
11. Shirodhara: Continuous rhythmic stream of warm herbal oil poured onto the forehead and third-eye center for profound mental calmness.
12. Hot & Cold Compress: Alternating thermal and herbal compress therapy for acute localized muscle tightness and circulation.
13. Patar Potli Pind Swedan (Patra Potli Pinda Swedana): Warm linen poultices filled with fresh medicated medicinal leaves (Nirgundi, Eranda, Arka) and oils for deep joint and muscle fomentation.
14. Sristhisali Pind Swedan (Shashtika Shali Pinda Swedana): Warm linen boluses with special 60-day red rice cooked in milk and Bala root decoction for supreme tissue nourishment and skin vitality.
15. Fire Cupping: Traditional heated suction cups placed along muscular meridians to stimulate circulation and release deep myofascial knots.
16. Full Body Massage: Comprehensive head-to-toe relaxation massage with warm custom herbal oils.
17. Parsal Massage (Partial Massage): Focused 30-minute targeted herbal massage for specific problem zones (back, legs, shoulders).
18. Abhyang (Abhyanga): Classical synchronized Ayurvedic full-body massage with warm medicated oils calibrated to the client's Dosha.
19. Leech Therapy (Jalaukavacharana): Classical bio-therapy using medicinal leeches for localized micro-circulation and blood purification under hygienic protocols.
20. Shiringi Therapy (Shringi Therapy): Ancient hollow cow-horn suction bio-purification method for deep localized tissue congestion.
21. Nasya: Administration of refined herbal oil drops through the nasal passages following gentle facial steam massage.
22. Karandhupan (Karna Dhupan): Gentle therapeutic herbal smoke fumigation of the ear canals for hygiene and seasonal fullness.
23. Karanpuran (Karna Puran): Soothing warm medicated herbal ear drops for lubrication and jaw/ear relaxation.
24. Akshi Tarpan: Nourishing medicated herbal ghee eye bath within dough enclosures for screen strain and eye rejuvenation.

HEALTH TRACKING & WELLNESS ASSISTANCE:
- You help users understand their Dosha tendencies (Vata = air/space, Pitta = fire/water, Kapha = earth/water).
- You recommend which of the 24 therapies best suit their symptoms (e.g. Back pain -> Kati Basti + Patar Potli; Insomnia/stress -> Shirodhara + Shiro Abhyang; Eye fatigue -> Akshi Tarpan; Knee pain -> Janu Basti).
- You encourage them to log their daily wellness metrics (pain score, sleep, digestion, energy) in the health tracker.

CRITICAL GUIDELINES:
1. Always maintain a warm, respectful, traditional Ayurvedic tone ("Namaste").
2. Answer in English or Hindi / Hinglish based on the visitor's prompt.
3. Keep responses concise, caring, and actionable (under 160 words).
4. Direct booking or slot inquiries directly to practitioner A.K. Goswami via WhatsApp or Call on 9058989193. Never fabricate confirmed calendar bookings.
5. Provide wellness guidance, not medical diagnosis.
`;

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, userMessage } = req.body || {};
    const textQuery = userMessage || (messages && messages[messages.length - 1]?.text) || '';

    if (!textQuery.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (ai) {
      try {
        const formattedContents = [];
        if (Array.isArray(messages) && messages.length > 1) {
          const recent = messages.slice(-8);
          for (const m of recent) {
            formattedContents.push({
              role: m.sender === 'user' ? 'user' : 'model',
              parts: [{ text: m.text }],
            });
          }
        } else {
          formattedContents.push({
            role: 'user',
            parts: [{ text: textQuery }],
          });
        }

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 15000)
        );

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });

        const response = await Promise.race([geminiPromise, timeoutPromise]);
        const replyText = response.text || 'Namaste! How may I assist you with AyushKaya Panchkarma therapies today?';
        return res.json({ reply: replyText });
      } catch (geminiError) {
        console.warn('Gemini generation unavailable on serverless, using authentic fallback:', geminiError);
      }
    }

    // High quality contextual fallback
    const q = textQuery.toLowerCase();
    let fallbackReply = `Namaste! Welcome to AyushKaya – Panchkarma Therapies & Health Tracking in Sainipuram, Roorkee. `;

    if (q.includes('availab') || q.includes('time') || q.includes('slot') || q.includes('when') || q.includes('book')) {
      fallbackReply += `Session availability is confirmed directly by practitioner A.K. Goswami to ensure customized care. Please share your preferred date and time, or tap 'Book Through WhatsApp' to connect directly on 9058989193.`;
    } else if (q.includes('home') || q.includes('ghar') || q.includes('visit')) {
      fallbackReply += `Yes, Home Therapy is available across Roorkee! Practitioner A.K. Goswami brings required therapeutic oils, dough setups, and herbal boluses directly to your residence. Would you like to schedule a home session?`;
    } else if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('rate')) {
      fallbackReply += `Our therapy rates are customized by duration, specialized medicated herbal oils, and location (clinic in Sainipuram vs home therapy in Roorkee). Please connect with A.K. Goswami on WhatsApp (9058989193) for transparent details.`;
    } else if (q.includes('dosha') || q.includes('track') || q.includes('vata') || q.includes('pitta') || q.includes('kapha') || q.includes('health')) {
      fallbackReply += `AyushKaya features a Personalized Health Tracker! You can take our quick Dosha balance quiz, log daily stiffness/digestion/sleep metrics, and get customized therapy pairings from our 24 therapies.`;
    } else if (q.includes('shirodhara') || q.includes('stress') || q.includes('sleep') || q.includes('head') || q.includes('tension')) {
      fallbackReply += `For mental rejuvenation and restful sleep, we recommend #11 Shirodhara (warm herbal oil stream on forehead), #9 Shiro Abhyang (scalp massage), and #10 Shiro Pichu. Both clinic and home appointments are offered.`;
    } else if (q.includes('back') || q.includes('kati') || q.includes('spine') || q.includes('pain') || q.includes('kamar') || q.includes('prasth')) {
      fallbackReply += `For back comfort, #1 Kati Basti (lower back warm oil reservoir) and #13 Patar Potli Pind Swedan (warm medicinal leaf fomentation) provide deep relief. #5 Prasth Basti is also ideal for mid-spine tension.`;
    } else if (q.includes('knee') || q.includes('janu') || q.includes('joint')) {
      fallbackReply += `For knee joint mobility and lubrication, #2 Janu Basti retains warm medicated oils in a dough dam around the joint, paired wonderfully with #14 Sristhisali Pind Swedan or warm herbal compresses.`;
    } else if (q.includes('eye') || q.includes('screen') || q.includes('tarpan') || q.includes('akshi')) {
      fallbackReply += `#24 Akshi Tarpan is our signature Ayurvedic eye bath using lukewarm medicated herbal ghee inside gentle dough enclosures. It deeply relieves screen fatigue, dry eyes, and strain.`;
    } else if (q.includes('ear') || q.includes('karan') || q.includes('dhupan') || q.includes('puran')) {
      fallbackReply += `For ear wellness, we offer #22 Karandhupan (gentle medicinal herbal smoke fumigation) and #23 Karanpuran (warm herbal ear oil instillation) to soothe jaw tension and ear dryness.`;
    } else if (q.includes('cupping') || q.includes('fire') || q.includes('leech') || q.includes('shiringi')) {
      fallbackReply += `We provide classical bio-purification and deep tissue therapies: #15 Fire Cupping (for stubborn muscle knots), #19 Leech Therapy (Jalaukavacharana for micro-circulation), and #20 Shiringi Therapy (classical horn suction).`;
    } else if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('kahan')) {
      fallbackReply += `AyushKaya is conveniently located in Sainipuram, Roorkee (Uttarakhand). Home visits are also offered throughout Roorkee. Call or WhatsApp 9058989193 for directions.`;
    } else {
      fallbackReply += `We offer all 24 classical therapies including Kati Basti, Janu Basti, Shirodhara, Patar Potli, Sristhisali Pind Swedan, Fire Cupping, Nasya, and Akshi Tarpan, alongside personalized health tracking. How can we assist your wellness journey today?`;
    }

    return res.json({ reply: fallbackReply });
  } catch (err: any) {
    console.error('Serverless chat error:', err);
    return res.status(500).json({ error: 'Unable to process chat request at this moment.' });
  }
}
