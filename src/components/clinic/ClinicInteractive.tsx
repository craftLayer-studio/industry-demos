'use client';

import {useRef} from 'react';
import {Clinicians} from './Clinicians';
import {Booking, type BookingHandle} from './Booking';

/** Clinician cards can start the booking flow with that clinician preselected. */
export function ClinicInteractive() {
  const booking = useRef<BookingHandle>(null);
  return (
    <>
      <Clinicians onRequest={c => booking.current?.startWith(c)} />
      <Booking ref={booking} />
    </>
  );
}
