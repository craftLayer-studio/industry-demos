'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {SectionShell} from './SectionShell';
import {MonogramPortrait} from './art';
import {useBookingBridge} from './BookingBridge';
import {categories, categoryById, specialists} from './lib/data';
import {formatDays} from './lib/format';
import {filterSpecialists, type SpecialtyFilter} from './lib/filter';
import styles from './salon.module.css';

export function Specialists() {
  const [filter, setFilter] = useState<SpecialtyFilter>('all');
  const bridge = useBookingBridge();
  const shown = filterSpecialists(specialists, filter);
  const filterName = filter === 'all' ? null : categoryById(filter).name.toLowerCase();

  return (
    <SectionShell
      id="specialists"
      eyebrow="The team"
      title="Stylists and therapists"
      lead="A small, fictional team. Portraits are illustrated monograms, not photographs of real people."
      tone="petal">
      <VStack gap={6}>
        <div className={styles.filterRow}>
          <div className={styles.segmentTight}>
            <SegmentedControl label="Filter by specialty" value={filter} onChange={v => setFilter(v as SpecialtyFilter)}>
              <SegmentedControlItem value="all" label="All" />
              {categories.map(c => (
                <SegmentedControlItem key={c.id} value={c.id} label={c.name} />
              ))}
            </SegmentedControl>
          </div>
          <p className={styles.filterCount} role="status">
            {filterName ? `${shown.length} specialists offer ${filterName}.` : `Showing all ${shown.length} specialists.`}
          </p>
        </div>
        <ul className={styles.teamGrid} aria-label="Specialists">
          {shown.map(s => (
            <li key={s.id}>
              <Card padding={5} className={styles.teamCard}>
                <VStack gap={4}>
                  <MonogramPortrait initials={s.initials} motif={s.motif} />
                  <VStack gap={1}>
                    <Heading level={3} className={styles.teamName}>
                      {s.name}
                    </Heading>
                    <Text type="label" className={styles.teamRole}>
                      {s.role}
                    </Text>
                  </VStack>
                  <Text as="p" color="secondary">
                    {s.focus}
                  </Text>
                  <dl className={styles.teamMeta}>
                    <dt>Specialties</dt>
                    <dd>{s.categories.map(c => categoryById(c).name).join(', ')}</dd>
                    <dt>In the studio</dt>
                    <dd>{formatDays(s.days)}</dd>
                  </dl>
                  <Button
                    label={`Request with ${s.name.split(' ')[0]}`}
                    variant="secondary"
                    onClick={() => bridge.startWithSpecialist(s.id)}
                  />
                </VStack>
              </Card>
            </li>
          ))}
        </ul>
      </VStack>
    </SectionShell>
  );
}
