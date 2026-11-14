'use client';

import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from 'react';
import {DEFAULT_FILTERS, type SearchFilters, type SortKey} from './lib/listings';

type Request = {value: string; nonce: number};

type EstateContextValue = {
  filters: SearchFilters;
  setFilters: (update: SearchFilters | ((f: SearchFilters) => SearchFilters)) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  openId: string | null;
  openProperty: (id: string) => void;
  closeProperty: () => void;
  /** Latest "request a viewing" hand-off from a listing (nonce changes each time). */
  viewingRequest: Request | null;
  requestViewing: (propertyId: string) => void;
  /** Latest "estimate repayments" hand-off with a sale price. */
  estimateRequest: {price: number; nonce: number} | null;
  estimateFor: (price: number) => void;
  /** Scroll to a section and move focus to its heading. */
  goToSection: (id: string) => void;
};

const EstateContext = createContext<EstateContextValue | null>(null);

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'});
  const target = section.querySelector<HTMLElement>('[data-focus-target]') ?? section.querySelector<HTMLElement>('h2');
  if (target) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({preventScroll: true});
  }
}

export function EstateProvider({children}: {children: ReactNode}) {
  const [filters, setFiltersState] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>('recommended');
  const [openId, setOpenId] = useState<string | null>(null);
  const [viewingRequest, setViewingRequest] = useState<Request | null>(null);
  const [estimateRequest, setEstimateRequest] = useState<{price: number; nonce: number} | null>(null);

  const setFilters = useCallback<EstateContextValue['setFilters']>(update => {
    setFiltersState(f => (typeof update === 'function' ? update(f) : update));
  }, []);

  // Wait for the dialog to close (and restore focus) before moving on.
  const afterDialog = useCallback((fn: () => void) => {
    setOpenId(null);
    window.setTimeout(fn, 60);
  }, []);

  const value = useMemo<EstateContextValue>(
    () => ({
      filters,
      setFilters,
      sort,
      setSort,
      openId,
      openProperty: id => setOpenId(id),
      closeProperty: () => setOpenId(null),
      viewingRequest,
      requestViewing: propertyId => {
        setViewingRequest(r => ({value: propertyId, nonce: (r?.nonce ?? 0) + 1}));
        afterDialog(() => scrollToSection('viewing'));
      },
      estimateRequest,
      estimateFor: price => {
        setEstimateRequest(r => ({price, nonce: (r?.nonce ?? 0) + 1}));
        afterDialog(() => scrollToSection('mortgage'));
      },
      goToSection: scrollToSection,
    }),
    [filters, setFilters, sort, openId, viewingRequest, estimateRequest, afterDialog],
  );

  return <EstateContext.Provider value={value}>{children}</EstateContext.Provider>;
}

export function useEstate(): EstateContextValue {
  const ctx = useContext(EstateContext);
  if (!ctx) throw new Error('useEstate must be used inside EstateProvider');
  return ctx;
}
