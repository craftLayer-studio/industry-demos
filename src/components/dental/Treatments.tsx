'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {SectionShell} from './SectionShell';
import {CategoryGlyph} from './art';
import {categories, categoryById, treatments, type Treatment} from './lib/data';
import {countLabel, filterTreatments, type TreatmentFilter} from './lib/filter';
import {formatRange} from './lib/format';
import {MIN_COST} from './lib/finance';
import styles from './dental.module.css';

const PANEL_ID = 'treatments-panel';

export function Treatments({onEstimate}: {onEstimate: (t: Treatment) => void}) {
  const [filter, setFilter] = useState<TreatmentFilter>('all');
  const list = filterTreatments(treatments, filter);
  const activeLabel = filter === 'all' ? 'All treatments' : categoryById(filter)?.label;

  return (
    <SectionShell
      id="treatments"
      eyebrow="Treatments"
      title="Treatments, with sample prices up front"
      lead="Browse by area of care. Price ranges are illustrative samples for this concept: a real practice would confirm fees in a written plan after an examination.">
      <VStack gap={6}>
        <TabList value={filter} onChange={v => setFilter(v as TreatmentFilter)} role="tablist" hasDivider>
          <Tab value="all" label="All" panelId={PANEL_ID} />
          {categories.map(c => (
            <Tab key={c.id} value={c.id} label={c.label} panelId={PANEL_ID} />
          ))}
        </TabList>
        <div id={PANEL_ID} role="tabpanel" aria-label={activeLabel} className={styles.treatmentPanel}>
          <p className={styles.srOnly} aria-live="polite">
            Showing {countLabel(list.length)}
          </p>
          <ul className={styles.treatmentGrid}>
            {list.map(t => {
              const category = categoryById(t.category);
              const canEstimate = t.priceTo >= MIN_COST;
              return (
                <li key={t.id}>
                  <Card padding={6} className={styles.treatmentCard}>
                    <VStack gap={4} className={styles.fill}>
                      <HStack gap={3} vAlign="center">
                        <span className={styles.glyph}>
                          <CategoryGlyph id={t.category} />
                        </span>
                        <Text type="supporting" color="secondary">
                          {category?.label}
                        </Text>
                      </HStack>
                      <Heading level={3} className={styles.cardTitle}>
                        {t.name}
                      </Heading>
                      <Text as="p" color="secondary" textWrap="pretty">
                        {t.summary}
                      </Text>
                      <VStack gap={1} className={styles.priceBlock}>
                        <Text type="supporting" color="secondary">
                          Sample price, illustrative
                        </Text>
                        <Text weight="semibold" className={styles.price}>
                          {formatRange(t.priceFrom, t.priceTo)}{' '}
                          <Text type="supporting" color="secondary">
                            {t.unit}
                          </Text>
                        </Text>
                        <Text type="supporting" color="secondary">
                          {t.visits}
                        </Text>
                      </VStack>
                      {canEstimate ? (
                        <Button
                          label={`Estimate monthly payments for ${t.name}`}
                          variant="secondary"
                          size="sm"
                          onClick={() => onEstimate(t)}
                          className={styles.estimateButton}>
                          Estimate monthly
                        </Button>
                      ) : null}
                    </VStack>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </VStack>
    </SectionShell>
  );
}
