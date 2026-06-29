import React, { useState, useEffect } from 'react';
import { ScreenType, Meal } from './types';
import { INITIAL_MEALS, INITIAL_EXERCISES } from './data';

// Subcomponents
import HomeView from './components/HomeView';
import WeeklyCheckInView from './components/WeeklyCheckInView';
import DailyCheckInView from './components/DailyCheckInView';
import NutritionView from './components/NutritionView';
import TrainingView from './components/TrainingView';
import ActiveWorkoutView from './components/ActiveWorkoutView';
import SupplementStackView from './components/SupplementStackView';
import AnalyticsView from './components/AnalyticsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [waterIntake, setWaterIntake] = useState<number>(1.8);
  const [recordedWeight, setRecordedWeight] = useState<number>(184.2);
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [notification, setNotification] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedWater = localStorage.getItem('complete_coach_client_water');
      if (storedWater) setWaterIntake(parseFloat(storedWater));

      const storedWeight = localStorage.getItem('complete_coach_client_weight');
      if (storedWeight) setRecordedWeight(parseFloat(storedWeight));

      const storedMeals = localStorage.getItem('complete_coach_client_meals');
      if (storedMeals) setMeals(JSON.parse(storedMeals));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  const triggerToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleAddWater = (amount: number) => {
    const updated = Math.min(waterIntake + amount, 6.0);
    setWaterIntake(updated);
    localStorage.setItem('complete_coach_client_water', updated.toString());
    triggerToast(`Logged +${amount * 1000}ml of water.`);
  };

  const handleLogMeal = (id: string) => {
    const updated = meals.map(meal => {
      if (meal.id === id) {
        const nextLogged = !meal.logged;
        triggerToast(
          nextLogged 
            ? `Logged ${meal.name.split(':')[1]?.trim() || meal.name} into daily fuel targets.`
            : `Removed meal from daily fuel target log.`
        );
        return { ...meal, logged: nextLogged };
      }
      return meal;
    });
    setMeals(updated);
    localStorage.setItem('complete_coach_client_meals', JSON.stringify(updated));
  };

  const handleSwapMeal = (id: string) => {
    const swapOptions: Record<string, Partial<Meal>> = {
      '1': {
        name: 'Meal 1: Chocolate Berry Protein Oats',
        calories: 450,
        protein: 36,
        carbs: 48,
        ingredients: [
          { name: 'Rolled Oats', amount: '60g' },
          { name: 'Chocolate Whey Protein', amount: '35g' },
          { name: 'Fresh Strawberries & Blackberries', amount: '100g' },
          { name: 'Chia Seeds', amount: '1 tbsp' }
        ],
        chefNotes: 'Adding chia seeds boosts fiber and texture. Mix cocoa powder for rich chocolate undertones.'
      },
      '2': {
        name: 'Meal 2: Lemon Pepper Cod & Asparagus',
        calories: 490,
        protein: 42,
        carbs: 15,
        ingredients: [
          { name: 'Pacific Cod Fillet', amount: '220g' },
          { name: 'Asparagus Spears', amount: '180g' },
          { name: 'Lemon Herb butter', amount: '1 tbsp' },
          { name: 'Sautéed Garlic Greens', amount: '1 cup' }
        ],
        chefNotes: 'Cod is an exceptionally lean protein source. Pan-sear on medium-high to get light crisp edges.'
      }
    };

    const updated = meals.map(meal => {
      if (meal.id === id) {
        const option = swapOptions[id];
        if (option) {
          triggerToast(`Swapped meal for an optimized performance alternative.`);
          return { ...meal, ...option, logged: false };
        }
      }
      return meal;
    });
    setMeals(updated);
    localStorage.setItem('complete_coach_client_meals', JSON.stringify(updated));
  };

  const handleFinishWorkout = (intensity: number, notes: string) => {
    triggerToast(`Workout logged! Intensity Rated: ${intensity}/10. Compliance updated.`);
    // Navigate back to analytics dashboard
    setCurrentScreen('analytics');
  };

  const handleSubmitWeeklyCheckIn = (weightVal: number) => {
    setRecordedWeight(weightVal);
    localStorage.setItem('complete_coach_client_weight', weightVal.toString());
    triggerToast(`Weekly check-in submitted. Weight logged: ${weightVal}kg.`);
  };

  const handleSubmitDailyCheckIn = () => {
    triggerSuccessNotification('Daily check-in logged. Metrics aligned!');
  };

  const triggerSuccessMessage = (message: string) => {
    // Standard notification trigger
  };

  return (
    <div className="min-h-screen text-on-surface antialiased bg-background pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-100/30 flex justify-between items-center px-6 h-16 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <span 
            onClick={() => setCurrentScreen('home')}
            className="text-xl font-black italic tracking-tighter text-zinc-900 font-headline cursor-pointer select-none"
          >
            Complete Coach
          </span>
          <div className="h-4 w-px bg-zinc-200" />
          <span className="text-xs font-bold text-zinc-400 font-headline uppercase tracking-widest">
            {currentScreen === 'home' && 'Client Hub'}
            {currentScreen === 'weekly-checkin' && 'Weekly Check-in'}
            {currentScreen === 'daily-checkin' && 'Daily Alignment'}
            {currentScreen === 'nutrition' && 'Nutrition'}
            {currentScreen === 'training' && 'Training'}
            {currentScreen === 'active-workout' && 'Active Session'}
            {currentScreen === 'supplementation' && 'Supplements'}
            {currentScreen === 'analytics' && 'Progress'}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-zinc-500 hover:text-zinc-800 transition-colors focus:outline-none">
            <span className="material-symbols-outlined font-bold text-xl">notifications</span>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-secondary rounded-full" />
          </button>
          
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 shadow-sm cursor-pointer" onClick={() => setCurrentScreen('analytics')}>
            <img 
              className="w-full h-full object-cover" 
              alt="Client profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWCfdkvbvIDAwl6k-D8jGni0NI5LSSwwVv_tYtz6EAZpeliZaCTIWsCnRMdJjOveB9Ha7TH4RQIhMcSUbG3gQr4MSh1cMRzkJk2WcyKJRob0oO7iBN5C-rw6zGIxbRmcvNdVS8efvarnGZtAQhtsR2p9PFEEvarSlBPlM3oTgw4tPQL3MMaHbm8RNy8vZ3l_xKKxqvgybdgjI_B1RjgLKRpMhT6XuoNS8nKGW7LsZTTEha8Bayae_oueUCb-jhShMMvrxvaVvBAek"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Main Screen Content Stage */}
      <main className="pt-24 px-6 max-w-md mx-auto relative z-10">
        {currentScreen === 'home' && (
          <HomeView 
            onNavigate={setCurrentScreen}
            waterIntake={waterIntake}
            onAddWater={handleAddWater}
            supplementAdherence={100}
          />
        )}
        {currentScreen === 'weekly-checkin' && (
          <WeeklyCheckInView 
            onNavigate={setCurrentScreen}
            onSubmitCheckIn={handleSubmitWeeklyCheckIn}
          />
        )}
        {currentScreen === 'daily-checkin' && (
          <DailyCheckInView 
            onNavigate={setCurrentScreen}
            waterIntake={waterIntake}
            onAddWater={handleAddWater}
            onSubmitDailyCheckIn={handleSubmitDailyCheckIn}
          />
        )}
        {currentScreen === 'nutrition' && (
          <NutritionView 
            onNavigate={setCurrentScreen}
            meals={meals}
            onLogMeal={handleLogMeal}
            onSwapMeal={handleSwapMeal}
          />
        )}
        {currentScreen === 'training' && (
          <TrainingView 
            onNavigate={setCurrentScreen}
            exercises={INITIAL_EXERCISES}
          />
        )}
        {currentScreen === 'active-workout' && (
          <ActiveWorkoutView 
            onNavigate={setCurrentScreen}
            onFinishWorkout={handleFinishWorkout}
          />
        )}
        {currentScreen === 'supplementation' && (
          <SupplementStackView 
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'analytics' && (
          <AnalyticsView 
            onNavigate={setCurrentScreen}
            recordedWeight={recordedWeight}
          />
        )}
      </main>

      {/* Persistent global notification toast */}
      {notification && (
        <div className="fixed bottom-28 left-6 right-6 z-[200] max-w-md mx-auto animate-slide-up">
          <div className="bg-zinc-900 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-fixed text-lg font-bold">
              check_circle
            </span>
            <p className="text-xs font-semibold tracking-wide">
              {notification}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Suppressed on focused screens like 'weekly-checkin' and 'active-workout') */}
      {currentScreen !== 'weekly-checkin' && currentScreen !== 'active-workout' && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm rounded-[2.2rem] bg-white/70 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.06)] z-50 flex justify-around items-center px-2 h-20 transition-all duration-300">
          {/* Home */}
          <button 
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all focus:outline-none ${
              currentScreen === 'home' 
                ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 scale-105' 
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentScreen === 'home' ? "'FILL' 1" : "'FILL' 0" }}>
              home
            </span>
          </button>

          {/* Workout / Training */}
          <button 
            onClick={() => setCurrentScreen('training')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all focus:outline-none ${
              currentScreen === 'training' 
                ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 scale-105' 
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentScreen === 'training' ? "'FILL' 1" : "'FILL' 0" }}>
              fitness_center
            </span>
          </button>

          {/* Nutrition / Fuel */}
          <button 
            onClick={() => setCurrentScreen('nutrition')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all focus:outline-none ${
              currentScreen === 'nutrition' 
                ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 scale-105' 
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentScreen === 'nutrition' ? "'FILL' 1" : "'FILL' 0" }}>
              restaurant
            </span>
          </button>

          {/* Supplements / Vault */}
          <button 
            onClick={() => setCurrentScreen('supplementation')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all focus:outline-none ${
              currentScreen === 'supplementation' 
                ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 scale-105' 
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentScreen === 'supplementation' ? "'FILL' 1" : "'FILL' 0" }}>
              inventory_2
            </span>
          </button>

          {/* Analytics / Results */}
          <button 
            onClick={() => setCurrentScreen('analytics')}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all focus:outline-none ${
              currentScreen === 'analytics' 
                ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 scale-105' 
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: currentScreen === 'analytics' ? "'FILL' 1" : "'FILL' 0" }}>
              fact_check
            </span>
          </button>
        </nav>
      )}
    </div>
  );

  function triggerSuccessNotification(message: string) {
    triggerToast(message);
  }
}
