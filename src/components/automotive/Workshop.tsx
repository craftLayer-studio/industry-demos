'use client';

import {useState, type ReactNode} from 'react';
import {Booking, type BookingSeed} from './Booking';
import {Estimator} from './Estimator';
import {Hero} from './Hero';
import {MotReminder} from './MotReminder';
import {Services} from './Services';
import {DEFAULT_INPUT, type EstimateInput, type ServiceId} from './lib/estimate';
import type {SampleVehicle} from './lib/plate';

export type LoadedVehicle = {plate: string; sample: SampleVehicle};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView?.({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
  // Move focus to the section heading so keyboard and screen-reader users follow.
  document.getElementById(`${id}-heading`)?.focus({preventScroll: true});
}

/**
 * Client shell that links the interactive pieces: the plate lookup loads a
 * sample vehicle into the estimator, service tabs pick the estimator's service,
 * and the estimator can seed the booking form. Nothing leaves the browser.
 */
export function Workshop({howItWorks, faq}: {howItWorks: ReactNode; faq: ReactNode}) {
  const [input, setInput] = useState<EstimateInput>(DEFAULT_INPUT);
  const [loaded, setLoaded] = useState<LoadedVehicle | null>(null);
  const [seed, setSeed] = useState<BookingSeed | null>(null);

  const onLookup = (v: LoadedVehicle) => {
    setLoaded(v);
    setInput(prev => ({...prev, vehicle: v.sample.vehicle, engine: v.sample.engine, fuel: v.sample.fuel}));
  };

  const onEstimateService = (service: ServiceId) => {
    setInput(prev => ({
      ...prev,
      service,
      // The EV check only applies to electrified cars: switch to hybrid if needed.
      fuel: service === 'ev' && (prev.fuel === 'petrol' || prev.fuel === 'diesel') ? 'hybrid' : prev.fuel,
    }));
    scrollToId('estimate');
  };

  const onBook = () => {
    setSeed({service: input.service, plate: loaded?.plate ?? '', nonce: Date.now()});
    scrollToId('booking');
  };

  return (
    <>
      <Hero loaded={loaded} onLookup={onLookup} />
      <Services onEstimate={onEstimateService} />
      <Estimator
        input={input}
        onChange={setInput}
        loaded={loaded}
        onReset={() => {
          setInput(DEFAULT_INPUT);
          setLoaded(null);
        }}
        onBook={onBook}
      />
      {howItWorks}
      <MotReminder />
      {faq}
      <Booking seed={seed} />
    </>
  );
}
