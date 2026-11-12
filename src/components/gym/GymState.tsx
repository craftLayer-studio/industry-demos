'use client';

import {createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode} from 'react';
import {defaultFilters, type ScheduleFilters} from './schedule';
import {toISODate} from './booking';

type GymState = {
  filters: ScheduleFilters;
  setFilters: (next: ScheduleFilters) => void;
  /** Class picked from the timetable or programmes, handed to the trial form. */
  requestedClassId: string;
  requestClass: (id: string) => void;
};

const GymStateContext = createContext<GymState | null>(null);

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Scroll a section into view (respecting reduced motion) and move focus to it. */
export function goToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'});
  target.focus({preventScroll: true});
}

export function GymStateProvider({children}: {children: ReactNode}) {
  const [filters, setFilters] = useState<ScheduleFilters>(defaultFilters);
  const [requestedClassId, setRequestedClassId] = useState('');
  const requestClass = useCallback((id: string) => {
    setRequestedClassId(id);
    goToSection('trial');
  }, []);
  const value = useMemo(
    () => ({filters, setFilters, requestedClassId, requestClass}),
    [filters, requestedClassId, requestClass],
  );
  return <GymStateContext.Provider value={value}>{children}</GymStateContext.Provider>;
}

export function useGymState(): GymState {
  const ctx = useContext(GymStateContext);
  if (!ctx) throw new Error('useGymState must be used inside GymStateProvider');
  return ctx;
}

const noopSubscribe = () => () => {};

/**
 * Today's local date as YYYY-MM-DD, or null during static prerender.
 * The export is built once, so "today" must come from the visitor's clock.
 */
export function useTodayISO(): string | null {
  return useSyncExternalStore(noopSubscribe, () => toISODate(new Date()), () => null);
}
