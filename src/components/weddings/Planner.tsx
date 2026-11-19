'use client';

import {useState} from 'react';
import {DEFAULT_PACKAGE, classifyDate, type PackageInput} from './lib/pricing';
import {PackageBuilder} from './PackageBuilder';
import {Availability} from './Availability';

/**
 * Holds the package builder state so a date picked in the sample
 * availability view can set the builder's season and day type.
 */
export function Planner() {
  const [pkg, setPkg] = useState<PackageInput>(DEFAULT_PACKAGE);
  const [pricedDate, setPricedDate] = useState<string | null>(null);

  function update(next: Partial<PackageInput>) {
    setPkg(p => ({...p, ...next}));
    // Changing season or day by hand detaches the builder from a picked date.
    if ('season' in next || 'dayType' in next) setPricedDate(null);
  }

  function priceDate(iso: string) {
    setPkg(p => ({...p, ...classifyDate(iso)}));
    setPricedDate(iso);
    window.setTimeout(() => {
      const heading = document.getElementById('builder-summary-heading');
      if (!heading) return;
      const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      heading.scrollIntoView?.({behavior: reduce ? 'auto' : 'smooth', block: 'center'});
      heading.focus({preventScroll: true});
    }, 0);
  }

  return (
    <>
      <PackageBuilder pkg={pkg} pricedDate={pricedDate} onChange={update} onClearDate={() => setPricedDate(null)} />
      <Availability onPriceDate={priceDate} />
    </>
  );
}
