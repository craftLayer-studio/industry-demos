'use client';

import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from 'react';
import type {ProjectType} from './lib/projects';
import type {BudgetBand} from './lib/fees';

export type BriefPreset = {type?: ProjectType; budget?: BudgetBand; source: string; nonce: number};

type StudioState = {
  openProjectId: string | null;
  openProject: (id: string) => void;
  closeProject: () => void;
  preset: BriefPreset | null;
  /** Prefill the brief builder and scroll to it. */
  startBrief: (p: Omit<BriefPreset, 'nonce'>) => void;
};

const StudioContext = createContext<StudioState | null>(null);

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function StudioProvider({children}: {children: ReactNode}) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [preset, setPreset] = useState<BriefPreset | null>(null);

  const startBrief = useCallback((p: Omit<BriefPreset, 'nonce'>) => {
    setOpenProjectId(null);
    setPreset(prev => ({...p, nonce: (prev?.nonce ?? 0) + 1}));
    // Wait a frame so a closing dialog releases the page before scrolling.
    requestAnimationFrame(() => {
      document.getElementById('brief')?.scrollIntoView?.({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'});
    });
  }, []);

  const value = useMemo<StudioState>(
    () => ({
      openProjectId,
      openProject: setOpenProjectId,
      closeProject: () => setOpenProjectId(null),
      preset,
      startBrief,
    }),
    [openProjectId, preset, startBrief],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioState {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used inside StudioProvider');
  return ctx;
}
