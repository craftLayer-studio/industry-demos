'use client';

import {useRef, type ReactNode} from 'react';
import {FeeEstimator} from './FeeEstimator';
import {Consultation, type ConsultationHandle} from './Consultation';

/**
 * The fee estimator can hand its services to the consultation request
 * ("Discuss this estimate"). Sections in between are passed as children so
 * they stay server-rendered.
 */
export function AdvisoryInteractive({children, after}: {children: ReactNode; after: ReactNode}) {
  const consult = useRef<ConsultationHandle>(null);
  return (
    <>
      <FeeEstimator onDiscuss={h => consult.current?.startFromEstimate(h)} />
      {children}
      <Consultation ref={consult} />
      {after}
    </>
  );
}
