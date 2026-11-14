'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {SectionShell} from './SectionShell';
import {BreakfastArt, KitchenArt, PantryArt} from './illustrations';
import {PROGRAMMES, type ProgrammeId} from './lib/content';
import styles from './nonprofit.module.css';

const ART: Record<ProgrammeId, typeof PantryArt> = {
  pantries: PantryArt,
  kitchens: KitchenArt,
  breakfast: BreakfastArt,
};

export function Programmes() {
  const [active, setActive] = useState<ProgrammeId>('pantries');

  return (
    <SectionShell
      id="programmes"
      tone="cream"
      eyebrow="What we do"
      title="Three ways to share a meal"
      lead="Every programme in this concept is built around choice and dignity: walk in, sit down, pick what you like.">
      <VStack gap={6}>
        <TabList value={active} onChange={v => setActive(v as ProgrammeId)} role="tablist" hasDivider size="lg">
          {PROGRAMMES.map(p => (
            <Tab key={p.id} value={p.id} label={p.label} panelId={`programme-${p.id}`} id={`programme-tab-${p.id}`} />
          ))}
        </TabList>
        {PROGRAMMES.map(p => {
          const Art = ART[p.id];
          return (
            <div
              key={p.id}
              id={`programme-${p.id}`}
              role="tabpanel"
              aria-labelledby={`programme-tab-${p.id}`}
              hidden={active !== p.id}
              tabIndex={0}
              className={styles.programmePanel}>
              <Art className={styles.programmeArt} />
              <VStack gap={4}>
                <Heading level={3} className={styles.programmeTitle}>
                  {p.title}
                </Heading>
                <Text as="p" type="large" color="secondary" textWrap="pretty">
                  {p.body}
                </Text>
                <ul className={styles.tickList}>
                  {p.points.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </VStack>
            </div>
          );
        })}
      </VStack>
    </SectionShell>
  );
}
