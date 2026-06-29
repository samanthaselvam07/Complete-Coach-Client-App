import React, { useState } from 'react';
import { Exercise, ScreenType } from '../types';

interface TrainingViewProps {
  onNavigate: (screen: ScreenType) => void;
  exercises: Exercise[];
}

export default function TrainingView({
  onNavigate,
  exercises
}: TrainingViewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);

  const daysList = [
    { num: 1, label: 'Lower Body A', type: 'workout' },
    { num: 2, label: 'Upper Body B', type: 'workout' },
    { num: 3, label: 'Rest Day', type: 'rest' },
    { num: 4, label: 'Full Body C', type: 'workout' },
    { num: 5, label: 'Core & Cardio', type: 'workout' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-40">
      {/* Block Overview Header */}
      <section className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-zinc-900">
            Hypertrophy Block A
          </h2>
          <span className="text-xs font-black uppercase tracking-widest text-primary font-headline">
            Week 3 of 6
          </span>
        </div>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">
          Focusing on high-volume mechanical tension and controlled eccentrics. Prioritize mind-muscle connection over raw load this week.
        </p>
      </section>

      {/* Horizontal Day Selector */}
      <section className="mb-4 -mx-6">
        <div className="flex overflow-x-auto hide-scrollbar px-6 space-x-3 pb-2">
          {daysList.map((day) => {
            const isActive = activeDay === day.num;
            if (day.type === 'rest') {
              return (
                <button 
                  key={day.num}
                  type="button"
                  onClick={() => setActiveDay(day.num)}
                  className={`flex-shrink-0 w-28 h-32 rounded-3xl flex flex-col items-center justify-center gap-1 border border-dashed active:scale-95 transition-all focus:outline-none ${
                    isActive 
                      ? 'bg-zinc-100 border-zinc-400' 
                      : 'bg-zinc-50/50 border-zinc-200'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400">
                    Day {day.num}
                  </span>
                  <span className="font-headline text-xs font-extrabold text-center px-2 text-zinc-400">
                    {day.label}
                  </span>
                </button>
              );
            }

            return (
              <button 
                key={day.num}
                type="button"
                onClick={() => setActiveDay(day.num)}
                className={`flex-shrink-0 w-28 h-32 rounded-3xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 focus:outline-none ${
                  isActive 
                    ? 'bg-primary-container text-white shadow-xl shadow-primary/20' 
                    : 'bg-white text-zinc-800 border border-zinc-100 shadow-[0_4px_15px_rgba(27,28,28,0.03)]'
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-tighter ${
                  isActive ? 'text-white/80' : 'text-zinc-400'
                }`}>
                  Day {day.num}
                </span>
                <span className="font-headline text-xs font-extrabold text-center px-2 leading-snug">
                  {day.label}
                </span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Exercises Header with Timer badge */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline text-xl font-extrabold text-zinc-900 tracking-tight">
            Exercises <span className="text-zinc-400 font-normal">({activeDay === 3 ? 0 : exercises.length})</span>
          </h3>
          {activeDay !== 3 && (
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-zinc-200/50">
              <span className="material-symbols-outlined text-sm font-bold">timer</span>
              75 min
            </span>
          )}
        </div>

        {activeDay === 3 ? (
          <div className="bg-white p-8 rounded-3xl border border-dashed border-zinc-200 text-center space-y-3">
            <span className="material-symbols-outlined text-zinc-300 text-5xl">bedtime</span>
            <div className="space-y-1">
              <h4 className="font-headline font-extrabold text-zinc-800">Rest Day</h4>
              <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                No active workouts today. Focus on active recovery, light stretching, and optimal nutrition.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {exercises.map((exercise) => {
              if (exercise.category === 'Hypertrophy') {
                return (
                  <div 
                    key={exercise.id}
                    className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(27,28,28,0.04)] hover:shadow-md transition-all border border-zinc-100 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200/50">
                        <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-headline font-extrabold text-zinc-900 text-base">
                          {exercise.name}
                        </h4>
                        <p className="text-sm text-zinc-500 font-semibold mt-0.5">
                          {exercise.sets} x {exercise.reps} • RPE 9
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-zinc-300 group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </div>
                );
              }

              return (
                <div 
                  key={exercise.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(27,28,28,0.04)] border border-zinc-100"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-1 inline-block ${
                        exercise.category === 'Primary Lift' 
                          ? 'bg-secondary-container text-white' 
                          : 'bg-zinc-800 text-white border border-zinc-700'
                      }`}>
                        {exercise.category}
                      </span>
                      <h4 className="text-white font-headline text-xl font-black">
                        {exercise.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Sets</p>
                          <p className="font-headline text-lg font-black text-zinc-800">{exercise.sets}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Reps</p>
                          <p className="font-headline text-lg font-black text-zinc-800">{exercise.reps}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Rest</p>
                          <p className="font-headline text-lg font-black text-zinc-800">{exercise.rest}</p>
                        </div>
                      </div>

                      <button 
                        type="button"
                        className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 text-primary flex items-center justify-center hover:bg-zinc-100 transition-colors active:scale-90"
                      >
                        <span className="material-symbols-outlined font-bold text-lg">videocam</span>
                      </button>
                    </div>

                    <div className="bg-zinc-50 rounded-2xl p-4 flex gap-3 items-start border border-zinc-100">
                      <span className="material-symbols-outlined text-primary text-xl font-bold">
                        sticky_note_2
                      </span>
                      <p className="text-sm text-zinc-500 font-medium italic leading-relaxed">
                        "{exercise.tips}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Fixed Start Workout CTA */}
      {activeDay !== 3 && (
        <div className="fixed bottom-[88px] left-0 w-full px-6 z-40 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button 
              type="button"
              onClick={() => onNavigate('active-workout')}
              className="w-full h-16 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl font-headline font-extrabold text-lg flex items-center justify-center gap-2.5 shadow-2xl shadow-primary/40 active:scale-[0.98] hover:opacity-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
              START WORKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
