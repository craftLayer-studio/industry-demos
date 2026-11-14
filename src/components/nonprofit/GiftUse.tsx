'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {allocate, formatMoney} from './lib/donation';
import styles from './nonprofit.module.css';

const SAMPLE_AMOUNTS = ['20', '50', '100'];

/** Segment colours, in the same order as ILLUSTRATIVE_SPLIT. All meet 3:1 against the cream card. */
const BAR_COLORS = ['#2f6b3a', '#d9512c', '#a8641f', '#4f7f34', '#2c6f7a'];

export function GiftUse() {
  const [sample, setSample] = useState('50');
  const amount = Number(sample);
  const parts = allocate(amount);
  const summary = parts.map(p => `${p.label} ${formatMoney(p.amount)} (${p.percent}%)`).join(', ');

  return (
    <SectionShell
      id="gift-use"
      tone="forest"
      eyebrow="Where a gift goes"
      title="How a sample gift could be used"
      lead="An illustrative model to show how a food network might explain its spending. These are not real accounts: Common Table is fictional and has no budget.">
      <div className={styles.giftCard}>
        <VStack gap={6}>
          <HStack gap={4} wrap="wrap" justify="between" vAlign="center">
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Heading level={3} className={styles.cardTitle}>
                For example, a {formatMoney(amount)} gift
              </Heading>
              <Badge label="Illustrative" variant="warning" />
            </HStack>
            <SegmentedControl value={sample} onChange={setSample} label="Sample gift amount">
              {SAMPLE_AMOUNTS.map(a => (
                <SegmentedControlItem key={a} value={a} label={formatMoney(Number(a))} />
              ))}
            </SegmentedControl>
          </HStack>

          <div className={styles.giftGrid}>
            <div
              role="img"
              aria-label={`Illustrative bar chart. A sample ${formatMoney(amount)} gift split as: ${summary}.`}
              className={styles.barChart}>
              {parts.map((p, i) => (
                <div key={p.id} className={styles.barRow} aria-hidden="true">
                  <span className={styles.barLabel}>{p.label}</span>
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className={styles.barTrack} focusable="false">
                    <rect x="0" y="0" width="100" height="10" rx="2" fill="#f3e6b4" />
                    <rect x="0" y="0" width={p.percent * 2} height="10" rx="2" fill={BAR_COLORS[i]} />
                  </svg>
                  <span className={styles.barValue}>
                    {formatMoney(p.amount)} <span className={styles.barPct}>{p.percent}%</span>
                  </span>
                </div>
              ))}
              <p className={styles.barNote} aria-hidden="true">
                Bar length is relative to the largest share (50%).
              </p>
            </div>

            <VStack gap={2}>
              <Text as="p" weight="bold" id="gift-table-caption">
                The same sample split as a table
              </Text>
              <Table aria-labelledby="gift-table-caption" density="compact" dividers="rows" className={styles.giftTable}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Area</TableHeaderCell>
                    <TableHeaderCell>Share</TableHeaderCell>
                    <TableHeaderCell>Of {formatMoney(amount)}</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parts.map(p => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <span className={styles.tableArea}>{p.label}</span>
                        <span className={styles.tableDetail}>{p.detail}</span>
                      </TableCell>
                      <TableCell>{p.percent}%</TableCell>
                      <TableCell>{formatMoney(p.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </VStack>
          </div>
          <Text as="p" type="supporting" color="secondary">
            Illustrative only. A real organisation would publish audited figures; this concept shows how such figures
            could be presented clearly, with a chart and an equivalent table.
          </Text>
        </VStack>
      </div>
    </SectionShell>
  );
}
