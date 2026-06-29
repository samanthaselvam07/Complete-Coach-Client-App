import React, { useState } from 'react';
import { ScreenType } from '../types';
import { INITIAL_SUPPLEMENTS } from '../data';

interface SupplementStackViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function SupplementStackView({
  onNavigate
}: SupplementStackViewProps) {
  const [supplements, setSupplements] = useState(INITIAL_SUPPLEMENTS);

  const toggleChecked = (id: string) => {
    setSupplements(prev => prev.map(supp => {
      if (supp.id === id && !supp.locked) {
        return { ...supp, checked: !supp.checked };
      }
      return supp;
    }));
  };

  // Calculate adherence percentage
  const totalActiveSupps = supplements.filter(s => !s.locked).length;
  const completedSupps = supplements.filter(s => s.checked && !s.locked).length;
  const adherencePercent = totalActiveSupps > 0 ? Math.round((completedSupps / totalActiveSupps) * 100) : 0;

  return (
    <div className="space-y-10 animate-fade-in pb-32">
      {/* Editorial Header */}
      <section className="space-y-6">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          Supplement Stack
        </h1>

        {/* Adherence card */}
        <div className="bg-zinc-100 rounded-3xl p-6 relative overflow-hidden border border-zinc-200/50">
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                Daily Status
              </p>
              <h2 className="font-headline text-2xl font-extrabold text-zinc-800">
                Stack Adherence
              </h2>
            </div>
            <span className="text-3xl font-black text-primary italic font-headline">
              {adherencePercent}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3 w-full bg-zinc-200 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500" 
              style={{ width: `${adherencePercent}%` }}
            />
          </div>

          <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed">
            {adherencePercent === 100 
              ? "Phenomenal job! You've completed your supplement stack for today." 
              : `You're ${totalActiveSupps - completedSupps} supplements away from your daily goal. Keep the momentum.`}
          </p>
        </div>
      </section>

      {/* Kinetic Tip Card */}
      <section>
        <div className="bg-gradient-to-br from-secondary-container to-secondary rounded-3xl p-6 shadow-xl shadow-secondary-container/20 flex gap-4 items-start border border-orange-500/10">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-white font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-white font-headline font-extrabold text-lg leading-tight">
              Hydration Tip
            </h3>
            <p className="text-white/95 text-sm font-medium leading-relaxed">
              Kickstart your cellular energy with 500ml water + pinch of sea salt and lemon before your morning stack.
            </p>
          </div>
        </div>
      </section>

      {/* Group timing lists */}
      <section className="space-y-10">
        {/* Morning */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-secondary-container text-xl font-bold">
              wb_sunny
            </span>
            <h3 className="font-headline text-xl font-black tracking-tight text-zinc-900">
              Morning
            </h3>
          </div>

          <div className="space-y-4">
            {supplements.filter(s => s.timing === 'Morning').map((supp) => (
              <div 
                key={supp.id}
                onClick={() => toggleChecked(supp.id)}
                className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(27,28,28,0.04)] flex items-center justify-between border border-transparent hover:border-primary/10 transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl font-bold">{supp.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-800 leading-tight">{supp.name}</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {supp.dosage} • <span className="font-bold text-secondary">{supp.note}</span>
                    </p>
                  </div>
                </div>

                <span className={`material-symbols-outlined text-3xl transition-colors ${
                  supp.checked ? 'text-primary' : 'text-zinc-200'
                }`} style={{ fontVariationSettings: supp.checked ? "'FILL' 1" : "'FILL' 0" }}>
                  check_circle
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Workout */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-xl font-bold">
              fitness_center
            </span>
            <h3 className="font-headline text-xl font-black tracking-tight text-zinc-900">
              Pre-Workout
            </h3>
          </div>

          <div className="space-y-4">
            {supplements.filter(s => s.timing === 'Pre-Workout').map((supp) => (
              <div 
                key={supp.id}
                onClick={() => toggleChecked(supp.id)}
                className={`bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(27,28,28,0.04)] flex items-center justify-between border active:scale-[0.98] cursor-pointer transition-all ${
                  supp.checked ? 'border-transparent' : 'border-primary/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl font-bold">{supp.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-800 leading-tight">{supp.name}</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">{supp.dosage} • {supp.note}</p>
                  </div>
                </div>

                {supp.checked ? (
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                ) : (
                  <button 
                    type="button"
                    className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:bg-primary hover:text-white transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined font-bold text-sm">add</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Evening (Locked) */}
        <div className="space-y-4 opacity-60">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-zinc-400 text-xl font-bold">
              dark_mode
            </span>
            <h3 className="font-headline text-xl font-black tracking-tight text-zinc-400">
              Evening
            </h3>
          </div>

          <div className="bg-zinc-100/50 rounded-3xl p-5 flex items-center justify-between border border-dashed border-zinc-200">
            {supplements.filter(s => s.timing === 'Evening').map((supp) => (
              <React.Fragment key={supp.id}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center text-zinc-400">
                    <span className="material-symbols-outlined text-xl font-bold">{supp.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-400 leading-tight">{supp.name}</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {supp.dosage} • <span className="italic font-semibold">{supp.note}</span>
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-zinc-300 text-xl font-bold">
                  lock
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
