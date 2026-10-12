import { GoogleGenAI, ThinkingLevel } from '@google/genai';

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
    const { primaryConcern, doshaAnswers, painLevel, sleepQuality, digestionState } = req.body || {};

    if (ai) {
      try {
        const prompt = `Analyze this Ayurvedic health profile and recommend 2-3 specific therapies from AyushKaya's 24 therapies (Kati basti, Janu basti, Griva basti, Nabhi basti, Prasth basti, Liver basti, Lung basti, Shiro basti, Shiro abhyang, Shiro pichu, Shirodhara, Hot cold compress, Patar potli pind swedan, Sristhisali pind swedan, Fire cupping, Full body massage, Parsal massage, Abhyang, Leech therapy, Shiringi therapy, Nasya, Karandhupan, Karanpuran, Akshi tarpan).
Primary Concern: ${primaryConcern || 'General wellness & stress'}
Pain/Stiffness: ${painLevel || 3}/10
Sleep Quality: ${sleepQuality || 'Moderate'}
Digestion/Agni: ${digestionState || 'Variable'}
Dosha tendencies: ${JSON.stringify(doshaAnswers || {})}

Return a concise JSON object with:
- doshaAnalysis: string (1-2 sentences)
- recommendedTherapies: array of objects with { id: string, name: string, reason: string }
- lifestyleTips: array of 2 short dietary/routine tips
- suggestedSessionType: "Clinic" | "Home Therapy" | "Both"`;

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 12000)
        );

        const response = await Promise.race([geminiPromise, timeoutPromise]);
        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ success: true, analysis: parsed });
        }
      } catch (err) {
        console.warn('AI assessment serverless fallback:', err);
      }
    }

    return res.json({
      success: true,
      analysis: {
        doshaAnalysis: 'Your indicators suggest elevated Vata (movement & dryness) with localized tension, benefiting from warm unctuous therapies.',
        recommendedTherapies: [
          { name: 'Kati Basti / Janu Basti', reason: 'Warm herbal oil pooling deeply nourishes joints and eases localized stiffness.' },
          { name: 'Patar Potli Pind Swedan', reason: 'Medicinal leaf bolus fomentation opens channels and warms stiff connective tissues.' },
          { name: 'Shirodhara', reason: 'Continuous warm oil stream calms cranial Vata and promotes restorative sleep.' },
        ],
        lifestyleTips: [
          'Incorporate warm, unctuous cooked meals with a teaspoon of pure desi cow ghee.',
          'Sip warm water with cumin and dry ginger through the afternoon to support digestive Agni.',
        ],
        suggestedSessionType: 'Both Clinic & Home Therapy Available',
      },
    });
  } catch (err) {
    console.error('Serverless health assessment error:', err);
    return res.status(500).json({ error: 'Failed to process health assessment.' });
  }
}
