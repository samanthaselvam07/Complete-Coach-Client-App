export type ScreenType = 
  | 'home' 
  | 'weekly-checkin' 
  | 'daily-checkin' 
  | 'nutrition' 
  | 'training' 
  | 'active-workout' 
  | 'supplementation' 
  | 'analytics';

export interface Meal {
  id: string;
  name: string;
  type: string; // 'High Protein' | 'Performance' | etc.
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  chefNotes: string;
  logged: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'Primary Lift' | 'Accessory' | 'Hypertrophy';
  sets: number;
  reps: string;
  rest: string;
  image: string;
  tips: string;
  rpe?: number;
}

export interface SetLog {
  setNumber: number;
  lbs: number | '';
  reps: number | '';
  rpe: number | '';
  done: boolean;
}

export interface ActiveWorkoutSession {
  exerciseId: string;
  name: string;
  target: string;
  image: string;
  sets: SetLog[];
}
