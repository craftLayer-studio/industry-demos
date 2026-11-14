'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {SectionShell} from './SectionShell';
import {EVENT_KINDS, EVENTS, filterEvents, type EventKind} from './lib/content';
import styles from './nonprofit.module.css';

const SHORT: Record<EventKind | 'all', string> = {
  all: 'All',
  cook: 'Cook & eat',
  volunteer: 'Volunteer',
  family: 'Family',
};

const KIND_LABEL = Object.fromEntries(EVENT_KINDS.map(k => [k.value, k.label])) as Record<EventKind | 'all', string>;

export function Events() {
  const [kind, setKind] = useState<EventKind | 'all'>('all');
  const list = filterEvents(EVENTS, kind);

  return (
    <SectionShell
      id="events"
      tone="butter"
      eyebrow="Coming up"
      title="Events around the table"
      lead="Sample events in fictional Larkfield. Everything is free in this concept, and nothing here can be booked.">
      <VStack gap={6}>
        <VStack gap={2}>
          <SegmentedControl value={kind} onChange={v => setKind(v as EventKind | 'all')} label="Filter events by type">
            {EVENT_KINDS.map(k => (
              <SegmentedControlItem key={k.value} value={k.value} label={SHORT[k.value]} />
            ))}
          </SegmentedControl>
          <p className={styles.resultCount} role="status">
            {kind === 'all' ? `Showing all ${list.length} events` : `${list.length} ${KIND_LABEL[kind].toLowerCase()} events`}
          </p>
        </VStack>
        <ul className={styles.eventList}>
          {list.map(ev => (
            <li key={ev.id} className={styles.eventCard}>
              <p className={styles.eventDate} aria-label={`${ev.weekday} ${ev.day} ${ev.month}`}>
                <span className={styles.eventWeekday}>{ev.weekday}</span>
                <span className={styles.eventDay}>{ev.day}</span>
                <span className={styles.eventMonth}>{ev.month}</span>
              </p>
              <VStack gap={2}>
                <Badge
                  className={styles.eventBadge}
                  label={KIND_LABEL[ev.kind]} variant={ev.kind === 'cook' ? 'orange' : ev.kind === 'volunteer' ? 'green' : 'blue'} />
                <Heading level={3} className={styles.eventTitle}>
                  {ev.title}
                </Heading>
                <Text as="p" color="secondary">
                  {ev.time} · {ev.place}
                </Text>
                <Text as="p">{ev.blurb}</Text>
              </VStack>
            </li>
          ))}
        </ul>
      </VStack>
    </SectionShell>
  );
}
