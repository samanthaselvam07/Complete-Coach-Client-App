import React from 'react';
import { ScreenType } from '../types';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  waterIntake: number; // in liters
  onAddWater: (amount: number) => void;
  supplementAdherence: number;
}

export default function HomeView({
  onNavigate,
  waterIntake,
  onAddWater,
  supplementAdherence
}: HomeViewProps) {
  const waterTarget = 3.0;
  const waterPercentage = Math.min((waterIntake / waterTarget) * 100, 100);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hello Marcus Header */}
      <section className="mb-2">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 font-headline">
          Hello, Marcus
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse" />
          <p className="text-zinc-500 font-medium text-sm">
            Your kinetic rhythm is peaking today.
          </p>
        </div>
      </section>

      {/* Daily Check-in Card (Hero) */}
      <section 
        onClick={() => onNavigate('daily-checkin')}
        className="cursor-pointer group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(27,28,28,0.06)] hover:shadow-[0_15px_35px_rgba(27,28,28,0.09)] transition-all duration-300 border border-zinc-100"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
        
        {/* Kinetic lightning bolt silhouette */}
        <div className="absolute top-2 right-4 text-primary/5 select-none transform group-hover:scale-105 transition-transform duration-300">
          <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
        </div>

        <div className="relative z-10 space-y-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight font-headline text-zinc-900">
              Daily Check-in
            </h2>
            <p className="text-zinc-500 text-sm font-medium mt-1">
              Align your metrics for peak performance.
            </p>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('daily-checkin');
            }}
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl font-headline font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Start Ritual
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Weekly Check-in Card */}
      <section 
        onClick={() => onNavigate('weekly-checkin')}
        className="cursor-pointer group bg-surface-container-low p-5 rounded-3xl flex items-center justify-between shadow-sm hover:bg-surface-container-high transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-secondary font-bold">
              calendar_month
            </span>
          </div>
          <div>
            <h3 className="font-headline font-extrabold text-zinc-900 leading-tight">
              Weekly Check-in
            </h3>
            <p className="text-zinc-500 text-xs font-medium mt-1">
              Review your evolution
            </p>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-secondary-container/10 border border-secondary-container/20 rounded-full">
          <span className="text-secondary-container font-black text-xs uppercase tracking-wider">
            Due in 2 days
          </span>
        </div>
      </section>

      {/* Hydration Section */}
      <section className="bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(27,28,28,0.04)] space-y-4 border border-zinc-100">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="font-headline text-xl font-extrabold text-zinc-900 tracking-tight">
              Hydration
            </h3>
            <p className="text-zinc-500 text-xs font-medium mt-0.5">
              Cellular optimization
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-primary font-headline">
              {waterIntake.toFixed(1)}L
            </span>
            <span className="text-zinc-400 font-bold text-sm"> / {waterTarget.toFixed(1)}L</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
            style={{ width: `${waterPercentage}%` }}
          />
        </div>

        {/* Hydration quick action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onAddWater(0.25)}
            className="py-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 text-zinc-800 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            + 250ml
          </button>
          <button 
            onClick={() => onAddWater(0.50)}
            className="py-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 text-zinc-800 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            + 500ml
          </button>
        </div>
      </section>

      {/* Resource Hub section */}
      <section className="space-y-4">
        <h3 className="font-headline text-xl font-extrabold text-zinc-900 tracking-tight px-1">
          Resource Hub
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Nutrition Library */}
          <div 
            onClick={() => onNavigate('nutrition')}
            className="cursor-pointer group bg-white p-5 rounded-3xl shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/80 flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">
                restaurant
              </span>
            </div>
            <div>
              <h4 className="font-headline font-black text-zinc-900 leading-tight">
                Nutrition Library
              </h4>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                Fuel Plan
              </p>
            </div>
          </div>

          {/* Training Portal */}
          <div 
            onClick={() => onNavigate('training')}
            className="cursor-pointer group bg-white p-5 rounded-3xl shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/80 flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-2xl">
                fitness_center
              </span>
            </div>
            <div>
              <h4 className="font-headline font-black text-zinc-900 leading-tight">
                Training Portal
              </h4>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                Kinetic Plan
              </p>
            </div>
          </div>

          {/* Supplementation */}
          <div 
            onClick={() => onNavigate('supplementation')}
            className="cursor-pointer group bg-white p-5 rounded-3xl shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/80 flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-zinc-700 text-2xl">
                inventory_2
              </span>
            </div>
            <div>
              <h4 className="font-headline font-black text-zinc-900 leading-tight">
                Supplementation
              </h4>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                Daily stack guide
              </p>
            </div>
          </div>

          {/* Form Upload */}
          <div 
            onClick={() => onNavigate('weekly-checkin')}
            className="cursor-pointer group bg-white p-5 rounded-3xl shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/80 flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-500 text-2xl">
                videocam
              </span>
            </div>
            <div>
              <h4 className="font-headline font-black text-zinc-900 leading-tight">
                Form Upload
              </h4>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                Submit for review
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div 
            onClick={() => onNavigate('training')}
            className="cursor-pointer group bg-white p-5 rounded-3xl shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/80 flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-500 text-2xl">
                calendar_today
              </span>
            </div>
            <div>
              <h4 className="font-headline font-black text-zinc-900 leading-tight">
                Calendar
              </h4>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                Weekly Schedule
              </p>
            </div>
          </div>

          {/* Results */}
          <div 
            onClick={() => onNavigate('analytics')}
            className="cursor-pointer group bg-white p-5 rounded-3xl shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/80 flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-rose-500 text-2xl">
                fact_check
              </span>
            </div>
            <div>
              <h4 className="font-headline font-black text-zinc-900 leading-tight">
                Results
              </h4>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                Analytics
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
