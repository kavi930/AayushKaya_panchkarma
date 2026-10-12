import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  Sparkles,
  CheckCircle2,
  Calendar,
  Send,
  PlusCircle,
  TrendingDown,
  Info,
  Clock,
  Flame,
  Moon,
  Droplets,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { THERAPIES, BRAND, Therapy } from '../data/ayushkayaData';

interface HealthLog {
  id: string;
  date: string;
  targetArea: string;
  painRating: number; // 1-10
  digestionAgni: 'Sama (Balanced)' | 'Vishama (Irregular/Bloating)' | 'Tikshna (Intense/Acidic)' | 'Manda (Slow/Sluggish)';
  sleepQuality: 'Deep & Restful' | 'Moderate' | 'Disturbed/Light' | 'Insomnia';
  energyLevel: number; // 1-5
  notes?: string;
  pairedTherapy?: string;
}

interface TherapyCourse {
  id: string;
  therapyName: string;
  therapyNumber: number;
  totalSessions: number;
  completedSessions: number;
  sessionType: 'Clinic' | 'Home Therapy';
  targetGoal: string;
  startDate: string;
}

interface PersonalizedHealthTrackingProps {
  onSelectTherapy: (therapy: Therapy) => void;
  onBookTherapy: (therapyName: string) => void;
}

export const PersonalizedHealthTracking: React.FC<PersonalizedHealthTrackingProps> = ({
  onSelectTherapy,
  onBookTherapy,
}) => {
  const [activeTab, setActiveTab] = useState<'assessment' | 'dailyTracker' | 'courses'>('assessment');

  // --- DOSHA ASSESSMENT STATE ---
  const [answers, setAnswers] = useState<{ [key: string]: 'vata' | 'pitta' | 'kapha' }>({
    q1: 'vata',
    q2: 'vata',
    q3: 'pitta',
    q4: 'vata',
    q5: 'vata',
  });
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const calculateDoshas = () => {
    let v = 0, p = 0, k = 0;
    Object.values(answers).forEach((val) => {
      if (val === 'vata') v++;
      if (val === 'pitta') p++;
      if (val === 'kapha') k++;
    });
    const total = v + p + k || 1;
    return {
      vata: Math.round((v / total) * 100),
      pitta: Math.round((p / total) * 100),
      kapha: Math.round((k / total) * 100),
      dominant: v >= p && v >= k ? 'Vata' : p >= k ? 'Pitta' : 'Kapha',
    };
  };

  const doshaScore = calculateDoshas();

  // Recommendations based on dominant dosha
  const getRecommendedTherapies = () => {
    if (doshaScore.dominant === 'Vata') {
      return [
        THERAPIES.find((t) => t.id === 'kati-basti')!, // #1
        THERAPIES.find((t) => t.id === 'shirodhara')!, // #11
        THERAPIES.find((t) => t.id === 'patar-potli-pind-awedan')!, // #13
        THERAPIES.find((t) => t.id === 'abhyang')!, // #18
      ].filter(Boolean);
    } else if (doshaScore.dominant === 'Pitta') {
      return [
        THERAPIES.find((t) => t.id === 'shirodhara')!, // #11
        THERAPIES.find((t) => t.id === 'akshi-tarpan')!, // #24
        THERAPIES.find((t) => t.id === 'liver-basti')!, // #6
        THERAPIES.find((t) => t.id === 'shiro-pichu')!, // #10
      ].filter(Boolean);
    } else {
      return [
        THERAPIES.find((t) => t.id === 'fire-cupping')!, // #15
        THERAPIES.find((t) => t.id === 'sristhisali-pind-swedan')!, // #14
        THERAPIES.find((t) => t.id === 'nasya')!, // #21
        THERAPIES.find((t) => t.id === 'nabhi-basti')!, // #4
      ].filter(Boolean);
    }
  };

  // --- DAILY TRACKER STATE ---
  const [logs, setLogs] = useState<HealthLog[]>(() => {
    const saved = localStorage.getItem('ayushkaya_health_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'initial-1',
        date: 'Yesterday',
        targetArea: 'Lower Back (Lumbar)',
        painRating: 6,
        digestionAgni: 'Vishama (Irregular/Bloating)',
        sleepQuality: 'Disturbed/Light',
        energyLevel: 3,
        notes: 'Noticeable stiffness in lower back after prolonged chair sitting.',
        pairedTherapy: '1. Kati Basti & 13. Patar Potli',
      },
    ];
  });

  const [newTargetArea, setNewTargetArea] = useState('Lower Back (Lumbar)');
  const [newPainRating, setNewPainRating] = useState(5);
  const [newAgni, setNewAgni] = useState<HealthLog['digestionAgni']>('Vishama (Irregular/Bloating)');
  const [newSleep, setNewSleep] = useState<HealthLog['sleepQuality']>('Moderate');
  const [newEnergy, setNewEnergy] = useState(3);
  const [newNotes, setNewNotes] = useState('');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const paired =
      newTargetArea.includes('Back') ? '1. Kati Basti / 5. Prasth Basti' :
      newTargetArea.includes('Knee') ? '2. Janu Basti / 14. Sristhisali Pind Swedan' :
      newTargetArea.includes('Neck') ? '3. Griva Basti / 9. Shiro Abhyang' :
      newTargetArea.includes('Head') || newTargetArea.includes('Stress') ? '11. Shirodhara / 10. Shiro Pichu' :
      newTargetArea.includes('Eye') ? '24. Akshi Tarpan' :
      newTargetArea.includes('Ear') ? '22. Karandhupan / 23. Karanpuran' :
      '18. Abhyang / 16. Full Body Massage';

    const newLog: HealthLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      targetArea: newTargetArea,
      painRating: newPainRating,
      digestionAgni: newAgni,
      sleepQuality: newSleep,
      energyLevel: newEnergy,
      notes: newNotes,
      pairedTherapy: paired,
    };

    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('ayushkaya_health_logs', JSON.stringify(updated));
    setNewNotes('');
  };

  // --- THERAPY COURSES STATE ---
  const [courses, setCourses] = useState<TherapyCourse[]>(() => {
    const saved = localStorage.getItem('ayushkaya_courses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'course-1',
        therapyName: 'Kati Basti',
        therapyNumber: 1,
        totalSessions: 3,
        completedSessions: 1,
        sessionType: 'Home Therapy',
        targetGoal: 'Lower back stiffness relief & lumbar mobility',
        startDate: 'Current Course',
      },
      {
        id: 'course-2',
        therapyName: 'Shirodhara',
        therapyNumber: 11,
        totalSessions: 3,
        completedSessions: 0,
        sessionType: 'Clinic',
        targetGoal: 'Sleep rhythm restoration & stress de-escalation',
        startDate: 'Planned',
      },
    ];
  });

  const handleToggleCourseSession = (courseId: string) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        const next = c.completedSessions >= c.totalSessions ? 0 : c.completedSessions + 1;
        return { ...c, completedSessions: next };
      }
      return c;
    });
    setCourses(updated);
    localStorage.setItem('ayushkaya_courses', JSON.stringify(updated));
  };

  const handleShareAssessmentWhatsApp = () => {
    const text = encodeURIComponent(
      `*AyushKaya Ayurvedic Health Profile*\n\n` +
      `*Dominant Constitution:* ${doshaScore.dominant}-predominant (Vata: ${doshaScore.vata}%, Pitta: ${doshaScore.pitta}%, Kapha: ${doshaScore.kapha}%)\n` +
      `*Current Target Area:* ${newTargetArea}\n` +
      `*Current Discomfort Level:* ${newPainRating}/10\n` +
      `*Digestive Agni:* ${newAgni}\n` +
      `*Sleep Quality:* ${newSleep}\n` +
      `*Interested Therapies:* ${getRecommendedTherapies().map(t => `#${t.number} ${t.name}`).join(', ')}\n\n` +
      `Namaste A.K. Goswami ji, please guide me on suitable session scheduling for clinic/home therapy in Roorkee.`
    );
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleRequestAiAnalysis = async () => {
    setIsAiAnalyzing(true);
    try {
      const response = await fetch('/api/health-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryConcern: newTargetArea,
          doshaAnswers: answers,
          painLevel: newPainRating,
          sleepQuality: newSleep,
          digestionState: newAgni,
        }),
      });
      const data = await response.json();
      if (data.analysis) {
        setAiAdvice(
          `${data.analysis.doshaAnalysis || ''} Recommended: ${
            data.analysis.recommendedTherapies?.map((t: any) => t.name).join(', ') || ''
          }. Tips: ${data.analysis.lifestyleTips?.join(' • ') || ''}`
        );
      }
    } catch (err) {
      setAiAdvice(
        'Based on classical Ayurveda, regular warm oil retention therapies like Kati Basti (#1) or Janu Basti (#2) combined with Patar Potli Swedan (#13) provide deep structural relief for persistent Vata stiffness.'
      );
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  return (
    <section id="health-tracking" className="py-20 bg-gradient-to-b from-[#F7F4EC] to-[#FBF9F4] border-b border-[#0E2A21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Ayurvedic Wellness & Personalized Health Tracking
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2A21] tracking-tight">
            Personal Health & Therapy Tracker
          </h2>
          <p className="text-base text-[#465A4F] leading-relaxed">
            Monitor your bodily dosha equilibrium, track discomfort reduction, and receive tailored matches from our 24 classical Panchkarma therapies.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#EAE4D7] rounded-2xl shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'assessment'
                  ? 'bg-white text-[#0E2A21] shadow-md'
                  : 'text-[#465A4F] hover:text-[#0E2A21]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>1. Dosha Assessment</span>
            </button>
            <button
              onClick={() => setActiveTab('dailyTracker')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dailyTracker'
                  ? 'bg-white text-[#0E2A21] shadow-md'
                  : 'text-[#465A4F] hover:text-[#0E2A21]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#059669]" />
              <span>2. Daily Wellness Log</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'courses'
                  ? 'bg-white text-[#0E2A21] shadow-md'
                  : 'text-[#465A4F] hover:text-[#0E2A21]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#8C6B1B]" />
              <span>3. Panchkarma Courses</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DOSHA ASSESSMENT */}
        {activeTab === 'assessment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Questions Panel */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#0E2A21]/10 shadow-sm space-y-6">
              <div className="border-b border-[#0E2A21]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#0E2A21]">
                  Prakriti & Vikriti Assessment
                </h3>
                <p className="text-xs sm:text-sm text-[#465A4F] mt-1">
                  Answer 5 quick questions on physical tendencies, joint comfort, digestion, and sleep to determine your Ayurvedic profile.
                </p>
              </div>

              {/* Question 1 */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A21]">
                  1. Body Frame & Joint Sensations
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'vata', label: 'Slender frame, prone to joint dryness & cracking' },
                    { id: 'pitta', label: 'Medium athletic frame, warm joints, prone to inflammation' },
                    { id: 'kapha', label: 'Broad sturdy frame, heavy joints, prone to stiffness' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, q1: opt.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.q1 === opt.id
                          ? 'border-[#059669] bg-[#059669]/5 font-semibold text-[#0E2A21]'
                          : 'border-black/10 hover:border-black/20 text-[#465A4F]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A21]">
                  2. Digestion & Appetite (Agni)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'vata', label: 'Irregular appetite, prone to gas, bloating & constipation' },
                    { id: 'pitta', label: 'Sharp strong hunger, cannot skip meals, prone to acidity' },
                    { id: 'kapha', label: 'Slow steady hunger, feel heavy after small meals' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, q2: opt.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.q2 === opt.id
                          ? 'border-[#059669] bg-[#059669]/5 font-semibold text-[#0E2A21]'
                          : 'border-black/10 hover:border-black/20 text-[#465A4F]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A21]">
                  3. Sleep Quality & Mental Tendencies
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'vata', label: 'Light interrupted sleep, racing thoughts, insomnia' },
                    { id: 'pitta', label: 'Moderate sleep, wake up alert, intense dreams' },
                    { id: 'kapha', label: 'Deep heavy sleep, difficult to awaken in the morning' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, q3: opt.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.q3 === opt.id
                          ? 'border-[#059669] bg-[#059669]/5 font-semibold text-[#0E2A21]'
                          : 'border-black/10 hover:border-black/20 text-[#465A4F]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A21]">
                  4. Weather & Temperature Sensitivity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'vata', label: 'Dislikes cold & dry wind; deeply loves warm oil & baths' },
                    { id: 'pitta', label: 'Dislikes direct heat/sun; easily flushes & sweats' },
                    { id: 'kapha', label: 'Dislikes damp rainy chill; thrives in warm dry climate' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, q4: opt.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.q4 === opt.id
                          ? 'border-[#059669] bg-[#059669]/5 font-semibold text-[#0E2A21]'
                          : 'border-black/10 hover:border-black/20 text-[#465A4F]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A21]">
                  5. Primary Physical Complaint
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'vata', label: 'Lower back (Kati), knees (Janu), or neck (Griva) stiffness' },
                    { id: 'pitta', label: 'Screen eye fatigue, acidity, or emotional stress' },
                    { id: 'kapha', label: 'Heavy limbs, sluggish digestion, or sinus dampness' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, q5: opt.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.q5 === opt.id
                          ? 'border-[#059669] bg-[#059669]/5 font-semibold text-[#0E2A21]'
                          : 'border-black/10 hover:border-black/20 text-[#465A4F]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results & Recommendation Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Score Card */}
              <div className="bg-[#0E2A21] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-[#D4AF37]/30 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Your Constitution Profile
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#059669] text-white text-[11px] font-bold">
                    {doshaScore.dominant} Dominant
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white">
                  {doshaScore.dominant}-Predominant State
                </h3>

                {/* Progress bars */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#D8E6DE] mb-1">
                      <span>Vata (Air & Ether — Mobility & Dryness)</span>
                      <span className="font-bold text-[#A7F3D0]">{doshaScore.vata}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#A7F3D0] h-full transition-all duration-500 rounded-full"
                        style={{ width: `${doshaScore.vata}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#D8E6DE] mb-1">
                      <span>Pitta (Fire & Water — Metabolism & Heat)</span>
                      <span className="font-bold text-[#FDE047]">{doshaScore.pitta}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#FDE047] h-full transition-all duration-500 rounded-full"
                        style={{ width: `${doshaScore.pitta}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#D8E6DE] mb-1">
                      <span>Kapha (Earth & Water — Structure & Lubrication)</span>
                      <span className="font-bold text-[#93C5FD]">{doshaScore.kapha}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#93C5FD] h-full transition-all duration-500 rounded-full"
                        style={{ width: `${doshaScore.kapha}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Insight summary */}
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs text-[#E3EDE8] leading-relaxed">
                  {doshaScore.dominant === 'Vata' && (
                    <p>
                      Your elevated Vata causes quick fatigue, dry or cracking joints, and mental restlessness. Warm oil pooling like <strong>Kati Basti (#1)</strong> and herbal fomentations like <strong>Patar Potli (#13)</strong> are deeply restorative for you.
                    </p>
                  )}
                  {doshaScore.dominant === 'Pitta' && (
                    <p>
                      Your elevated Pitta manifests as internal heat, eye strain, and digestive intensity. Cooling, rhythm-based therapies like <strong>Shirodhara (#11)</strong> and <strong>Akshi Tarpan (#24)</strong> help restore soothing balance.
                    </p>
                  )}
                  {doshaScore.dominant === 'Kapha' && (
                    <p>
                      Your elevated Kapha can cause heaviness in limbs, congestion, and slow metabolism. Stimulating therapies like <strong>Fire Cupping (#15)</strong> and <strong>Nasya (#21)</strong> awaken circulation and lighten tissues.
                    </p>
                  )}
                </div>

                {/* WhatsApp Sync Button */}
                <button
                  onClick={handleShareAssessmentWhatsApp}
                  className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Profile to A.K. Goswami (WhatsApp)</span>
                </button>
              </div>

              {/* Matched Therapies from the 24 modalities */}
              <div className="bg-white rounded-2xl p-6 border border-[#0E2A21]/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#0E2A21]/10 pb-3">
                  <h4 className="font-serif text-lg font-bold text-[#0E2A21]">
                    Tailored Therapies for You
                  </h4>
                  <span className="text-[11px] font-semibold text-[#8C6B1B]">
                    From the 24 AyushKaya Modalities
                  </span>
                </div>

                <div className="space-y-3">
                  {getRecommendedTherapies().map((th) => (
                    <div
                      key={th.id}
                      className="p-3 rounded-xl border border-black/5 hover:border-[#059669]/30 bg-[#FBF9F4] flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#0E2A21] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {th.number}
                        </span>
                        <div>
                          <h5 className="font-serif text-sm font-bold text-[#0E2A21] group-hover:text-[#059669] transition-colors">
                            {th.name}
                          </h5>
                          <p className="text-[11px] text-[#465A4F] line-clamp-1">
                            {th.bodyTarget}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onSelectTherapy(th)}
                          className="px-2 py-1 text-[11px] text-[#0E2A21] hover:underline"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onBookTherapy(th.name)}
                          className="px-2.5 py-1 bg-[#059669] hover:bg-[#047857] text-white text-[11px] font-semibold rounded-lg shadow-xs"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAILY WELLNESS & SYMPTOM LOGGER */}
        {activeTab === 'dailyTracker' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Log Input Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#0E2A21]/10 shadow-sm space-y-5">
              <div className="border-b border-[#0E2A21]/10 pb-3">
                <h3 className="font-serif text-2xl font-bold text-[#0E2A21]">
                  Log Daily Health Status
                </h3>
                <p className="text-xs text-[#465A4F] mt-1">
                  Track your discomfort intensity, digestive fire, and sleep quality over time.
                </p>
              </div>

              <form onSubmit={handleAddLog} className="space-y-4">
                {/* Target Body Area */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E2A21] mb-1">
                    Primary Area of Focus / Discomfort
                  </label>
                  <select
                    value={newTargetArea}
                    onChange={(e) => setNewTargetArea(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#0E2A21]/15 rounded-xl text-[#0E2A21] focus:outline-none focus:border-[#059669]"
                  >
                    <option value="Lower Back (Lumbar) - #1 Kati Basti">Lower Back (Lumbar) — #1 Kati Basti</option>
                    <option value="Knee Joints - #2 Janu Basti">Knee Joints — #2 Janu Basti</option>
                    <option value="Cervical Neck & Trapezius - #3 Griva Basti">Cervical Neck & Trapezius — #3 Griva Basti</option>
                    <option value="Umbilical & Digestion - #4 Nabhi Basti">Umbilical & Core Digestion — #4 Nabhi Basti</option>
                    <option value="Mid-Spine Vertebrae - #5 Prasth Basti">Mid-Spine Vertebrae — #5 Prasth Basti</option>
                    <option value="Head, Stress & Sleep - #11 Shirodhara">Head, Stress & Sleep — #11 Shirodhara</option>
                    <option value="Full Body Stiffness - #13 Patar Potli">Full Body Stiffness — #13 Patar Potli</option>
                    <option value="Eye & Screen Fatigue - #24 Akshi Tarpan">Eye & Screen Fatigue — #24 Akshi Tarpan</option>
                    <option value="Ear Fullness - #22 Karandhupan / #23 Karanpuran">Ear Fullness — #22 Karandhupan / #23 Karanpuran</option>
                    <option value="Muscle Knots - #15 Fire Cupping">Muscle Knots — #15 Fire Cupping</option>
                  </select>
                </div>

                {/* Discomfort / Pain Level Slider (1-10) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-[#0E2A21]">
                      Discomfort / Stiffness Intensity
                    </label>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      newPainRating <= 3 ? 'bg-emerald-100 text-emerald-800' :
                      newPainRating <= 6 ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {newPainRating} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newPainRating}
                    onChange={(e) => setNewPainRating(Number(e.target.value))}
                    className="w-full accent-[#059669] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B7E73] mt-1">
                    <span>1 (Mild stiffness)</span>
                    <span>5 (Noticeable ache)</span>
                    <span>10 (Severe restriction)</span>
                  </div>
                </div>

                {/* Digestive Agni */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E2A21] mb-1">
                    Digestive Fire (Agni)
                  </label>
                  <select
                    value={newAgni}
                    onChange={(e) => setNewAgni(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#0E2A21]/15 rounded-xl text-[#0E2A21] focus:outline-none focus:border-[#059669]"
                  >
                    <option value="Sama (Balanced)">Sama (Balanced & Smooth)</option>
                    <option value="Vishama (Irregular/Bloating)">Vishama (Variable / Gas & Bloating)</option>
                    <option value="Tikshna (Intense/Acidic)">Tikshna (Sharp / Acidic Heat)</option>
                    <option value="Manda (Slow/Sluggish)">Manda (Sluggish / Heavy after meals)</option>
                  </select>
                </div>

                {/* Sleep Quality */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E2A21] mb-1">
                    Sleep Quality Last Night
                  </label>
                  <select
                    value={newSleep}
                    onChange={(e) => setNewSleep(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#0E2A21]/15 rounded-xl text-[#0E2A21] focus:outline-none focus:border-[#059669]"
                  >
                    <option value="Deep & Restful">Deep & Restful</option>
                    <option value="Moderate">Moderate (6–7 hours)</option>
                    <option value="Disturbed/Light">Disturbed / Restless</option>
                    <option value="Insomnia">Insomnia / Delayed Sleep</option>
                  </select>
                </div>

                {/* Energy Level (1 to 5) */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E2A21] mb-1">
                    Energy Level: {newEnergy} / 5
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewEnergy(num)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          newEnergy === num
                            ? 'bg-[#0E2A21] text-white border-[#0E2A21]'
                            : 'bg-[#FBF9F4] border-black/10 text-[#465A4F]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E2A21] mb-1">
                    Notes / Daily Observations
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. Worked at laptop 8 hours; felt stiffness after walking stairs..."
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#0E2A21]/15 rounded-xl text-[#0E2A21] focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save Daily Health Entry</span>
                </button>
              </form>
            </div>

            {/* Logs List & Analysis */}
            <div className="lg:col-span-7 space-y-6">
              {/* AI Analysis Quick Advice Bar */}
              <div className="bg-[#13382C] text-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Ayush Vaidya AI Diagnostic Assistant</span>
                  </div>
                  <p className="text-xs text-[#E3EDE8] mt-1 max-w-md">
                    {aiAdvice || 'Analyze your daily log metrics to receive customized Ayurvedic herbs and therapy suggestions.'}
                  </p>
                </div>
                <button
                  onClick={handleRequestAiAnalysis}
                  disabled={isAiAnalyzing}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#c49f2b] disabled:opacity-50 text-[#0E2A21] rounded-xl font-bold text-xs whitespace-nowrap shadow-sm transition-all"
                >
                  {isAiAnalyzing ? 'Analyzing...' : 'Get Ayurvedic Advice'}
                </button>
              </div>

              {/* Logs History Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#0E2A21]/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#0E2A21]/10 pb-3">
                  <h4 className="font-serif text-xl font-bold text-[#0E2A21]">
                    Health Entry History
                  </h4>
                  <span className="text-xs text-[#465A4F]">
                    {logs.length} Recorded Entries
                  </span>
                </div>

                {logs.length === 0 ? (
                  <p className="text-xs text-[#6B7E73] py-4 text-center">
                    No entries logged yet. Add your first daily wellness log above!
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 rounded-xl border border-black/5 bg-[#FBF9F4] space-y-2.5 hover:border-[#059669]/30 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0E2A21]">
                            {log.targetArea}
                          </span>
                          <span className="text-[10px] text-[#8C6B1B] font-medium">
                            {log.date}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            log.painRating <= 3 ? 'bg-emerald-100 text-emerald-800' :
                            log.painRating <= 6 ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            Discomfort: {log.painRating}/10
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium">
                            Agni: {log.digestionAgni.split(' ')[0]}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-medium">
                            Sleep: {log.sleepQuality}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 font-medium">
                            Energy: {log.energyLevel}/5
                          </span>
                        </div>

                        {log.notes && (
                          <p className="text-xs text-[#465A4F] italic border-l-2 border-[#D4AF37] pl-2.5">
                            "{log.notes}"
                          </p>
                        )}

                        {log.pairedTherapy && (
                          <div className="pt-1 flex items-center justify-between text-xs border-t border-black/5">
                            <span className="text-[#059669] font-medium text-[11px]">
                              Recommended Therapy: {log.pairedTherapy}
                            </span>
                            <button
                              onClick={() => onBookTherapy(log.pairedTherapy?.split('/')[0]?.trim() || 'Kati Basti')}
                              className="text-[11px] font-bold text-[#0E2A21] hover:text-[#059669] underline"
                            >
                              Book Slot
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PANCHKARMA COURSES & REGIMEN */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0E2A21]/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0E2A21]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0E2A21]">
                    Panchkarma Therapy Regimen & Progress
                  </h3>
                  <p className="text-xs sm:text-sm text-[#465A4F] mt-1">
                    Authentic Ayurvedic therapies are most impactful when administered in traditional 3-session or 5-session cycles.
                  </p>
                </div>
                <button
                  onClick={() => onBookTherapy('Kati Basti')}
                  className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-xl shadow-xs transition-all shrink-0"
                >
                  Start New Therapy Course
                </button>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => {
                  const percent = Math.round((course.completedSessions / course.totalSessions) * 100);
                  return (
                    <div
                      key={course.id}
                      className="p-6 rounded-2xl border border-[#0E2A21]/15 bg-[#FBF9F4] flex flex-col justify-between space-y-4 shadow-2xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#0E2A21] text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
                            #{course.therapyNumber} Classical Modality
                          </span>
                          <span className="text-xs text-[#8C6B1B] font-semibold">
                            {course.sessionType} (Roorkee)
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif text-xl font-bold text-[#0E2A21]">
                            {course.therapyName} Course
                          </h4>
                          <p className="text-xs text-[#465A4F] mt-0.5">
                            Goal: {course.targetGoal}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between text-xs font-semibold text-[#0E2A21]">
                            <span>Progress</span>
                            <span>{course.completedSessions} of {course.totalSessions} Sessions ({percent}%)</span>
                          </div>
                          <div className="w-full bg-black/10 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-[#059669] h-full rounded-full transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>

                        {/* Session check bubbles */}
                        <div className="flex items-center gap-2 pt-2">
                          {Array.from({ length: course.totalSessions }).map((_, idx) => {
                            const isDone = idx < course.completedSessions;
                            return (
                              <div
                                key={idx}
                                className={`flex-1 py-2 rounded-xl text-center text-xs font-bold border transition-all ${
                                  isDone
                                    ? 'bg-[#059669] text-white border-[#059669]'
                                    : 'bg-white text-[#465A4F] border-black/10'
                                }`}
                              >
                                {isDone ? `✓ Session ${idx + 1}` : `Session ${idx + 1}`}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-black/5 flex items-center justify-between gap-3">
                        <button
                          onClick={() => handleToggleCourseSession(course.id)}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-black/5 border border-black/10 text-xs font-semibold text-[#0E2A21] transition-all"
                        >
                          {course.completedSessions < course.totalSessions ? '+ Mark Session Done' : 'Reset Progress'}
                        </button>

                        <button
                          onClick={() => onBookTherapy(course.therapyName)}
                          className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                        >
                          Book Next Session
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
