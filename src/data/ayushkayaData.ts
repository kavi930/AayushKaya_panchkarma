export interface Therapy {
  id: string;
  number: number;
  name: string;
  sanskritName?: string;
  aliasNames?: string[];
  category: 'basti' | 'head' | 'swedana' | 'massage' | 'specialized';
  categoryLabel: string;
  shortDesc: string;
  description: string;
  bodyTarget: string;
  doshaBalancing: string;
  suitableFor: string[];
  sessionDuration: string;
  isFeatured?: boolean;
  image?: string;
  tag?: string;
}

export interface BrandConfig {
  name: string;
  subtitle: string;
  practitioner: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  location: string;
  city: string;
  homeTherapyAvailable: boolean;
  homeTherapyNote: string;
  practitionerTitle: string;
  practitionerBio: string;
  qualificationsNote: string;
  images: {
    hero: string;
    shirodhara: string;
    potli: string;
    katiBasti: string;
    practitioner: string | null;
  };
}

export const BRAND: BrandConfig = {
  name: "AyushKaya",
  subtitle: "Panchkarma Therapies & Health Tracking",
  practitioner: "A.K. Goswami",
  phone: "9058989193",
  phoneFormatted: "+91 90589 89193",
  whatsappNumber: "919058989193",
  location: "Sainipuram, Roorkee",
  city: "Roorkee, Uttarakhand",
  homeTherapyAvailable: true,
  homeTherapyNote: "Home therapy available across Roorkee and surrounding areas with all required traditional equipment & medicated oils.",
  practitionerTitle: "Ayurvedic Panchkarma Practitioner",
  practitionerBio: "Dedicated to the classical tradition of Ayurvedic wellness, A.K. Goswami brings attentive, one-on-one personalized care to every therapy session. Emphasizing patient comfort, natural harmony, and authentic procedural precision, sessions are delivered both at the Sainipuram wellness space and in the comfort of your home.",
  qualificationsNote: "Qualifications and verified certification credentials as provided by the practitioner. Please contact directly for credential documentation and consultation inquiries.",
  images: {
    hero: "/src/assets/images/hero_ayurveda_panchkarma_1791120408611.jpg",
    shirodhara: "/src/assets/images/shirodhara_therapy_1791120431726.jpg",
    potli: "/src/assets/images/potli_swedana_therapy_1791120444673.jpg",
    katiBasti: "/src/assets/images/kati_basti_therapy_1791120457652.jpg",
    practitioner: null,
  },
};

export const THERAPY_CATEGORIES = [
  { id: 'all', label: 'All 24 Therapies', count: 24 },
  { id: 'basti', label: 'Basti Therapies', count: 8 },
  { id: 'head', label: 'Head & Senses', count: 7 },
  { id: 'swedana', label: 'Swedana / Compress', count: 3 },
  { id: 'massage', label: 'Ayurvedic Massage', count: 3 },
  { id: 'specialized', label: 'Specialized Detox', count: 3 },
] as const;

export const THERAPIES: Therapy[] = [
  // 1. Kati Basti
  {
    id: 'kati-basti',
    number: 1,
    name: 'Kati Basti',
    sanskritName: 'कटि बस्ति',
    aliasNames: ['Kati basti', 'Lumbosacral Oil Pool'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'A traditional warm herbal oil reservoir retained over the lumbar spine.',
    description: 'A classical localized warm oil retention therapy. A dam made from organic black gram flour dough is sculpted on the lower back, and warm medicated herbal oil is continuously poured and maintained at a comforting temperature, deeply soothing lumbar vertebrae and muscular tissues.',
    bodyTarget: 'Lower Back & Lumbo-Sacral Spine',
    doshaBalancing: 'Pacifies Vata dosha & relaxes Apana Vayu',
    suitableFor: ['Lower back stiffness', 'Postural fatigue', 'Lumbar strain', 'Sciatic pathway discomfort'],
    sessionDuration: '45–60 mins',
    isFeatured: true,
    image: BRAND.images.katiBasti,
    tag: 'Popular',
  },
  // 2. Janu Basti
  {
    id: 'janu-basti',
    number: 2,
    name: 'Janu Basti',
    sanskritName: 'जानु बस्ति',
    aliasNames: ['Janu basti', 'Knee Joint Oil Reservoir'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Warm medicated herbal oil reservoir applied directly over knee joints.',
    description: 'A traditional knee therapy where an organic herbal dough dam is sealed around the knee joints and filled with warm medicated herbal oils. It provides deep soothing warmth and natural lubrication for joint mobility and weight-bearing ease.',
    bodyTarget: 'Knee Joints & Surrounding Ligaments',
    doshaBalancing: 'Pacifies localized Vata & replenishes Shleshaka Kapha',
    suitableFor: ['Knee joint stiffness', 'Walking discomfort', 'Age-related joint dryness', 'Active mobility care'],
    sessionDuration: '45 mins',
    isFeatured: true,
    tag: 'Joint Care',
  },
  // 3. Griva Basti
  {
    id: 'griva-basti',
    number: 3,
    name: 'Griva Basti',
    sanskritName: 'ग्रीवा बस्ति',
    aliasNames: ['Griva basti', 'Cervical Neck Oil Pool'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Warm herbal oil pooling focused on the cervical neck and shoulder region.',
    description: 'Formed using a dough reservoir along the posterior neck and upper thoracic spine. Warm medicated herbal oils are retained to ease muscular tension caused by desk work, screen posture, and neck stiffness.',
    bodyTarget: 'Cervical Spine, Trapezius & Upper Back',
    doshaBalancing: 'Pacifies Vata & relieves Manya Stambha (neck rigidity)',
    suitableFor: ['Neck tension', 'Desk posture strain', 'Shoulder knot stiffness', 'Upper back tightness'],
    sessionDuration: '40–50 mins',
  },
  // 4. Nabhi Basti
  {
    id: 'nabhi-basti',
    number: 4,
    name: 'Nabhi Basti',
    sanskritName: 'नाभि बस्ति',
    aliasNames: ['Nabhi basti', 'Umbilical Core Oil Reservoir'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Warm herbal oil retained over the umbilical area for core and digestion equilibrium.',
    description: 'Centering on the solar plexus and vital navel center (Nabhi Marma), this gentle treatment uses specific classical medicated oils to support digestive comfort, natural abdominal relaxation, and systemic somatic calming.',
    bodyTarget: 'Navel, Solar Plexus & Core Abdomen',
    doshaBalancing: 'Harmonizes Samana Vayu & balances Agni (digestive fire)',
    suitableFor: ['Digestive ease', 'Abdominal bloating & tightness', 'Core centering', 'Nervous gut tension'],
    sessionDuration: '40 mins',
  },
  // 5. Prasth Basti
  {
    id: 'prasth-basti',
    number: 5,
    name: 'Prasth Basti',
    sanskritName: 'पृष्ठ बस्ति',
    aliasNames: ['Prasth basti', 'Prishta Basti', 'Thoracic Spine Oil Reservoir'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Warm oil pooling along the mid-spine column and dorsal vertebrae.',
    description: 'A comforting pool of warm herbal oil sustained over the thoracic and dorsal spine to relax surrounding erector spinae musculature and encourage structural comfort and open chest posture.',
    bodyTarget: 'Mid-Back & Dorsal Vertebrae Column',
    doshaBalancing: 'Pacifies Vata & balances Vyana Vayu throughout spine',
    suitableFor: ['Mid-back tension', 'Spinal fatigue from sitting', 'Erector spinae tightness', 'Postural curvature strain'],
    sessionDuration: '45 mins',
  },
  // 6. Liver Basti
  {
    id: 'liver-basti',
    number: 6,
    name: 'Liver Basti',
    sanskritName: 'यकृत बस्ति',
    aliasNames: ['Liver basti', 'Yakrit Basti', 'Hepatic Oil Reservoir'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Gentle warm herbal oil retention applied over the right upper abdominal region.',
    description: 'A specialized external application using warm herbal decoctions and oils positioned over the hepatic zone (Yakrit) to promote abdominal harmony, gentle warmth, and metabolic equilibrium.',
    bodyTarget: 'Right Hypochondrium / Hepatic Region',
    doshaBalancing: 'Pacifies agitated Pitta & balances Ranjaka Pitta',
    suitableFor: ['Abdominal comfort', 'Sluggish metabolic warmth', 'Liver area heaviness', 'Digestive harmony'],
    sessionDuration: '40 mins',
  },
  // 7. Lung Basti
  {
    id: 'lung-basti',
    number: 7,
    name: 'Lung Basti',
    sanskritName: 'उरो बस्ति (फुफ्फुस)',
    aliasNames: ['Lung basti', 'Uro Basti', 'Hridaya / Thoracic Basti'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Warm medicated oil reservoir held over the chest and thoracic area.',
    description: 'Warm medicated herbal oil is gently retained within a dough wall over the sternal and chest area, fostering open breathing sensations, emotional release, and rib cage muscular relaxation.',
    bodyTarget: 'Chest, Ribcage & Thoracic Cavity',
    doshaBalancing: 'Pacifies Prana Vayu & Avalambaka Kapha',
    suitableFor: ['Chest tightness', 'Shallow breathing sensations', 'Stress-related heart center tension', 'Seasonal respiratory comfort'],
    sessionDuration: '45 mins',
  },
  // 8. Shiro Basti
  {
    id: 'shiro-basti',
    number: 8,
    name: 'Shiro Basti',
    sanskritName: 'शिरो बस्ति',
    aliasNames: ['Shiro basti', 'Cranial Oil Cap Reservoir'],
    category: 'basti',
    categoryLabel: 'Basti Therapies',
    shortDesc: 'Specialized cranial oil retention using an authentic leather head cap.',
    description: 'A distinguished classical Panchkarma procedure where an elongated leak-proof cap is fitted securely over the head and filled with warm medicated herbal oil for a calibrated duration under careful practitioner supervision.',
    bodyTarget: 'Crown, Scalp & Cranial Vault',
    doshaBalancing: 'Deep pacification of cranial Vata & nervous system exhaustion',
    suitableFor: ['Intense mental calm', 'Cranial dryness & rigidity', 'Deep neurological stillness', 'Chronic head fatigue'],
    sessionDuration: '50–60 mins',
  },
  // 9. Shiro Abhyang
  {
    id: 'shiro-abhyang',
    number: 9,
    name: 'Shiro Abhyang',
    sanskritName: 'शिरो अभ्यंग',
    aliasNames: ['Shiro abhyang', 'Shiroabhyanga', 'Ayurvedic Head Massage'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Classical Ayurvedic head, scalp, neck, and shoulder herbal massage.',
    description: 'A therapeutic massage focused on the scalp, neck, and marma points of the head using warm Ayurvedic herbal oils. Enhances mental clarity, relieves tension, and conditions hair roots.',
    bodyTarget: 'Head, Scalp, Temples, Neck & Shoulders',
    doshaBalancing: 'Soothes Vata & cools excess Pitta in upper body',
    suitableFor: ['Stress relief', 'Scalp nourishment', 'Headache relaxation', 'Mental clarity'],
    sessionDuration: '30–40 mins',
  },
  // 10. Shiro Pichu
  {
    id: 'shiro-pichu',
    number: 10,
    name: 'Shiro Pichu',
    sanskritName: 'शिरो पिचु',
    aliasNames: ['Shiro pichu', 'Medicated Crown Pad'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Medicated herbal oil pad placed gently on the crown of the head.',
    description: 'A sterile cotton pad soaked in warm medicated herbal oil is kept resting on the Brahmarandhra (crown point), refreshed periodically to provide soothing cranial calm and support undisturbed sleep.',
    bodyTarget: 'Brahmarandhra (Crown of the Head)',
    doshaBalancing: 'Calms Vata & Pitta affecting mind and sleep rhythm',
    suitableFor: ['Restful sleep support', 'Restless racing thoughts', 'Scalp cooling and calm', 'Stress-induced fatigue'],
    sessionDuration: '40 mins',
  },
  // 11. Shirodhara
  {
    id: 'shirodhara',
    number: 11,
    name: 'Shirodhara',
    sanskritName: 'शिरोधारा',
    aliasNames: ['Shirodhara', 'Forehead Oil Stream'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Continuous gentle stream of warm medicated herbal oil onto the forehead.',
    description: 'Perhaps the most iconic Ayurvedic rejuvenation therapy. Warm, herbal-infused oil flows in a steady rhythmic cascade from a hanging brass vessel over the forehead and third-eye center, inducing deep meditative stillness.',
    bodyTarget: 'Forehead, Third-Eye (Ajna Marma) & Mind',
    doshaBalancing: 'Supreme pacification of Vata & Pitta in the nervous system',
    suitableFor: ['Deep stress release', 'Natural sleep harmony', 'Mental rejuvenation', 'Overworked nervous system'],
    sessionDuration: '50–60 mins',
    isFeatured: true,
    image: BRAND.images.shirodhara,
    tag: 'Signature Therapy',
  },
  // 12. Hot Cold Compress
  {
    id: 'hot-cold-compress',
    number: 12,
    name: 'Hot & Cold Compress',
    sanskritName: 'उष्ण व शीत स्वेद',
    aliasNames: ['Hot cold compress', 'Ushna Sheeta Sweda', 'Thermal Compress'],
    category: 'swedana',
    categoryLabel: 'Swedana / Compress',
    shortDesc: 'Alternating thermal compress therapy for localized muscle comfort.',
    description: 'Carefully timed alternation between warm herbal compresses and cool therapeutic packs, stimulating circulation and relieving localized muscular fatigue and sports tightness.',
    bodyTarget: 'Targeted Muscular Joints & Sore Tissues',
    doshaBalancing: 'Stimulates circulation while modulating Pitta & Kapha congestion',
    suitableFor: ['Localized soreness', 'Sports fatigue', 'Muscular stiffness', 'Swelling release'],
    sessionDuration: '30–40 mins',
  },
  // 13. Patar Potli Pind Swedan
  {
    id: 'patar-potli-pind-awedan',
    number: 13,
    name: 'Patar Potli Pind Swedan',
    sanskritName: 'पत्र पोटली पिण्ड स्वेद',
    aliasNames: ['Patar potli pind awedan', 'Patra Potli Pinda Swedana', 'Leaf Poultice Swedana'],
    category: 'swedana',
    categoryLabel: 'Swedana / Compress',
    shortDesc: 'Warm linen poultices filled with fresh medicated medicinal leaves & oils.',
    description: 'Fresh medicinal leaves (such as Nirgundi, Eranda, and Arka) are fried in herbal oils and bound into linen boluses. Heated rhythmically and applied along energy channels and joints for deep warm fomentation and stiffness release.',
    bodyTarget: 'Full Spine, Shoulders, Lower Back & Major Joints',
    doshaBalancing: 'Powerfully disperses cold Vata and heavy Kapha stiffness',
    suitableFor: ['Joint stiffness', 'Body aches', 'Back & neck tension', 'Deep muscular comfort'],
    sessionDuration: '45–60 mins',
    isFeatured: true,
    image: BRAND.images.potli,
    tag: 'Traditional',
  },
  // 14. Sristhisali Pind Swedan
  {
    id: 'sristhisali-pind-swedan',
    number: 14,
    name: 'Sristhisali Pind Swedan',
    sanskritName: 'षष्टिक शालि पिण्ड स्वेद',
    aliasNames: ['Sristhisali pind swedan', 'Shashtika Shali Pinda Swedana', 'Navarakizhi', 'Rice Poultice Therapy'],
    category: 'swedana',
    categoryLabel: 'Swedana / Compress',
    shortDesc: 'Nourishing massage with special medicated rice cooked in herbal decoctions & milk.',
    description: 'Special 60-day red rice (Shashtika Shali) cooked in a decoction of Balaroot and fresh milk, gathered in soft cloth boluses and applied across the body. Renowned for supreme tissue rejuvenation, muscle toning, and skin softness.',
    bodyTarget: 'Full Body Musculature & Limbs',
    doshaBalancing: 'Nourishes Dhatus, pacifies severe Vata wasting & replenishes Ojas',
    suitableFor: ['Muscle nourishment', 'Body rejuvenation', 'Skin glow', 'Tissue vitality', 'Post-illness strength'],
    sessionDuration: '50–60 mins',
  },
  // 15. Fire Cupping
  {
    id: 'fire-cupping',
    number: 15,
    name: 'Fire Cupping',
    sanskritName: 'अग्नि कपिंग चिकित्सा',
    aliasNames: ['Fire cupping', 'Agni Cupping', 'Flame Vacuum Therapy'],
    category: 'specialized',
    categoryLabel: 'Specialized Detox',
    shortDesc: 'Traditional therapeutic suction cupping for blood flow and tension release.',
    description: 'A classical suction therapy using heated glass cups placed along meridian paths of the back. Creates negative pressure to draw stagnation, stimulate localized blood flow, and loosen rigid connective tissues.',
    bodyTarget: 'Back, Shoulders, Scapular Region & Lumbar Area',
    doshaBalancing: 'Releases localized blood stagnation (Rakta Dushti) & Kapha coldness',
    suitableFor: ['Deep tissue tightness', 'Myofascial tension', 'Back congestion', 'Circulatory warmth', 'Rigid muscle knots'],
    sessionDuration: '35–45 mins',
    isFeatured: true,
    tag: 'Specialized',
  },
  // 16. Full Body Massage
  {
    id: 'full-body-massage',
    number: 16,
    name: 'Full Body Massage',
    sanskritName: 'सर्वांग मालिश',
    aliasNames: ['Full body massage', 'Sarvanga Malish', 'Relaxation Massage'],
    category: 'massage',
    categoryLabel: 'Ayurvedic Massage',
    shortDesc: 'Comprehensive full-body relaxation massage using warm herbal oils.',
    description: 'A comforting full-body therapy from head to toe using warm, tailored herbal sesame or mustard oils, easing daily physical exhaustion and restoring body warmth and flexibility.',
    bodyTarget: 'Head-to-Toe Bodily Musculature',
    doshaBalancing: 'General stabilization of all three doshas (Tridosha samya)',
    suitableFor: ['Whole-body relaxation', 'Circulation boost', 'General physical fatigue', 'Sore limbs'],
    sessionDuration: '60 mins',
  },
  // 17. Parsal Massage
  {
    id: 'parsal-massage',
    number: 17,
    name: 'Parsal Massage',
    sanskritName: 'एकांग मालिश (पार्शियल मसाज)',
    aliasNames: ['Parsal massage', 'Partial massage', 'Ekanga Malish', 'Targeted Massage'],
    category: 'massage',
    categoryLabel: 'Ayurvedic Massage',
    shortDesc: 'Focused herbal massage targeting specific areas like back, legs, or shoulders.',
    description: 'A concentrated 30-minute therapy customized for the exact area causing discomfort—whether shoulders, calves, lower back, or feet, using customized medicated herbal oils.',
    bodyTarget: 'Selected Problem Zone (Back, Shoulders, Legs, or Arms)',
    doshaBalancing: 'Releases localized Vata knots and stiffness',
    suitableFor: ['Specific muscle knots', 'Targeted relief', 'Quick recovery session', 'Localized fatigue'],
    sessionDuration: '30 mins',
  },
  // 18. Abhyang
  {
    id: 'abhyang',
    number: 18,
    name: 'Abhyang',
    sanskritName: 'पारंपरिक अभ्यंग',
    aliasNames: ['Abhyang', 'Abhyanga', 'Classical Ayurvedic Body Massage'],
    category: 'massage',
    categoryLabel: 'Ayurvedic Massage',
    shortDesc: 'Traditional classical Ayurvedic rhythmic oil massage tailored to your dosha.',
    description: 'The cornerstone of Ayurvedic daily wellness. Long, rhythmic, coordinated strokes with abundant warm medicated oils calibrated to harmonize bodily humors (Vata, Pitta, Kapha), drain lymphatic stagnation, and tone muscle tissue.',
    bodyTarget: 'Entire Body along Nadis & Marma Points',
    doshaBalancing: 'Harmonizes Vata, lubricates joints, increases vitality & immunity',
    suitableFor: ['Dosha balance', 'Lymphatic flow', 'Deep relaxation', 'Daily vitality', 'Natural anti-aging'],
    sessionDuration: '60–75 mins',
    isFeatured: true,
    tag: 'Essential Classic',
  },
  // 19. Leech Therapy
  {
    id: 'leech-therapy',
    number: 19,
    name: 'Leech Therapy',
    sanskritName: 'जलौकावचरण',
    aliasNames: ['Leech therapy', 'Jalaukavacharana', 'Medicinal Leech Therapy'],
    category: 'specialized',
    categoryLabel: 'Specialized Detox',
    shortDesc: 'Classical micro-circulation bio-therapy administered by trained practitioner.',
    description: 'A recognized classical Ayurvedic para-surgical procedure using medicinal leeches (Jalauka) applied to specific target areas for localized micro-circulation, blood purification, and reduction of localized inflammation under hygienic protocols.',
    bodyTarget: 'Targeted Localized Stagnant Areas',
    doshaBalancing: 'Purifies Rakta (blood) & pacifies vitiated Pitta dosha',
    suitableFor: ['Localized skin congestion', 'Micro-circulation', 'Stagnant blood flow', 'Localized heat sensations'],
    sessionDuration: '45–60 mins',
  },
  // 20. Shiringi Therapy
  {
    id: 'shiringi-therapy',
    number: 20,
    name: 'Shiringi Therapy',
    sanskritName: 'शृंगी चिकित्सा',
    aliasNames: ['shiringi therapy', 'Shringi therapy', 'Sringavacharana', 'Classical Horn Cupping'],
    category: 'specialized',
    categoryLabel: 'Specialized Detox',
    shortDesc: 'Classical horn-based suction bio-purification method for localized stagnation.',
    description: 'One of the ancient Ayurvedic Raktamokshana modalities utilizing a specialized hollow horn (Shringi) to create precise vacuum suction over dense areas of tissue stagnation, pulling deep seated coldness and impurities.',
    bodyTarget: 'Focal Areas of Deep Stagnation (Shoulders, Back, Hips)',
    doshaBalancing: 'Pacifies Vata-Rakta & removes deep-seated cold stagnation',
    suitableFor: ['Localized tissue stagnation', 'Ancient purifying suction', 'Deep chronic congestion', 'Rigid joint corners'],
    sessionDuration: '35–45 mins',
  },
  // 21. Nasya
  {
    id: 'nasya',
    number: 21,
    name: 'Nasya',
    sanskritName: 'नस्य कर्म',
    aliasNames: ['Nasya', 'Nasal Drops Therapy', 'Shirovirechana'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Administration of refined herbal drops through the nasal passageways.',
    description: 'One of the five classical Panchkarma actions. Following a gentle facial oil massage and warm herbal steam towel, medicated herbal drops are introduced into the nostrils to cleanse head passages and awaken mental clarity.',
    bodyTarget: 'Nasal Passages, Sinuses, Head & Throat',
    doshaBalancing: 'Cleanses Kapha from Urdhva Jatru (head/neck) & clarifies Prana Vayu',
    suitableFor: ['Nasal passage clarity', 'Head lightness', 'Seasonal respiratory comfort', 'Facial relaxation', 'Screen strain'],
    sessionDuration: '30–40 mins',
    isFeatured: true,
    tag: 'Panchkarma Core',
  },
  // 22. Karandhupan
  {
    id: 'karandhupan',
    number: 22,
    name: 'Karandhupan',
    sanskritName: 'कर्ण धूपन',
    aliasNames: ['karandhupan', 'Karna dhupan', 'Karna Dhoopana', 'Ear Fumigation'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Gentle fumigation of the ears using therapeutic medicinal herb smoke.',
    description: 'A traditional ear care procedure using soothing smoke from selected antiseptic and drying medicinal herbs (such as Guggulu, Haridra, Neem), promoting ear canal freshness, warmth, and seasonal comfort.',
    bodyTarget: 'External Ear Canals & Surrounding Cranial Area',
    doshaBalancing: 'Dries excess Kapha moisture & soothes cold Vata in auditory canals',
    suitableFor: ['Ear canal hygiene', 'Seasonal ear fullness', 'Gentle warmth', 'Damp ear sensations'],
    sessionDuration: '20–30 mins',
  },
  // 23. Karanpuran
  {
    id: 'karanpuran',
    number: 23,
    name: 'Karanpuran',
    sanskritName: 'कर्ण पूरण',
    aliasNames: ['karanpuran', 'Karna puran', 'Karna Poorana', 'Medicated Ear Oil Instillation'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Gentle filling of the ears with lukewarm medicated herbal oils.',
    description: 'A comforting therapy where calibrated warm medicated ear drops are administered to lubricate ear canals, calm cranial dryness, relax the temporomandibular joint, and relieve jaw tension.',
    bodyTarget: 'Ear Canals, Auditory Nerves & TMJ / Jaw Line',
    doshaBalancing: 'Profoundly pacifies cranial Vata & stabilizes auditory nerves',
    suitableFor: ['Ear relaxation', 'Jaw tension relief', 'Dryness reduction', 'Wind sensitivity'],
    sessionDuration: '25–35 mins',
  },
  // 24. Akshi Tarpan
  {
    id: 'akshi-tarpan',
    number: 24,
    name: 'Akshi Tarpan',
    sanskritName: 'अक्षि तर्पण',
    aliasNames: ['akshi tarpan', 'Akshitarpan', 'Netra Tarpana', 'Herbal Eye Bath'],
    category: 'head',
    categoryLabel: 'Head & Senses',
    shortDesc: 'Nourishing herbal ghee eye bath within custom dough enclosures.',
    description: 'A delicate rejuvenation practice for the eyes. Gram dough enclosures are sculpted around the eye sockets and filled with lukewarm medicated Triphala or herbal ghee, providing profound cooling comfort, visual clarity, and relief from modern digital screen exhaustion.',
    bodyTarget: 'Eyes, Orbit & Optic Nerve Receptors',
    doshaBalancing: 'Pacifies Alochaka Pitta & soothes ocular Vata dryness',
    suitableFor: ['Screen fatigue & digital eye strain', 'Eye dryness', 'Visual tiredness', 'Tension behind eyes'],
    sessionDuration: '40 mins',
    isFeatured: true,
    tag: 'Eye Rejuvenation',
  },
];

export const TRUST_POINTS = [
  {
    title: 'Traditional Ayurvedic Care',
    description: 'Rooted in classical texts and authentic procedural methods.',
  },
  {
    title: 'Personalized Sessions',
    description: 'Tailored carefully to your individual constitution and comfort.',
  },
  {
    title: 'Home Therapy Available',
    description: 'Relax in your own space across Roorkee with portable setup.',
  },
  {
    title: 'Easy WhatsApp Booking',
    description: 'Direct communication with practitioner without middle agents.',
  },
];

export const WHY_AYUSHKAYA = [
  {
    title: 'Traditional Approach',
    description: 'We follow time-tested Ayurvedic principles, pure medicated herbal oils, and authentic dough dam methods rather than modern commercial shortcuts.',
  },
  {
    title: 'Personalized Care & Health Tracking',
    description: 'Every individual receives a dedicated assessment before therapy begins. We adjust oil temperatures, herb blends, and pressure to your comfort, and provide wellness tracking.',
  },
  {
    title: 'Home Therapy Available',
    description: 'For elders, busy professionals, or individuals preferring privacy, A.K. Goswami delivers full therapy sessions directly to your Roorkee home.',
  },
  {
    title: 'Direct Practitioner Communication',
    description: 'No front-desk call center. You speak and chat directly with practitioner A.K. Goswami to discuss your needs and schedule appointments.',
  },
  {
    title: 'Easy Booking',
    description: 'Convenient scheduling via WhatsApp or online request form with rapid responses and flexible appointment hours from 8 AM to 8 PM.',
  },
  {
    title: 'Convenient Local Service',
    description: 'Centrally situated in Sainipuram, Roorkee with accessible parking and peaceful neighborhood ambiance away from highway noise.',
  },
];

export const HOW_BOOKING_WORKS = [
  {
    step: '01',
    title: 'Choose a Therapy',
    description: 'Browse our 24 therapies or ask our AI assistant / practitioner for a tailored recommendation.',
  },
  {
    step: '02',
    title: 'Chat on WhatsApp',
    description: 'Send a quick message to 9058989193 or submit the booking form with your preferred details.',
  },
  {
    step: '03',
    title: 'Choose Available Time',
    description: 'Practitioner A.K. Goswami directly coordinates with you to agree on a convenient clinic or home slot.',
  },
  {
    step: '04',
    title: 'Confirm Your Session',
    description: 'Receive session preparation instructions and welcome your personalized Ayurvedic therapy.',
  },
];

export interface ClientExperience {
  id: string;
  clientName: string;
  location: string;
  therapyName: string;
  sessionType: 'Clinic Session' | 'Home Therapy';
  durationTreated: string;
  quote: string;
  outcomeHighlight: string;
  date: string;
}

export const CLIENT_EXPERIENCES: ClientExperience[] = [
  {
    id: 'exp-1',
    clientName: 'Dr. Neeraj Verma',
    location: 'Civil Lines, Roorkee',
    therapyName: 'Kati Basti & Patar Potli',
    sessionType: 'Clinic Session',
    durationTreated: '3 Sessions Course',
    quote: 'Due to long clinical hours, persistent lumbar stiffness had been bothering me for months. A.K. Goswami administered Kati Basti with warm medicated herbal oil reservoirs followed by leaf poultice fomentation. The warmth and structural ease were remarkable. The dedication to authentic procedure is exemplary.',
    outcomeHighlight: 'Relieved lower back fatigue & restored postural comfort',
    date: 'August 2026',
  },
  {
    id: 'exp-2',
    clientName: 'Smt. Shakuntala Devi',
    location: 'Malviya Chowk, Roorkee',
    therapyName: 'Janu Basti & Hot Compress',
    sessionType: 'Home Therapy',
    durationTreated: '5 Home Visits',
    quote: 'Being 68 years old, traveling to clinics for knee stiffness was difficult for me. Having A.K. Goswami visit our residence with the full Ayurvedic equipment was a true blessing. The gentle warm dough pool on my knees and personalized care gave me tremendous comfort when climbing our staircase.',
    outcomeHighlight: 'Noticeable knee joint ease and mobility at home',
    date: 'September 2026',
  },
  {
    id: 'exp-3',
    clientName: 'Pooja Aggarwal',
    location: 'IIT Roorkee Campus',
    therapyName: 'Shirodhara & Shiro Abhyang',
    sessionType: 'Clinic Session',
    durationTreated: '2 Rejuvenation Sessions',
    quote: 'Intense academic deadlines had left my sleep irregular and mind exhausted. The continuous warm oil stream of Shirodhara induced a state of deep, restorative stillness I had not experienced in years. The clinic atmosphere in Sainipuram is exceptionally peaceful.',
    outcomeHighlight: 'Deep mental tranquility and natural restorative sleep',
    date: 'September 2026',
  },
  {
    id: 'exp-4',
    clientName: 'Vikram Singh Rawat',
    location: 'Awas Vikas, Roorkee',
    therapyName: 'Abhyang & Patar Potli Pind Swedan',
    sessionType: 'Home Therapy',
    durationTreated: 'Weekly Routine',
    quote: 'I booked a home Abhyang and herbal leaf potli session after weeks of bodily fatigue from factory site work. The herbal oils were pure and kept at the perfect soothing temperature. A.K. Goswami is courteous, disciplined, and remarkably skilled.',
    outcomeHighlight: 'Total muscular relaxation and refreshed vitality',
    date: 'July 2026',
  },
  {
    id: 'exp-5',
    clientName: 'Meenakshi Sharma',
    location: 'Sainipuram, Roorkee',
    therapyName: 'Nasya & Griva Basti',
    sessionType: 'Clinic Session',
    durationTreated: '3 Sessions',
    quote: 'Living right here in Sainipuram, I sought care for chronic screen-induced neck tightness and seasonal sinus fullness. The combination of Griva Basti for cervical tightness and gentle Nasya drops cleared my head completely without any rush.',
    outcomeHighlight: 'Lightness in head and free cervical neck movement',
    date: 'August 2026',
  },
  {
    id: 'exp-6',
    clientName: 'Rajendra Prasad Gupta',
    location: 'Ramnagar, Roorkee',
    therapyName: 'Fire Cupping & Parsal Massage',
    sessionType: 'Clinic Session',
    durationTreated: '2 Targeted Sessions',
    quote: 'I was skeptical about traditional suction therapy until I experienced Fire Cupping under A.K. Goswami’s steady hands. The tight muscular knots along my upper shoulders loosened up remarkably in just two sessions. Highly recommended local practitioner.',
    outcomeHighlight: 'Released persistent shoulder knot tightness',
    date: 'September 2026',
  },
];

export const FAQS = [
  {
    question: 'What therapies are available at AyushKaya?',
    answer: 'We offer all 24 authentic classical therapies: 1. Kati Basti, 2. Janu Basti, 3. Griva Basti, 4. Nabhi Basti, 5. Prasth Basti, 6. Liver Basti, 7. Lung Basti, 8. Shiro Basti, 9. Shiro Abhyang, 10. Shiro Pichu, 11. Shirodhara, 12. Hot Cold Compress, 13. Patar Potli Pind Swedan, 14. Sristhisali Pind Swedan, 15. Fire Cupping, 16. Full Body Massage, 17. Parsal Massage, 18. Abhyang, 19. Leech Therapy, 20. Shiringi Therapy, 21. Nasya, 22. Karandhupan, 23. Karanpuran, and 24. Akshi Tarpan.',
  },
  {
    question: 'How does the Personalized Health Tracking feature work?',
    answer: 'Our Ayurvedic Health Tracking module helps you assess your primary Dosha constitution (Vata, Pitta, Kapha), log daily wellness indicators (stiffness/pain rating, sleep quality, digestive Agni), and track progress across multi-session therapy courses. You can share your tracked health profile directly with practitioner A.K. Goswami.',
  },
  {
    question: 'How can I book a session?',
    answer: 'You can book directly by tapping the WhatsApp button to chat with practitioner A.K. Goswami at 9058989193, or by submitting the Booking Request form on this website. We promptly check the schedule and confirm your preferred slot.',
  },
  {
    question: 'Is home therapy available in Roorkee?',
    answer: 'Yes! Home therapy is one of our most valued services. Practitioner A.K. Goswami brings all necessary medicated oils, dough reservoirs, herbal boluses, and massage accessories to your home anywhere in Roorkee and nearby localities.',
  },
  {
    question: 'How do I choose the right therapy for my needs?',
    answer: 'If you have lower back stiffness, #1 Kati Basti and #13 Patar Potli are popular choices. For stress and deep relaxation, #11 Shirodhara or #18 Abhyang are recommended. For knee mobility, #2 Janu Basti is ideal. For eye strain, #24 Akshi Tarpan is supreme. You can also chat with our AI assistant or take the Dosha health assessment for tailored guidance.',
  },
  {
    question: 'How can I contact practitioner A.K. Goswami?',
    answer: 'You can call or WhatsApp directly on +91 9058989193. We are responsive and happy to answer questions about any therapy before you commit.',
  },
  {
    question: 'Where is AyushKaya located?',
    answer: 'AyushKaya is located in Sainipuram, Roorkee (Uttarakhand). An interactive map and directions link are provided in the Location section of this website.',
  },
];
