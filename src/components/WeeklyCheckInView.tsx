import React, { useState } from 'react';
import { ScreenType } from '../types';

interface WeeklyCheckInViewProps {
  onNavigate: (screen: ScreenType) => void;
  onSubmitCheckIn: (weight: number) => void;
}

export default function WeeklyCheckInView({
  onNavigate,
  onSubmitCheckIn
}: WeeklyCheckInViewProps) {
  const [weight, setWeight] = useState<string>('82.4');
  const [energy, setEnergy] = useState<'poor' | 'fair' | 'good' | 'elite'>('good');
  const [notes, setNotes] = useState<string>('');
  
  // Progress photo states (simulated upload)
  const [photos, setPhotos] = useState<{
    front: string | null;
    side: string | null;
    back: string | null;
  }>({
    front: null,
    side: null,
    back: null
  });

  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    front: false,
    side: false,
    back: false
  });

  const handleSimulatedUpload = (type: 'front' | 'side' | 'back') => {
    setUploading(prev => ({ ...prev, [type]: true }));
    
    setTimeout(() => {
      let url = '';
      if (type === 'front') {
        url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAET0v7EBEZGtao8cJz6p3Rnyilb4ULrlPKgY5UMjS5hl2sxxjeAANs9o4ue5oAh6hF9uHEguS0rQ65nZ23JXZf1weufy_M_sa_B09fli8JHyd0pSoDXKZGg0hVQjLZF4gSzg0nwoPWQ4x9GLuugo2QLgzdYR9Qw2ajoYqhQyTuY06yQzJ50Yc5e4bYX6anYTRN6p54Zy5hMeUp5kQt8QQD6XqvbPAIrqMCl3sGuhBJLSNgbx-VTO5si4NeTlAEVSuO9_VYfUIjxCg';
      } else if (type === 'side') {
        url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWCfdkvbvIDAwl6k-D8jGni0NI5LSSwwVv_tYtz6EAZpeliZaCTIWsCnRMdJjOveB9Ha7TH4RQIhMcSUbG3gQr4MSh1cMRzkJk2WcyKJRob0oO7iBN5C-rw6zGIxbRmcvNdVS8efvarnGZtAQhtsR2p9PFEEvarSlBPlM3oTgw4tPQL3MMaHbm8RNy8vZ3l_xKKxqvgybdgjI_B1RjgLKRpMhT6XuoNS8nKGW7LsZTTEha8Bayae_oueUCb-jhShMMvrxvaVvBAek';
      } else {
        url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkGxK_vALbYFqCfnoo-M6D0XwQvZG3AyaKrnXK0SzpyhcuEEDy3c4NFn_p1YiINbTBWWhWGoPlN6xS-Nzmmvf62GbBA7XoqornEdByv4FZv6BCO3pQJvG516zCdkfMDoPLg77D_aUMPr2oHaH_04YNeptHWiW2NvUbRM7PVNr25MePhJUnAdjzE_s5ERdRPV-tO0FHN8Q01FVsm7NFp6r_lZ7EEpxsYpvzQWyH0sBP6ArqnGr7_s6n2RNWdyizPUH6sPIlnMz3xDw';
      }

      setPhotos(prev => ({ ...prev, [type]: url }));
      setUploading(prev => ({ ...prev, [type]: false }));
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericWeight = parseFloat(weight) || 0;
    onSubmitCheckIn(numericWeight);
    onNavigate('nutrition');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in pb-32">
      {/* Editorial Header */}
      <section className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <h1 className="text-3xl font-extrabold tracking-tight font-headline text-zinc-900">
            Weekly Check-in
          </h1>
          <span className="text-primary font-bold font-headline text-lg italic">
            Week 12
          </span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-primary to-primary-container rounded-full" />
        </div>
      </section>

      {/* Step 1: Biometrics */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold">
            1
          </span>
          <h2 className="text-xl font-bold font-headline tracking-tight text-zinc-900">
            Biometrics
          </h2>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(27,28,28,0.06)] flex flex-col items-center gap-4 relative overflow-hidden border border-zinc-100">
          <div className="absolute top-0 right-0 p-4">
            <span className="material-symbols-outlined text-primary/10 text-6xl rotate-12 select-none">
              monitor_weight
            </span>
          </div>
          
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="weight">
            Current Weight
          </label>
          
          <div className="flex items-baseline justify-center gap-2">
            <input 
              className="w-32 text-5xl font-black font-headline text-center bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-zinc-900"
              id="weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="00.0"
            />
            <span className="text-xl font-bold text-zinc-400">kg</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-secondary-container/5 rounded-full border border-secondary-container/10">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              trending_down
            </span>
            <span className="text-secondary font-bold text-sm">
              -0.8kg since last week
            </span>
          </div>
        </div>
      </section>

      {/* Step 2: Progress Photos */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold">
            2
          </span>
          <h2 className="text-xl font-bold font-headline tracking-tight text-zinc-900">
            Progress Photos
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(['front', 'side', 'back'] as const).map((type) => (
            <div 
              key={type}
              onClick={() => handleSimulatedUpload(type)}
              className="group relative aspect-[3/4] rounded-2xl bg-zinc-100 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-200 hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
            >
              {uploading[type] ? (
                <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                  <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Uploading</span>
                </div>
              ) : photos[type] ? (
                <div className="w-full h-full relative">
                  <img src={photos[type]!} alt={type} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-black/40 px-2 py-0.5 rounded-md">
                      {type}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">
                    add_a_photo
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600">
                    {type}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-zinc-400 text-center leading-relaxed mt-2 font-medium">
          Ensure lighting is consistent with your Week 0 photos for accurate comparison.
        </p>
      </section>

      {/* Step 3: Performance & Recovery */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold">
            3
          </span>
          <h2 className="text-xl font-bold font-headline tracking-tight text-zinc-900">
            Performance &amp; Recovery
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-800 mb-3 font-headline">
              How was your overall energy this week?
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button 
                type="button"
                onClick={() => setEnergy('poor')}
                className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-all active:scale-95 border ${
                  energy === 'poor' 
                    ? 'bg-zinc-900 border-zinc-900 text-white' 
                    : 'bg-zinc-100 border-transparent text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                <span className="text-xl">😔</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">Poor</span>
              </button>

              <button 
                type="button"
                onClick={() => setEnergy('fair')}
                className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-all active:scale-95 border ${
                  energy === 'fair' 
                    ? 'bg-zinc-900 border-zinc-900 text-white' 
                    : 'bg-zinc-100 border-transparent text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                <span className="text-xl">😐</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">Fair</span>
              </button>

              <button 
                type="button"
                onClick={() => setEnergy('good')}
                className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-all active:scale-95 border ${
                  energy === 'good' 
                    ? 'bg-secondary-container/10 border-secondary-container/30 text-secondary' 
                    : 'bg-zinc-100 border-transparent text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                <span className="text-xl">😊</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">Good</span>
              </button>

              <button 
                type="button"
                onClick={() => setEnergy('elite')}
                className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-all active:scale-95 border ${
                  energy === 'elite' 
                    ? 'bg-gradient-to-br from-primary to-primary-container border-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-zinc-100 border-transparent text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                <span className="text-xl">🔥</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">Elite</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-800 mb-3 font-headline" htmlFor="feedback">
              Coach's Notes &amp; Feedback
            </label>
            <textarea 
              className="w-full rounded-2xl bg-zinc-100 border-none focus:ring-2 focus:ring-primary/20 text-zinc-800 p-4 text-sm placeholder:text-zinc-400 min-h-[120px] resize-none"
              id="feedback"
              placeholder="Tell us about your sleep, stress, or any difficulties during workouts..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Floating Submit CTA at the bottom */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none z-40">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl font-bold font-headline text-lg shadow-[0_20px_40px_rgba(54,32,184,0.3)] hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Continue to Nutrition
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </div>
      </footer>
    </form>
  );
}
