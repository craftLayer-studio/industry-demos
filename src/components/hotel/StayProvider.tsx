'use client';

import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from 'react';
import type {RoomType} from './lib/data';

export type Stay = {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  breakfast: boolean;
};

export type RoomFilterState = {type: RoomType | 'all'; seaViewOnly: boolean};

type Ctx = {
  stay: Stay;
  setStay: (patch: Partial<Stay>) => void;
  filters: RoomFilterState;
  setFilters: (patch: Partial<RoomFilterState>) => void;
  openRoomId: string | null;
  openRoom: (id: string) => void;
  closeRoom: () => void;
  /** Select a room and move to a section (rates or booking). */
  chooseRoom: (id: string, section: 'rates' | 'book') => void;
  goToSection: (id: string) => void;
};

const StayContext = createContext<Ctx | null>(null);

export const EMPTY_STAY: Stay = {checkIn: '', checkOut: '', guests: 2, roomId: 'tideline', breakfast: true};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
  const heading = el.querySelector<HTMLElement>('h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({preventScroll: true});
  }
}

/** Shared stay state: the hero search, room list, rate calculator and booking form all read it. */
export function StayProvider({children, initialStay = EMPTY_STAY}: {children: ReactNode; initialStay?: Stay}) {
  const [stay, setStayState] = useState<Stay>(initialStay);
  const [filters, setFilterState] = useState<RoomFilterState>({type: 'all', seaViewOnly: false});
  const [openRoomId, setOpenRoomId] = useState<string | null>(null);

  const setStay = useCallback((patch: Partial<Stay>) => setStayState(s => ({...s, ...patch})), []);
  const setFilters = useCallback((patch: Partial<RoomFilterState>) => setFilterState(f => ({...f, ...patch})), []);
  const goToSection = useCallback((id: string) => {
    window.setTimeout(() => scrollToSection(id), 0);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      stay,
      setStay,
      filters,
      setFilters,
      openRoomId,
      openRoom: setOpenRoomId,
      closeRoom: () => setOpenRoomId(null),
      chooseRoom: (id, section) => {
        setStay({roomId: id});
        setOpenRoomId(null);
        // Let the dialog close and return focus before moving on.
        window.setTimeout(() => scrollToSection(section), 60);
      },
      goToSection,
    }),
    [stay, setStay, filters, setFilters, openRoomId, goToSection],
  );

  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay(): Ctx {
  const ctx = useContext(StayContext);
  if (!ctx) throw new Error('useStay must be used inside StayProvider');
  return ctx;
}
