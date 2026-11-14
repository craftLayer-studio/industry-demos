'use client';

import {createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode} from 'react';
import {CourseDialog} from './CourseDialog';
import {localTodayISO} from './lib/cohorts';
import {EMPTY_ENQUIRY, type EnquiryDraft} from './lib/validation';

type AcademyContextValue = {
  /** The viewer's local date (YYYY-MM-DD), or null during static render. */
  today: string | null;
  openCourse: (courseId: string) => void;
  /** Pre-fill the enquiry form with a course and move the viewer to it. */
  enquire: (courseId: string) => void;
  draft: EnquiryDraft;
  setDraft: (update: (d: EnquiryDraft) => EnquiryDraft) => void;
  /** Course id most recently pre-filled from elsewhere on the page. */
  prefilledFrom: string | null;
  clearPrefill: () => void;
};

const AcademyContext = createContext<AcademyContextValue | null>(null);

const noopSubscribe = () => () => {};

export function useAcademy(): AcademyContextValue {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error('useAcademy must be used inside AcademyProvider');
  return ctx;
}

export const ENQUIRY_HEADING_ID = 'enquire-heading';

export function AcademyProvider({children}: {children: ReactNode}) {
  // Dates depend on the viewer's clock, so they only exist after hydration.
  const today = useSyncExternalStore(noopSubscribe, () => localTodayISO(), () => null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [draft, setDraftState] = useState<EnquiryDraft>(EMPTY_ENQUIRY);
  const [prefilledFrom, setPrefilledFrom] = useState<string | null>(null);

  const setDraft = useCallback((update: (d: EnquiryDraft) => EnquiryDraft) => setDraftState(update), []);

  const enquire = useCallback((id: string) => {
    setCourseId(null);
    setDraftState(d => (d.courseId === id ? d : {...d, courseId: id, cohort: ''}));
    setPrefilledFrom(id);
    // Wait for the dialog to close and the form to re-render, then move focus.
    window.setTimeout(() => {
      const heading = document.getElementById(ENQUIRY_HEADING_ID);
      if (!heading) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      heading.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
      heading.focus({preventScroll: true});
    }, 60);
  }, []);

  const value = useMemo<AcademyContextValue>(
    () => ({
      today,
      openCourse: setCourseId,
      enquire,
      draft,
      setDraft,
      prefilledFrom,
      clearPrefill: () => setPrefilledFrom(null),
    }),
    [today, enquire, draft, setDraft, prefilledFrom],
  );

  return (
    <AcademyContext.Provider value={value}>
      {children}
      <CourseDialog courseId={courseId} onClose={() => setCourseId(null)} />
    </AcademyContext.Provider>
  );
}
