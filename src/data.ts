import { Meal, Exercise } from './types';

export const INITIAL_MEALS: Meal[] = [
  {
    id: 'meal-1',
    name: 'Meal 1: Pro-Oats with Berries',
    type: 'High Protein',
    calories: 420,
    protein: 32,
    carbs: 54,
    fats: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS4ghEKa11hGgu4YNMswQ4RenM7IuGSdWi5CXE-GpqtCKeehJh0diPl-zUsfG3_N6FT6ask6jVEyXLXFqVNghjemCASiJNkgw9fA3G1--LhI-evzMJvJ6InI5DhVJlcQGv4ItMUgZHYhMdTCogmEG-I_deqgStAoQd0f9-ojuQOk_X6EA9aAy6pki-fFKOnJD478vH4izX8r_abz30AxnWTNfn3NkAIIIF123Zcqg7UUOA8J5swv2lu4f3ugUW7Gs4M0Do-GnzBQY',
    description: 'Vibrant bowl of protein oatmeal topped with fresh blueberries, raspberries, and a drizzle of almond butter.',
    ingredients: [
      { name: 'Rolled Oats', amount: '60g' },
      { name: 'Whey Protein Isolate', amount: '30g' },
      { name: 'Mixed Berries (Blueberries & Raspberries)', amount: '80g' },
      { name: 'Almond Butter', amount: '1 tbsp' }
    ],
    chefNotes: 'Wild berries are exceptionally high in antioxidants. Let the oats cool slightly before mixing whey protein to avoid clumping.',
    logged: false
  },
  {
    id: 'meal-2',
    name: 'Meal 2: Grilled Salmon & Greens',
    type: 'Performance',
    calories: 580,
    protein: 45,
    carbs: 12,
    fats: 38,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABm5VHoY37V6OgLAtkS2qGsifowe954ItcMEOzf-h_l_-bWiRG1fe3adM56-6d1VcoDwwexFbnlOPB4qFBlNjOgTcMCMPfEYjGpXqztDR6zdXvllt3E_9bxA0hzR6irqHhdTc0-yl17-uspd5LcK1gcHnbxTBaCvtA_f1vqXoz4wA0KndbmajNkT3xfYeglnlDGIfiGPtLjCz98v-m9CipQ2HxDPy0RUXVrVGeFfuS8OmUC9oQid-Qql7Hfaf_CU6Nk1RFJSwK1rs',
    description: 'Perfectly seared salmon fillet served over a bed of baby spinach, steamed asparagus, and light olive oil dressing.',
    ingredients: [
      { name: 'Atlantic Salmon Fillet', amount: '200g' },
      { name: 'Baby Spinach & Steamed Asparagus', amount: '150g' },
      { name: 'Extra Virgin Olive Oil', amount: '1 tbsp' },
      { name: 'Fresh Lemon Juice', amount: '1/2 unit' }
    ],
    chefNotes: 'Wild-caught salmon is exceptionally high in Omega-3 fatty acids. Steam the greens lightly to retain micronutrient density and crunch.',
    logged: false
  }
];

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Incline Leg Press',
    category: 'Primary Lift',
    sets: 4,
    reps: '8-10',
    rest: '120s',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuKKuJ-Aibcri98x-aEJcWcRU0X7Cd2a0WK6fQH10_mHHNVJqPFOPBwcISAiT75-Jxi_LzLTBIKg4L7xVdPESZXrSnZvhaN8wR7jY98yvN_gEggpNgFy2YSgsT1_lEmeig0HrpJFx_AE31DQPRa7SVGs4VItYeF-hz4JbWcwVkZbPxCRYnZBySeoleSieFq-KYsRLt0OrUuwS3wLt-9E7_VxlwpOrnUK8JeRRXuKo-cJNB57pPCF5qiRJ1jybxYdvBBG8a5Vnidqpks',
    tips: 'Focus on the eccentric phase. 3 seconds down, explosive drive up. Keep feet shoulder width.'
  },
  {
    id: 'ex-2',
    name: 'Bulgarian Split Squat',
    category: 'Accessory',
    sets: 3,
    reps: '12 / side',
    rest: '90s',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnlWw2nBP5Q8Z9jbsx7MxKmJEbeLce8hZf_efBjr77vuGZezmEBDsHNI-I_Wuw6XW3BQoVzY5JcpR8h1Jrd6Jn6aXKW_ALtxqK0V90KqvrluW7sF7NtI6ivG_gaohEBEKCng5rlbfRicfiOnZbkLoLJ5YqLV1ceIpDF-jdX23dqJI4u_I8WVxYYDRuMPI3siG1OgH1CFaY0_ARl3eJC982CmUxFTJQ85L_DyJStHRLbNvocfzWSvq4Qf7m6IvX2kcDVK796y_15xM',
    tips: 'Slight forward lean to emphasize the glutes. Hold dumbbells at sides.'
  },
  {
    id: 'ex-3',
    name: 'Seated Leg Extension',
    category: 'Hypertrophy',
    sets: 3,
    reps: '15-20',
    rest: '90s',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ApATCaiJ7_vP5P79psli2kCnov9CVjJ1HazMmzST0zlCXZTJAMj_wjxGxYGcpY3wDP3vF1y0kyEVTe-qOWUGnIbLWxihD7EzFVsVrOO8zbn-5yl05uMVaRx5WaNiCfgPLQJwsUpV-CzYzOAof4j9ZD6aHgtiW3m1Zy3neImZyrLw7ZoEgIlKdjbm51atCCY9XWfKcB2fx7hflcQGGCqrLdGoLiWzxyE9A5rZ1mcTypqe8Pn4xiAA58gQoNXIQEApEQ54DeU3brE',
    tips: 'Close-up of leg muscles engaging during a leg extension machine. Keep tension at top.'
  }
];

export const INITIAL_SUPPLEMENTS = [
  { id: 'supp-1', name: 'Foundation Multi', dosage: '2 capsules', note: 'With Food', timing: 'Morning', checked: true, icon: 'medication' },
  { id: 'supp-2', name: 'Omega-3 Gold', dosage: '1200mg', note: 'Post-Meal', timing: 'Morning', checked: true, icon: 'water_drop' },
  { id: 'supp-3', name: 'Nitric Oxide Elite', dosage: '1 scoop', note: '30 mins prior', timing: 'Pre-Workout', checked: false, icon: 'cycle' },
  { id: 'supp-4', name: 'ZMA Recovery', dosage: '3 capsules', note: 'Pending Time', timing: 'Evening', checked: false, icon: 'hotel', locked: true }
];
