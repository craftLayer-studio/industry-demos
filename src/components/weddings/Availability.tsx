'use client';

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Selector} from '@astryxdesign/core/Selector';
import {Icon} from '@astryxdesign/core/Icon';
import {SectionShell} from './SectionShell';
import {SAMPLE_MONTHS, SAMPLE_YEAR, monthGrid, monthSummary, openSaturdays, sampleStatus, statusLabels, type DateStatus} from './lib/availability';
import {formatLongDate, formatMonth, parseISODate} from './lib/dates';
import {classifyDate, dayTypes, seasons} from './lib/pricing';
import styles from './hollin.module.css';

const WEEKDAYS = [
  {short: 'Mon', long: 'Monday'},
  {short: 'Tue', long: 'Tuesday'},
  {short: 'Wed', long: 'Wednesday'},
  {short: 'Thu', long: 'Thursday'},
  {short: 'Fri', long: 'Friday'},
  {short: 'Sat', long: 'Saturday'},
  {short: 'Sun', long: 'Sunday'},
];

const LEGEND: DateStatus[] = ['open', 'limited', 'booked', 'closed'];

const dayMonthFmt = new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'long', timeZone: 'UTC'});

type Props = {onPriceDate: (iso: string) => void};

export function Availability({onPriceDate}: Props) {
  const [monthIndex, setMonthIndex] = useState(2); // June
  const [selected, setSelected] = useState<string | null>(null);
  const month = SAMPLE_MONTHS[monthIndex];
  const weeks = monthGrid(SAMPLE_YEAR, month);
  const summary = monthSummary(SAMPLE_YEAR, month);
  const saturdays = openSaturdays(SAMPLE_YEAR, month);
  const monthLabel = formatMonth(SAMPLE_YEAR, month);

  const selectedStatus = selected ? sampleStatus(selected) : null;
  const selectedClass = selected ? classifyDate(selected) : null;
  const canPrice = selectedStatus === 'open' || selectedStatus === 'limited';

  function goTo(i: number) {
    setMonthIndex(i);
    setSelected(null);
  }

  return (
    <SectionShell
      id="dates"
      eyebrow="Sample availability"
      title="Find a date in the 2027 season"
      lead="A fixed sample diary for April to October 2027, made up for this demo. Pick a day to see its status and price it in the builder above.">
      <div className={styles.availGrid}>
        <Card padding={6} className={styles.calendarCard}>
          <VStack gap={5}>
            <HStack gap={3} justify="between" vAlign="end" wrap="wrap">
              <Heading level={3} id="calendar-month" className={styles.cardHeading} aria-live="polite">
                {monthLabel}
              </Heading>
              <HStack gap={2} vAlign="center">
                <Button
                  label="Previous month"
                  icon={<Icon icon="chevronLeft" />}
                  isIconOnly
                  tooltip="Previous month"
                  size="sm"
                  isDisabled={monthIndex === 0}
                  onClick={() => goTo(monthIndex - 1)}
                />
                <Selector
                  label="Month"
                  isLabelHidden
                  size="sm"
                  value={String(month)}
                  onChange={v => goTo(SAMPLE_MONTHS.indexOf(Number(v) as (typeof SAMPLE_MONTHS)[number]))}
                  options={SAMPLE_MONTHS.map(m => ({value: String(m), label: formatMonth(SAMPLE_YEAR, m)}))}
                />
                <Button
                  label="Next month"
                  icon={<Icon icon="chevronRight" />}
                  isIconOnly
                  tooltip="Next month"
                  size="sm"
                  isDisabled={monthIndex === SAMPLE_MONTHS.length - 1}
                  onClick={() => goTo(monthIndex + 1)}
                />
              </HStack>
            </HStack>

            <table className={styles.calendar} aria-labelledby="calendar-month">
              <thead>
                <tr>
                  {WEEKDAYS.map(d => (
                    <th key={d.short} scope="col">
                      <abbr title={d.long}>{d.short}</abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, wi) => (
                  <tr key={wi}>
                    {week.map((cell, ci) =>
                      cell ? (
                        <td key={cell.iso}>
                          <button
                            type="button"
                            className={`${styles.day} ${styles[`day_${cell.status}`]}`}
                            aria-pressed={selected === cell.iso}
                            aria-label={`${formatLongDate(cell.iso)}: ${statusLabels[cell.status]}`}
                            onClick={() => setSelected(cell.iso)}>
                            <span aria-hidden="true">{cell.day}</span>
                          </button>
                        </td>
                      ) : (
                        <td key={`empty-${ci}`} aria-hidden="true" />
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className={styles.legend} aria-label="Key">
              {LEGEND.map(s => (
                <li key={s}>
                  <span className={`${styles.legendSwatch} ${styles[`day_${s}`]}`} aria-hidden="true" />
                  {statusLabels[s]}
                </li>
              ))}
            </ul>
          </VStack>
        </Card>

        <VStack gap={5}>
          <Card padding={6} className={styles.dateDetail}>
            <div aria-live="polite">
              {selected && selectedStatus && selectedClass ? (
                <VStack gap={3}>
                  <Text as="p" className={styles.spaceMoment}>
                    Selected date
                  </Text>
                  <Heading level={3} className={styles.cardHeading}>
                    {formatLongDate(selected)}
                  </Heading>
                  <p className={`${styles.statusPill} ${styles[`pill_${selectedStatus}`]}`}>{statusLabels[selectedStatus]}</p>
                  <Text as="p" color="secondary" textWrap="pretty">
                    {selectedStatus === 'open' &&
                      `Free in the sample diary. Priced as ${seasons.find(s => s.value === selectedClass.season)!.label.toLowerCase()} season, ${dayTypes.find(d => d.value === selectedClass.dayType)!.detail}.`}
                    {selectedStatus === 'limited' && 'Another couple holds this date for a few days. On a real site you could ask to be told if it frees up.'}
                    {selectedStatus === 'booked' && 'Taken in the sample diary. Try a nearby Friday or Sunday.'}
                    {selectedStatus === 'closed' && 'The barn rests on Mondays in this sample setup, so no events run.'}
                  </Text>
                  {canPrice ? (
                    <HStack>
                      <Button label="Price this date" variant="primary" onClick={() => onPriceDate(selected)} />
                    </HStack>
                  ) : null}
                </VStack>
              ) : (
                <VStack gap={2}>
                  <Heading level={3} className={styles.cardHeading}>
                    Pick a day
                  </Heading>
                  <Text as="p" color="secondary">
                    Select any date in the calendar to see its sample status.
                  </Text>
                </VStack>
              )}
            </div>
          </Card>
          <Card padding={6} variant="muted" className={styles.monthCard}>
            <VStack gap={3}>
              <Heading level={3} className={styles.smallHeading}>
                {monthLabel} at a glance
              </Heading>
              <dl className={styles.monthStats}>
                <div>
                  <dt>Available</dt>
                  <dd>{summary.open}</dd>
                </div>
                <div>
                  <dt>On hold</dt>
                  <dd>{summary.limited}</dd>
                </div>
                <div>
                  <dt>Booked</dt>
                  <dd>{summary.booked}</dd>
                </div>
              </dl>
              <Text as="p" color="secondary" textWrap="pretty">
                {saturdays.length > 0
                  ? `Saturdays not yet booked: ${saturdays.map(s => dayMonthFmt.format(parseISODate(s))).join(', ')}.`
                  : 'Every Saturday this month is booked in the sample diary.'}
              </Text>
            </VStack>
          </Card>
        </VStack>
      </div>
    </SectionShell>
  );
}
