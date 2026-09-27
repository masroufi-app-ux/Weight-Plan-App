import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

export type Goal = 'lose' | 'maintain' | 'gain';
export type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type OnboardingData = {
  age: string; sex: 'female' | 'male' | ''; height: string; weight: string; goal: Goal;
  targetWeight: string; durationMonths: string; activity: Activity; steps: string;
  flexibleMeals: boolean; flexibleDays: string[]; gym: boolean; gymDays: string[];
  routine: string; supplements: string[]; plan: 'free' | 'plus';
};
const initialData: OnboardingData = { age: '26', sex: '', height: '170', weight: '82', goal: 'lose', targetWeight: '72', durationMonths: '5', activity: 'light', steps: '4500', flexibleMeals: true, flexibleDays: ['Saturday'], gym: false, gymDays: [], routine: '', supplements: [], plan: 'free' };
type ContextValue = { data: OnboardingData; update: (patch: Partial<OnboardingData>) => void; calorieTarget: number; maintenance: number; weeklyChange: number };
const Context = createContext<ContextValue | null>(null);
const KEY = 'weight-plan-onboarding-v1';

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState(initialData);
  useEffect(() => { AsyncStorage.getItem(KEY).then((saved) => saved && setData({ ...initialData, ...JSON.parse(saved) })).catch(() => undefined); }, []);
  const update = (patch: Partial<OnboardingData>) => setData((current) => { const next = { ...current, ...patch }; AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined); return next; });
  const metrics = useMemo(() => {
    const weight = Number(data.weight) || 75, height = Number(data.height) || 170, age = Number(data.age) || 25;
    const base = 10 * weight + 6.25 * height - 5 * age + (data.sex === 'male' ? 5 : -161);
    const multipliers: Record<Activity, number> = { sedentary: 1.2, light: 1.35, moderate: 1.5, active: 1.65, veryActive: 1.8 };
    const maintenance = Math.round(base * multipliers[data.activity]);
    const target = Number(data.targetWeight) || weight, months = Math.max(1, Number(data.durationMonths) || 4);
    const weeklyChange = Math.abs(weight - target) / (months * 4.345), direction = data.goal === 'lose' ? -1 : data.goal === 'gain' ? 1 : 0;
    const requestedAdjustment = Math.min(750, weeklyChange * 1100) * direction;
    return { maintenance, calorieTarget: Math.max(1200, Math.round((maintenance + requestedAdjustment) / 50) * 50), weeklyChange };
  }, [data]);
  return <Context.Provider value={{ data, update, ...metrics }}>{children}</Context.Provider>;
}
export function useOnboarding() { const value = useContext(Context); if (!value) throw new Error('useOnboarding must be inside OnboardingProvider'); return value; }
