import React, { useState } from 'react';
import { ScreenType } from '../types';

interface AnalyticsViewProps {
  onNavigate: (screen: ScreenType) => void;
  recordedWeight?: number;
}

export default function AnalyticsView({
  onNavigate,
  recordedWeight = 184.2
}: AnalyticsViewProps) {
  const [metricFilter, setMetricFilter] = useState<'1W' | '1M' | '3M' | 'ALL'>('1W');
  
  // Real interactive comparison slider position state (percentage 0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-32">
      {/* Key Statistics Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Phase card (Full width) */}
        <div className="col-span-2 p-6 rounded-3xl bg-white shadow-[0_10px_30px_rgba(27,28,28,0.06)] flex flex-col justify-between h-40 overflow-hidden relative border border-zinc-100">
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
              Current Phase
            </span>
            <h3 className="text-2xl font-black tracking-tight text-zinc-900 font-headline">
              Metabolic Priming
            </h3>
          </div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="h-2 flex-1 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-secondary to-secondary-container rounded-full" />
            </div>
            <span className="text-sm font-black text-secondary font-headline">75%</span>
          </div>
          
          {/* Abstract background blur */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Total Loss */}
        <div className="p-5 rounded-3xl bg-white shadow-[0_10px_30px_rgba(27,28,28,0.06)] border border-zinc-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
            Total Loss
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-zinc-900 font-headline">12.4</span>
            <span className="text-xs font-bold text-zinc-400">LBS</span>
          </div>
          <div className="mt-2 flex items-center text-xs font-black text-secondary">
            <span className="material-symbols-outlined text-sm font-bold mr-1">trending_down</span>
            -4.2%
          </div>
        </div>

        {/* Compliance */}
        <div className="p-5 rounded-3xl bg-white shadow-[0_10px_30px_rgba(27,28,28,0.06)] border border-zinc-100">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
            Compliance
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-zinc-900 font-headline">94</span>
            <span className="text-xs font-bold text-zinc-400">%</span>
          </div>
          <div className="mt-2 flex items-center text-xs font-black text-primary">
            <span className="material-symbols-outlined text-sm font-bold mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            Elite Level
          </div>
        </div>
      </section>

      {/* Body Metrics Dashboard with graphs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-zinc-900 font-headline tracking-tight">
            Body Metrics
          </h2>
          
          <div className="flex gap-1 p-1 bg-zinc-100 rounded-full">
            {(['1W', '1M', '3M', 'ALL'] as const).map((filter) => (
              <button 
                key={filter}
                type="button"
                onClick={() => setMetricFilter(filter)}
                className={`px-3 py-1 text-[10px] font-black rounded-full transition-all focus:outline-none ${
                  metricFilter === filter 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white shadow-[0_10px_30px_rgba(27,28,28,0.06)] space-y-8 border border-zinc-100">
          {/* Weight graph */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-semibold text-zinc-400 block uppercase tracking-wider">
                  Body Weight
                </span>
                <div className="text-2xl font-black text-zinc-900 font-headline mt-0.5">
                  {recordedWeight.toFixed(1)} <span className="text-xs font-bold text-zinc-400">lbs</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-secondary uppercase tracking-tight">
                  Avg: 185.1
                </span>
              </div>
            </div>

            <div className="h-32 w-full flex items-end">
              {/* Premium custom SVG chart */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3620b8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3620b8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Gradient area */}
                <path 
                  d="M0,35 Q10,32 25,28 T50,22 T75,15 T100,10 L100,40 L0,40 Z" 
                  fill="url(#chartGradient)" 
                />
                {/* Main line */}
                <path 
                  d="M0,35 Q10,32 25,28 T50,22 T75,15 T100,10" 
                  fill="none" 
                  stroke="#3620b8" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
                {/* Glowing peak dot */}
                <circle cx="100" cy="10" fill="#3620b8" r="3.5" />
                <circle cx="100" cy="10" fill="none" stroke="#3620b8" strokeOpacity="0.4" strokeWidth="3" r="6" />
              </svg>
            </div>
          </div>

          {/* Waist Circumference graph */}
          <div className="pt-6 border-t border-zinc-100 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-semibold text-zinc-400 block uppercase tracking-wider">
                  Waist Circumference
                </span>
                <div className="text-2xl font-black text-zinc-900 font-headline mt-0.5">
                  31.5 <span className="text-xs font-bold text-zinc-400">in</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-primary uppercase tracking-tight">
                  Avg: 32.1
                </span>
              </div>
            </div>

            <div className="h-24 w-full flex items-end">
              {/* Premium dashed SVG chart */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path 
                  d="M0,30 Q25,28 50,22 T100,15" 
                  fill="none" 
                  stroke="#f87600" 
                  strokeWidth="2" 
                  strokeDasharray="4 2.5" 
                  strokeLinecap="round" 
                />
                <circle cx="100" cy="15" fill="#f87600" r="3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Check-in Comparison with REAL DRAGGABLE SLIDER */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-zinc-900 font-headline tracking-tight">
          Check-in Comparison
        </h2>

        <div className="p-4 rounded-3xl bg-white shadow-[0_10px_30px_rgba(27,28,28,0.06)] relative border border-zinc-100">
          
          {/* Photos Container with slider */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden select-none bg-zinc-900">
            {/* Base Image (May 1) */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8IQejxY-7LWk32fS3KhvFwJ4v3BCwMx6ZG6TcrFGyTBeQg-fP7hXBVpQ0VSap8sI8lHEPJ0Rya97BTcEpb1D59_4xpUURcAoRt-p9wvf3ThAw1Vm2uWr5tWkEyKrpHSx5EOrHpJzMQSUalmHwTgySrCFNZm7KkZbpwrdzQWKWoAEq-qy_r2YJ2rwftg0VhqjOj0VVtWTPg3Ol4NY2dV8ZO3TL3wijIP_X31McH4monf1eFNdKzYcymHyVdikwpcSYnvcqXa1G_Cc" 
              alt="May 1" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-xl">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                May 1
              </span>
            </div>

            {/* Overlaid Image (June 1) clipped to slider position */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkGxK_vALbYFqCfnoo-M6D0XwQvZG3AyaKrnXK0SzpyhcuEEDy3c4NFn_p1YiINbTBWWhWGoPlN6xS-Nzmmvf62GbBA7XoqornEdByv4FZv6BCO3pQJvG516zCdkfMDoPLg77D_aUMPr2oHaH_04YNeptHWiW2NvUbRM7PVNr25MePhJUnAdjzE_s5ERdRPV-tO0FHN8Q01FVsm7NFp6r_lZ7EEpxsYpvzQWyH0sBP6ArqnGr7_s6n2RNWdyizPUH6sPIlnMz3xDw" 
                alt="June 1" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 bg-primary/90 backdrop-blur-md rounded-xl">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  June 1
                </span>
              </div>
            </div>

            {/* Visual dividing line and handles */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl font-bold select-none">
                  unfold_more_double
                </span>
              </div>
            </div>

            {/* Draggable transparent input overlay */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPos}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>

          {/* Slider bottom labels */}
          <div className="mt-6 flex items-center justify-between px-2">
            <button className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-700 active:scale-90 hover:bg-zinc-100 transition-colors">
              <span className="material-symbols-outlined text-lg font-bold">chevron_left</span>
            </button>
            <div className="text-center space-y-0.5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 block font-headline">
                Comparison View
              </span>
              <p className="text-xs font-black text-zinc-800">
                30 Days Progress
              </p>
            </div>
            <button className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-700 active:scale-90 hover:bg-zinc-100 transition-colors">
              <span className="material-symbols-outlined text-lg font-bold">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Insights bento fragment card */}
      <section className="pb-12">
        <div className="p-6 rounded-3xl bg-primary text-white overflow-hidden relative shadow-xl shadow-primary/20">
          <div className="relative z-10 flex flex-col gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-white font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-black font-headline tracking-tight leading-snug">
                Your metabolic rate has increased by 4% this week.
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Keep the hydration high and maintain current activity levels for the priming phase end.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('daily-checkin')}
              className="w-full py-4 bg-white text-primary font-black rounded-2xl active:scale-[0.98] hover:opacity-95 transition-all text-xs tracking-wider"
            >
              Update Daily Check-in
            </button>
          </div>
          {/* Background blurred blob */}
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-secondary/30 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
