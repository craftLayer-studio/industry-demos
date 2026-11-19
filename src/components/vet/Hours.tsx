'use client';

import {useSyncExternalStore} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {dayNames, weeklyHours} from './lib/data';
import {formatDayHours, getOpenStatus} from './lib/hours';
import styles from './vet.module.css';

// Monday-first display order.
const ORDER = [1, 2, 3, 4, 5, 6, 0];

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}
// A minute stamp keeps the snapshot stable between ticks.
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

export function Hours() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const now = minute === null ? null : new Date(minute * 60_000);
  const status = now ? getOpenStatus(now, weeklyHours) : null;
  const today = now?.getDay();

  return (
    <SectionShell
      id="hours"
      eyebrow="Opening hours"
      title="When the door is open"
      lead="Fictional hours for a fictional practice. The open-now check uses your device's clock.">
      <Grid columns={{minWidth: 300, max: 2}} gap={6} align="start">
        <VStack gap={4}>
          <p
            className={`${styles.statusPill} ${status?.isOpen ? styles.statusOpen : styles.statusClosed}`}
            role="status">
            <span className={styles.statusDot} aria-hidden="true" />
            {status ? status.label : 'Checking opening hours…'}
          </p>
          <Card padding={2}>
            <Table density="balanced">
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Day</TableHeaderCell>
                  <TableHeaderCell>Hours</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDER.map(d => (
                  <TableRow key={d} className={d === today ? styles.todayRow : undefined}>
                    <TableCell>
                      {dayNames[d]}
                      {d === today ? ' (today)' : ''}
                    </TableCell>
                    <TableCell>{formatDayHours(weeklyHours[d])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </VStack>
        <VStack gap={4}>
          <Card padding={6} variant="muted">
            <VStack gap={2}>
              <Heading level={3}>Late on Wednesdays</Heading>
              <Text as="p" color="secondary">
                In this concept the practice stays open until 8:00pm on Wednesdays for people who cannot get away
                from work earlier.
              </Text>
            </VStack>
          </Card>
          <Card padding={6} variant="muted">
            <VStack gap={2}>
              <Heading level={3}>Bank holidays</Heading>
              <Text as="p" color="secondary">
                A real practice would post holiday hours here in advance. Outside opening hours, contact your
                nearest out-of-hours vet.
              </Text>
            </VStack>
          </Card>
        </VStack>
      </Grid>
    </SectionShell>
  );
}
