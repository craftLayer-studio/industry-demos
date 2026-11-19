'use client';

import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Table} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {StayFields} from './StayFields';
import {useStay} from './StayProvider';
import {useToday} from './useToday';
import {roomById} from './lib/data';
import {addDays, formatShortDate, nextFriday, shortWeekday} from './lib/dates';
import {
  BREAKFAST_PER_GUEST,
  MAX_NIGHTS,
  WEEKEND_MIN_NIGHTS,
  WEEKEND_UPLIFT,
  availabilityStrip,
  formatGBP,
  issueMessage,
  quoteStay,
} from './lib/rates';
import styles from './saltmarsh.module.css';

type NightRow = {id: string; night: string; rate: string; note: string};

export function RateCalculator() {
  const {stay, setStay} = useStay();
  const today = useToday();
  const room = roomById(stay.roomId);
  const quote = quoteStay(stay);
  const stripFrom = stay.checkIn || today;
  const strip = room && stripFrom ? availabilityStrip(room, stripFrom, 14) : [];
  const nightsSet = new Set(quote.nights.map(n => n.date));

  const rows: NightRow[] = quote.nights.map(n => ({
    id: n.date,
    night: formatShortDate(n.date),
    rate: formatGBP(n.rate),
    note: !n.isAvailable ? 'Taken (sample)' : n.isWeekend ? `Weekend +${Math.round(WEEKEND_UPLIFT * 100)}%` : 'Midweek',
  }));

  function sampleWeekend() {
    if (!today) return;
    const fri = nextFriday(addDays(today, 7));
    setStay({checkIn: fri, checkOut: addDays(fri, 2), roomId: stay.roomId || 'tideline'});
  }

  const blocking = quote.issues.filter(i => i.code !== 'room' && i.code !== 'dates');
  const needsInput = quote.issues.some(i => i.code === 'room' || i.code === 'dates');

  return (
    <SectionShell
      id="rates"
      tone="glass"
      eyebrow="Availability and rates"
      title="Price a stay, night by night"
      lead="Pick a room and dates to see sample availability and an itemised sample rate. Nothing is held or reserved.">
      <div className={styles.rateGrid}>
        <Card padding={6} className={styles.rateControls}>
          <VStack gap={5}>
            <Heading level={3} className={styles.cardHeading}>
              Your stay
            </Heading>
            <StayFields idPrefix="rates" />
            <CheckboxInput
              label={`Add breakfast (${formatGBP(BREAKFAST_PER_GUEST)} per guest per night, sample)`}
              value={stay.breakfast}
              onChange={v => setStay({breakfast: v})}
            />
            <Button label="Try a sample weekend" variant="secondary" onClick={sampleWeekend} isDisabled={!today} />
            <ul className={styles.ruleList} aria-label="Sample rate rules">
              <li>Friday and Saturday nights: +{Math.round(WEEKEND_UPLIFT * 100)}% weekend uplift.</li>
              <li>Stays with a Saturday night: at least {WEEKEND_MIN_NIGHTS} nights.</li>
              <li>Lookout Suite: 2 nights minimum. Boathouse Cottage: 3.</li>
              <li>Up to {MAX_NIGHTS} nights. No taxes or fees: nothing here is real.</li>
            </ul>
          </VStack>
        </Card>

        <VStack gap={5} className={styles.rateResult}>
          <Card padding={6}>
            <VStack gap={4}>
              <HStack justify="between" vAlign="center" wrap="wrap" gap={2}>
                <Heading level={3} className={styles.cardHeading}>
                  {room ? `${room.name}: next 14 nights` : 'Sample availability'}
                </Heading>
                <ul className={styles.legend} aria-label="Legend">
                  <li><span className={`${styles.swatch} ${styles.swatchFree}`} aria-hidden="true" />Free</li>
                  <li><span className={`${styles.swatch} ${styles.swatchTaken}`} aria-hidden="true" />Taken</li>
                  <li><span className={`${styles.swatch} ${styles.swatchStay}`} aria-hidden="true" />Your stay</li>
                </ul>
              </HStack>
              {strip.length > 0 ? (
                <ol className={styles.strip} aria-label={`Sample availability for ${room?.name}, 14 nights from ${formatShortDate(strip[0].date)}`}>
                  {strip.map(n => {
                    const inStay = nightsSet.has(n.date);
                    const cls = [styles.stripDay, n.isAvailable ? styles.dayFree : styles.dayTaken, inStay ? styles.dayStay : ''].join(' ');
                    const day = Number(n.date.slice(8, 10));
                    return (
                      <li key={n.date} className={cls}>
                        <span className={styles.stripWeekday}>{shortWeekday(n.date)}</span>
                        <span className={styles.stripDate}>{day}</span>
                        <span className={styles.stripRate}>{n.isAvailable ? formatGBP(n.rate) : 'Taken'}</span>
                        <span className={styles.srOnly}>
                          {`${formatShortDate(n.date)}: ${n.isAvailable ? `free, ${formatGBP(n.rate)}` : 'taken'}${inStay ? ', in your stay' : ''}`}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <Text as="p" color="secondary">
                  Choose a room to see which of the next 14 nights are free in the sample calendar.
                </Text>
              )}
            </VStack>
          </Card>

          <Card padding={6} className={styles.quoteCard}>
            <VStack gap={4}>
              <Heading level={3} className={styles.cardHeading}>
                Sample quote
              </Heading>
              <div role="status" aria-live="polite" className={styles.quoteLive}>
                {needsInput ? (
                  <Text as="p" color="secondary">
                    {issueMessage(quote.issues[0])} Then the nightly breakdown appears here.
                  </Text>
                ) : (
                  <>
                    {blocking.length > 0 ? (
                      <ul className={styles.issueList}>
                        {blocking.map(i => (
                          <li key={i.code}>{issueMessage(i, formatShortDate)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.quoteOk}>
                        {room?.name} is free for all {quote.nights.length} nights in the sample calendar.
                      </p>
                    )}
                  </>
                )}
              </div>
              {rows.length > 0 ? (
                <>
                  <Table
                    data={rows}
                    idKey="id"
                    density="compact"
                    columns={[
                      {key: 'night', header: 'Night'},
                      {key: 'note', header: 'Rate type'},
                      {key: 'rate', header: 'Sample rate', align: 'end'},
                    ]}
                  />
                  <dl className={styles.totals}>
                    <div>
                      <dt>Room, {quote.nights.length} {quote.nights.length === 1 ? 'night' : 'nights'}</dt>
                      <dd>{formatGBP(quote.roomSubtotal)}</dd>
                    </div>
                    {quote.weekendUplift > 0 ? (
                      <div className={styles.totalsMinor}>
                        <dt>Includes weekend uplift</dt>
                        <dd>{formatGBP(quote.weekendUplift)}</dd>
                      </div>
                    ) : null}
                    {stay.breakfast ? (
                      <div>
                        <dt>
                          Breakfast, {stay.guests} × {quote.nights.length}
                        </dt>
                        <dd>{formatGBP(quote.breakfastTotal)}</dd>
                      </div>
                    ) : null}
                    <div className={styles.totalsGrand}>
                      <dt>Sample total</dt>
                      <dd>{formatGBP(quote.total)}</dd>
                    </div>
                  </dl>
                  <Text as="p" type="supporting" color="secondary">
                    Illustrative figures for a fictional hotel. Nothing is held, booked or charged.
                  </Text>
                  <HStack>
                    <Button href="#book" label={quote.ok ? 'Request this stay' : 'Go to the booking form'} variant="primary" />
                  </HStack>
                </>
              ) : null}
            </VStack>
          </Card>
        </VStack>
      </div>
    </SectionShell>
  );
}
