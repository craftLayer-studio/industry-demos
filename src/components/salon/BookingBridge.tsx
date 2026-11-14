'use client';

import {createContext, useContext, useMemo, useRef, type ReactNode} from 'react';

export type BookingHandle = {
  startWithService: (serviceId: string) => void;
  startWithSpecialist: (specialistId: string) => void;
};

type Bridge = {
  /** Registers the appointment request; returns an unregister function. */
  register: (handle: BookingHandle) => () => void;
  startWithService: (serviceId: string) => void;
  startWithSpecialist: (specialistId: string) => void;
};

const BookingBridgeContext = createContext<Bridge | null>(null);

function scrollToBooking() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('book')?.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
}

/**
 * Lets the service menu and specialist cards hand a choice to the
 * appointment request further down the page.
 */
export function BookingBridgeProvider({children}: {children: ReactNode}) {
  const handleRef = useRef<BookingHandle | null>(null);
  const value = useMemo<Bridge>(
    () => ({
      register(handle) {
        handleRef.current = handle;
        return () => {
          if (handleRef.current === handle) handleRef.current = null;
        };
      },
      startWithService(id) {
        handleRef.current?.startWithService(id);
        scrollToBooking();
      },
      startWithSpecialist(id) {
        handleRef.current?.startWithSpecialist(id);
        scrollToBooking();
      },
    }),
    [],
  );
  return <BookingBridgeContext.Provider value={value}>{children}</BookingBridgeContext.Provider>;
}

export function useBookingBridge(): Bridge {
  const ctx = useContext(BookingBridgeContext);
  if (!ctx) throw new Error('useBookingBridge must be used inside BookingBridgeProvider');
  return ctx;
}
