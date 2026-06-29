import React, { useState } from 'react';
import { ScreenType } from '../types';

interface DailyCheckInViewProps {
  onNavigate: (screen: ScreenType) => void;
  waterIntake: number;
  onAddWater: (amount: number) => void;
  onSubmitDailyCheckIn: () => void;
}

export default function DailyCheckInView({
  onNavigate,
  waterIntake,
  onAddWater,
  onSubmitDailyCheckIn
}: DailyCheckInViewProps) {
  const [energy, setEnergy] = useState<'low' | 'neutral' | 'great' | 'peak'>('great');
  const [sleep, setSleep] = useState<number>(7.5);
  const [steps, setSteps] = useState<number>(8432);

  const stepsTarget = 10000;
  const stepsPercentage = Math.min((steps / stepsTarget) * 100, 100);
  const stepsCircumference = 2 * Math.PI * 34; // r=34
  const strokeDashoffset = stepsCircumference - (stepsPercentage / 100) * stepsCircumference;

  const handleComplete = () => {
    onSubmitDailyCheckIn();
    onNavigate('analytics');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-32">
      {/* Header Section */}
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline leading-tight text-zinc-900">
          Daily Check-in
        </h1>
        <p className="text-zinc-500 font-medium text-sm">
          Precision is the bridge between goals and results.
        </p>
      </header>

      {/* Energy Level selection */}
      <section className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,28,28,0.04)] space-y-6 border border-zinc-100">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-headline">
          How is your energy?
        </h2>
        
        <div className="flex justify-between items-center px-1 sm:px-2">
          {/* Low */}
          <button 
            type="button"
            onClick={() => setEnergy('low')}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl group-active:scale-95 transition-all ${
              energy === 'low' 
                ? 'bg-zinc-900 text-white scale-110 shadow-lg' 
                : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
            }`}>
              😔
            </div>
            <span className={`text-[10px] font-bold font-headline ${
              energy === 'low' ? 'text-zinc-900' : 'text-zinc-400'
            }`}>
              Low
            </span>
          </button>

          {/* Neutral */}
          <button 
            type="button"
            onClick={() => setEnergy('neutral')}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl group-active:scale-95 transition-all ${
              energy === 'neutral' 
                ? 'bg-zinc-900 text-white scale-110 shadow-lg' 
                : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
            }`}>
              😐
            </div>
            <span className={`text-[10px] font-bold font-headline ${
              energy === 'neutral' ? 'text-zinc-900' : 'text-zinc-400'
            }`}>
              Neutral
            </span>
          </button>

          {/* Great */}
          <button 
            type="button"
            onClick={() => setEnergy('great')}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl group-active:scale-95 transition-all ring-4 ${
              energy === 'great' 
                ? 'bg-primary-container text-white scale-110 shadow-xl shadow-primary/30 ring-primary/20' 
                : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 ring-transparent'
            }`}>
              😊
            </div>
            <span className={`text-[10px] font-bold font-headline ${
              energy === 'great' ? 'text-primary font-black' : 'text-zinc-400'
            }`}>
              Great
            </span>
          </button>

          {/* Peak */}
          <button 
            type="button"
            onClick={() => setEnergy('peak')}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl group-active:scale-95 transition-all ${
              energy === 'peak' 
                ? 'bg-gradient-to-br from-secondary-container to-secondary text-white scale-110 shadow-lg shadow-secondary/20' 
                : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
            }`}>
              🔥
            </div>
            <span className={`text-[10px] font-bold font-headline ${
              energy === 'peak' ? 'text-secondary font-black' : 'text-zinc-400'
            }`}>
              Peak
            </span>
          </button>
        </div>
      </section>

      {/* Bento Grid: Hydration & Sleep */}
      <section className="grid grid-cols-2 gap-4">
        {/* Hydration Card */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(27,28,28,0.04)] flex flex-col justify-between aspect-square border border-zinc-100">
          <div>
            <span className="material-symbols-outlined text-primary mb-2 text-2xl font-bold">
              water_drop
            </span>
            <h3 className="font-headline font-black text-xl text-zinc-900">
              {waterIntake.toFixed(1)}
              <span className="text-sm font-medium text-zinc-400">/3L</span>
            </h3>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
              Hydration
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => onAddWater(0.25)}
            className="w-full py-3 bg-primary text-white rounded-2xl font-headline font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            250ml
          </button>
        </div>

        {/* Sleep Card */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(27,28,28,0.04)] flex flex-col justify-between aspect-square border border-zinc-100">
          <div>
            <span className="material-symbols-outlined text-secondary mb-2 text-2xl font-bold">
              bedtime
            </span>
            <h3 className="font-headline font-black text-xl text-zinc-900">
              {sleep.toFixed(1)}
              <span className="text-sm font-medium text-zinc-400">hrs</span>
            </h3>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
              Sleep Quality
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-secondary-container/10 px-3 py-1.5 rounded-full border border-secondary-container/10">
            <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-[9px] font-black text-secondary uppercase tracking-wide">
              High Recovery
            </span>
          </div>
        </div>
      </section>

      {/* Daily Steps Activity Card */}
      <section className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,28,28,0.04)] relative overflow-hidden border border-zinc-100">
        <div className="flex justify-between items-center relative z-10">
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-headline">
              Activity
            </p>
            <h3 className="text-3xl font-black font-headline text-zinc-900">
              {steps.toLocaleString()}
              <span className="text-sm font-medium text-zinc-400"> / 10k</span>
            </h3>
            <p className="text-xs font-semibold text-zinc-500 italic">
              Almost at your daily goal!
            </p>
          </div>

          {/* Steps circular SVG progress bar */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle 
                className="text-zinc-100"
                cx="40" 
                cy="40" 
                fill="transparent" 
                r="34" 
                stroke="currentColor" 
                strokeWidth="6" 
              />
              <circle 
                className="text-primary"
                cx="40" 
                cy="40" 
                fill="transparent" 
                r="34" 
                stroke="currentColor" 
                strokeDasharray={stepsCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round" 
                strokeWidth="6" 
              />
            </svg>
            <span className="absolute material-symbols-outlined text-primary text-xl font-bold">
              directions_run
            </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Nutrition Snapshot Section */}
      <section className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,28,28,0.04)] space-y-6 border border-zinc-100">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-headline">
            Nutrition
          </h2>
          <span className="material-symbols-outlined text-zinc-400">
            restaurant
          </span>
        </div>

        <div className="space-y-5">
          {/* Protein */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide">
              <span className="text-zinc-500">Protein</span>
              <span className="text-zinc-800 font-bold">145g / 180g</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
            </div>
          </div>

          {/* Carbs */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide">
              <span className="text-zinc-500">Carbs</span>
              <span className="text-zinc-800 font-bold">210g / 250g</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '72%' }} />
            </div>
          </div>

          {/* Fats */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide">
              <span className="text-zinc-500">Fats</span>
              <span className="text-zinc-800 font-bold">48g / 65g</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-500 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Submit Check-In button */}
      <div className="pt-4 pb-12">
        <button 
          onClick={handleComplete}
          className="w-full py-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl font-headline font-extrabold text-lg shadow-[0_20px_40px_rgba(54,32,184,0.3)] hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          Complete Check-in
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
