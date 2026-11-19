'use client';

import {useState, type FormEvent} from 'react';
import {DateInput} from '@astryxdesign/core/DateInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {useStay} from './StayProvider';
import {useToday} from './useToday';
import {guestOptions, rooms} from './lib/data';
import {addDays, daysBetween} from './lib/dates';
import {MAX_NIGHTS, roomStayStatus} from './lib/rates';
import {bookingWindow} from './lib/booking';
import styles from './saltmarsh.module.css';

type SearchErrors = {checkIn?: string; checkOut?: string};

/** Stay search in the hero. Dates and guests are shared with the rooms, rates and booking form. */
export function StaySearch() {
  const {stay, setStay, goToSection} = useStay();
  const today = useToday();
  const [errors, setErrors] = useState<SearchErrors>({});
  const range = today ? bookingWindow(today) : null;

  const nights = stay.checkIn && stay.checkOut ? daysBetween(stay.checkIn, stay.checkOut) : 0;
  const availableCount =
    nights > 0 ? rooms.filter(r => roomStayStatus(r, stay.checkIn, stay.checkOut, stay.guests).status === 'available').length : null;

  function onCheckIn(v: string | undefined) {
    const checkIn = v ?? '';
    const patch: {checkIn: string; checkOut?: string} = {checkIn};
    if (checkIn && (!stay.checkOut || daysBetween(checkIn, stay.checkOut) <= 0 || daysBetween(checkIn, stay.checkOut) > MAX_NIGHTS)) {
      patch.checkOut = addDays(checkIn, 2);
    }
    setStay(patch);
    setErrors({});
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: SearchErrors = {};
    if (!stay.checkIn) next.checkIn = 'Choose a check-in date.';
    if (!stay.checkOut) next.checkOut = 'Choose a check-out date.';
    else if (stay.checkIn && daysBetween(stay.checkIn, stay.checkOut) <= 0) next.checkOut = 'Check-out must be after check-in.';
    setErrors(next);
    if (Object.keys(next).length === 0) goToSection('rooms');
  }

  return (
    <form role="search" aria-label="Search sample availability" noValidate onSubmit={onSubmit} className={styles.searchCard}>
      <div className={styles.searchFields}>
        <DateInput
          label="Check-in"
          value={(stay.checkIn || undefined) as ISODateString | undefined}
          onChange={onCheckIn}
          min={range?.min as ISODateString | undefined}
          max={range?.max as ISODateString | undefined}
          presentation="adaptive-bottom-sheet"
          weekStartsOn="mon"
          format="date"
          placeholder="Add date"
          status={errors.checkIn ? {type: 'error', message: errors.checkIn} : undefined}
          statusVariant="detached"
          width="100%"
        />
        <DateInput
          label="Check-out"
          value={(stay.checkOut || undefined) as ISODateString | undefined}
          onChange={v => {
            setStay({checkOut: v ?? ''});
            setErrors({});
          }}
          min={(stay.checkIn ? addDays(stay.checkIn, 1) : range?.min) as ISODateString | undefined}
          max={(stay.checkIn ? addDays(stay.checkIn, MAX_NIGHTS) : range?.max) as ISODateString | undefined}
          presentation="adaptive-bottom-sheet"
          weekStartsOn="mon"
          format="date"
          placeholder="Add date"
          status={errors.checkOut ? {type: 'error', message: errors.checkOut} : undefined}
          statusVariant="detached"
          width="100%"
        />
        <Selector
          label="Guests"
          options={guestOptions}
          value={String(stay.guests)}
          onChange={v => setStay({guests: Number(v ?? 2)})}
          width="100%"
        />
        <div className={styles.searchSubmit}>
          <Button type="submit" variant="primary" size="lg" label="Check availability" width="100%" />
        </div>
      </div>
      <p className={styles.searchStatus} role="status" aria-live="polite">
        {availableCount === null
          ? 'Sample availability only. Nothing is reserved.'
          : `${nights} ${nights === 1 ? 'night' : 'nights'}: ${availableCount} of ${rooms.length} sample rooms free for ${stay.guests} ${stay.guests === 1 ? 'guest' : 'guests'}.`}
      </p>
    </form>
  );
}
