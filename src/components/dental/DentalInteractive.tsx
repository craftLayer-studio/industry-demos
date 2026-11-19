'use client';

import {useRef} from 'react';
import {Treatments} from './Treatments';
import {Estimator, type EstimatorHandle} from './Estimator';

/** Treatment cards can open the payment estimator pre-filled with a sample cost. */
export function DentalInteractive() {
  const estimator = useRef<EstimatorHandle>(null);
  return (
    <>
      <Treatments onEstimate={t => estimator.current?.startWith(t)} />
      <Estimator ref={estimator} />
    </>
  );
}
