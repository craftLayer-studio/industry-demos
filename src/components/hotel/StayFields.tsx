'use client';

import {DateInput} from '@astryxdesign/core/DateInput';
import {Selector} from '@astryxdesign/core/Selector';
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {useStay} from './StayProvider';
import {useToday} from './useToday';
import {guestOptions, roomTypeLabels, rooms, viewLabels} from './lib/data';
import {addDays, daysBetween} from './lib/dates';
import {MAX_NIGHTS, formatGBP} from './lib/rates';
import {bookingWindow} from './lib/booking';

export const roomOptions = rooms.map(r => ({
  value: r.id,
  label: r.name,
  description: `${roomTypeLabels[r.type]} · ${viewLabels[r.view]} · sleeps ${r.sleeps} · from ${formatGBP(r.baseRate)}`,
}));

type Status = {type: 'error'; message: string} | undefined;

/**
 * The shared stay controls (room, dates, guests), used by both the rate
 * calculator and the booking form so they always agree.
 */
export function StayFields({
  idPrefix,
  errors = {},
}: {
  idPrefix: string;
  errors?: {roomId?: string; checkIn?: string; checkOut?: string; guests?: string};
}) {
  const {stay, setStay} = useStay();
  const today = useToday();
  const range = today ? bookingWindow(today) : null;
  const status = (m?: string): Status => (m ? {type: 'error', message: m} : undefined);

  function onCheckIn(v: string | undefined) {
    const checkIn = v ?? '';
    const patch: {checkIn: string; checkOut?: string} = {checkIn};
    if (checkIn && (!stay.checkOut || daysBetween(checkIn, stay.checkOut) <= 0 || daysBetween(checkIn, stay.checkOut) > MAX_NIGHTS)) {
      patch.checkOut = addDays(checkIn, 2);
    }
    setStay(patch);
  }

  return (
    <>
      <div data-field="roomId" id={`${idPrefix}-room`}>
        <Selector
          label="Room"
          placeholder="Choose a sample room"
          options={roomOptions}
          value={stay.roomId || undefined}
          onChange={v => setStay({roomId: v ?? ''})}
          status={status(errors.roomId)}
          statusVariant="detached"
          width="100%"
        />
      </div>
      <div data-field="checkIn">
        <DateInput
          label="Check-in"
          value={(stay.checkIn || undefined) as ISODateString | undefined}
          onChange={onCheckIn}
          min={range?.min as ISODateString | undefined}
          max={range?.max as ISODateString | undefined}
          presentation="adaptive-bottom-sheet"
          weekStartsOn="mon"
          format="date_weekday"
          status={status(errors.checkIn)}
          statusVariant="detached"
          width="100%"
        />
      </div>
      <div data-field="checkOut">
        <DateInput
          label="Check-out"
          value={(stay.checkOut || undefined) as ISODateString | undefined}
          onChange={v => setStay({checkOut: v ?? ''})}
          min={(stay.checkIn ? addDays(stay.checkIn, 1) : range?.min) as ISODateString | undefined}
          max={(stay.checkIn ? addDays(stay.checkIn, MAX_NIGHTS) : range?.max) as ISODateString | undefined}
          presentation="adaptive-bottom-sheet"
          weekStartsOn="mon"
          format="date_weekday"
          status={status(errors.checkOut)}
          statusVariant="detached"
          width="100%"
        />
      </div>
      <div data-field="guests">
        <Selector
          label="Guests"
          options={guestOptions}
          value={String(stay.guests)}
          onChange={v => setStay({guests: Number(v ?? 2)})}
          status={status(errors.guests)}
          statusVariant="detached"
          width="100%"
        />
      </div>
    </>
  );
}
