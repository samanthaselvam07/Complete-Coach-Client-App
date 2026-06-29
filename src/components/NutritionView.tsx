import React, { useState } from 'react';
import { Meal, ScreenType } from '../types';

interface NutritionViewProps {
  onNavigate: (screen: ScreenType) => void;
  meals: Meal[];
  onLogMeal: (id: string) => void;
  onSwapMeal: (id: string) => void;
}

export default function NutritionView({
  onNavigate,
  meals,
  onLogMeal,
  onSwapMeal
}: NutritionViewProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Calculate totals
  const totalTargetCalories = 2800;
  
  // Base stats when nothing logged
  let consumedCalories = 1560;
  let consumedProtein = 78;
  let consumedCarbs = 125;
  let consumedFats = 57;

  // Add logged meals to consumed stats
  meals.forEach(meal => {
    if (meal.logged) {
      consumedCalories += meal.calories;
      consumedProtein += meal.protein;
      consumedCarbs += meal.carbs;
      consumedFats += meal.fats;
    }
  });

  const remainingCalories = Math.max(totalTargetCalories - consumedCalories, 0);
  const consumedPercentage = Math.min((consumedCalories / totalTargetCalories) * 100, 100);

  const proteinTarget = 180;
  const carbsTarget = 210;
  const fatsTarget = 65;

  return (
    <div className="space-y-8 animate-fade-in pb-32">
      {/* Header Section */}
      <section className="mb-4">
        <p className="text-secondary font-semibold tracking-widest text-[10px] uppercase mb-1 font-headline">
          Nutrition
        </p>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-zinc-900 mb-2">
          Daily Nutrition Plan
        </h2>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </section>

      {/* Calories glass card */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-white shadow-[0_10px_30px_rgba(27,28,28,0.06)] group border border-zinc-100">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-8xl">
            restaurant
          </span>
        </div>
        
        <div className="relative z-10 space-y-4">
          <span className="text-zinc-400 font-label text-sm font-semibold uppercase tracking-wider block">
            Calories Remaining
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline text-6xl font-black tracking-tighter text-primary">
              {remainingCalories.toLocaleString()}
            </span>
            <span className="text-zinc-500 font-bold text-lg">kcal</span>
          </div>
          
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-500">
              <span>Target: {totalTargetCalories.toLocaleString()}</span>
              <span className="text-primary">{Math.round(consumedPercentage)}% consumed</span>
            </div>
            <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
                style={{ width: `${consumedPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Macro Grid */}
      <section className="space-y-4">
        {/* Protein */}
        <div className="bg-white p-5 rounded-3xl flex items-center gap-4 shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/60">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container/10 flex items-center justify-center text-secondary-container">
            <span className="material-symbols-outlined font-bold">
              fitness_center
            </span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-headline font-black text-sm text-zinc-800">Protein</span>
              <span className="text-xs font-bold text-zinc-500">
                {consumedProtein}g / {proteinTarget}g
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary-container rounded-full shadow-[0_0_8px_rgba(248,118,0,0.3)] transition-all"
                style={{ width: `${Math.min((consumedProtein / proteinTarget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-white p-5 rounded-3xl flex items-center gap-4 shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/60">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined font-bold">
              energy_savings_leaf
            </span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-headline font-black text-sm text-zinc-800">Carbs</span>
              <span className="text-xs font-bold text-zinc-500">
                {consumedCarbs}g / {carbsTarget}g
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min((consumedCarbs / carbsTarget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fats */}
        <div className="bg-white p-5 rounded-3xl flex items-center gap-4 shadow-[0_8px_25px_rgba(27,28,28,0.03)] border border-zinc-100/60">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-500">
            <span className="material-symbols-outlined font-bold">
              opacity
            </span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-headline font-black text-sm text-zinc-800">Fats</span>
              <span className="text-xs font-bold text-zinc-500">
                {consumedFats}g / {fatsTarget}g
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-zinc-500 rounded-full transition-all"
                style={{ width: `${Math.min((consumedFats / fatsTarget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Planned Meals list */}
      <section className="space-y-6">
        <h3 className="font-headline text-xl font-extrabold tracking-tight text-zinc-900 px-1">
          Planned Meals
        </h3>

        <div className="space-y-6">
          {meals.map((meal) => (
            <div 
              key={meal.id}
              onClick={() => setSelectedMeal(meal)}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(27,28,28,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-zinc-100"
            >
              <div className="h-44 w-full relative">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4">
                  <span className={`backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm ${
                    meal.type === 'High Protein' ? 'bg-primary/95' : 'bg-secondary-container/95'
                  }`}>
                    {meal.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-headline font-extrabold text-lg text-zinc-900">
                    {meal.name}
                  </h4>
                  <p className="text-zinc-500 text-sm font-semibold mt-1">
                    {meal.calories} kcal • {meal.protein}g Protein • {meal.carbs}g Carbs
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onLogMeal(meal.id)}
                    className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-xs transition-all duration-200 active:scale-95 ${
                      meal.logged 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/25 hover:opacity-95'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      {meal.logged ? 'check_circle' : 'add_circle'}
                    </span>
                    {meal.logged ? 'Logged' : 'Log Meal'}
                  </button>
                  <button 
                    onClick={() => onSwapMeal(meal.id)}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-all duration-200 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      swap_horiz
                    </span>
                    Swap Meal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tip Card */}
      <section className="bg-primary/5 rounded-3xl border border-primary/10 p-6 flex gap-4 items-start shadow-sm">
        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined font-bold">
            lightbulb
          </span>
        </div>
        <div className="space-y-1">
          <h5 className="font-headline font-extrabold text-zinc-900 leading-none">
            Pro Tip: Metabolic Window
          </h5>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed pt-1">
            Consuming high-quality protein within 60 minutes post-workout increases protein synthesis by up to 25%. Prioritize your Pro-Oats right after today's heavy leg session.
          </p>
        </div>
      </section>

      {/* Meal details modal (Bottom Sheet) */}
      {selectedMeal && (
        <div className="fixed inset-0 z-[100] transition-opacity duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedMeal(null)}
          />
          {/* Bottom Sheet content container */}
          <div className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[2.5rem] shadow-2xl transform transition-transform duration-500 flex flex-col max-h-[90vh]">
            <div className="w-full flex justify-center py-4">
              <div className="w-12 h-1.5 bg-zinc-200 rounded-full cursor-pointer" onClick={() => setSelectedMeal(null)} />
            </div>

            <div className="overflow-y-auto px-6 pb-12 pt-2 hide-scrollbar">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline text-2xl font-black text-zinc-900 leading-tight">
                    Meal Details
                  </h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">
                    Performance Focused
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedMeal(null)}
                  className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg font-bold">close</span>
                </button>
              </div>

              {/* Image & Title */}
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                <img src={selectedMeal.image} alt={selectedMeal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h4 className="text-white font-headline text-xl font-bold">
                    {selectedMeal.name}
                  </h4>
                </div>
              </div>

              {/* Macro breakdown */}
              <div className="mb-6 space-y-3">
                <h5 className="font-headline font-bold text-xs uppercase tracking-widest text-zinc-400">
                  Macro Breakdown
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-secondary-container/5 p-4 rounded-2xl border border-secondary-container/10 text-center">
                    <span className="block text-secondary font-black text-2xl">{selectedMeal.protein}g</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tight">Protein</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                    <span className="block text-primary font-black text-2xl">{selectedMeal.carbs}g</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tight">Carbs</span>
                  </div>
                  <div className="bg-zinc-100 p-4 rounded-2xl border border-zinc-200/50 text-center">
                    <span className="block text-zinc-600 font-black text-2xl">{selectedMeal.fats}g</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tight">Fats</span>
                  </div>
                </div>
              </div>

              {/* Ingredients list */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl font-bold">
                    shopping_basket
                  </span>
                  <h5 className="font-headline font-extrabold text-sm text-zinc-800 uppercase tracking-wider">
                    Ingredients
                  </h5>
                </div>
                <ul className="space-y-3 bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100">
                  {selectedMeal.ingredients.map((ing, index) => (
                    <li key={index} className="flex justify-between items-center text-sm border-b border-zinc-100 pb-2 last:border-b-0 last:pb-0">
                      <span className="text-zinc-700 font-medium">{ing.name}</span>
                      <span className="font-bold text-zinc-900">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chef Notes */}
              <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200/40">
                <h5 className="font-headline font-extrabold text-xs text-zinc-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  Chef's Notes
                </h5>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">
                  "{selectedMeal.chefNotes}"
                </p>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => {
                    onLogMeal(selectedMeal.id);
                    setSelectedMeal(null);
                  }}
                  className={`w-full py-4 rounded-2xl font-headline font-extrabold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    selectedMeal.logged 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                      : 'bg-primary text-white shadow-lg shadow-primary/20'
                  }`}
                >
                  <span className="material-symbols-outlined font-bold text-sm">
                    {selectedMeal.logged ? 'check_circle' : 'add_circle'}
                  </span>
                  {selectedMeal.logged ? 'Meal Logged' : 'Log Meal Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
