'use client';

import {useState} from 'react';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {SectionShell} from './SectionShell';
import {practiceAreas, type PracticeId} from './lib/data';
import styles from './legal.module.css';

export function PracticeAreas({onEnquire}: {onEnquire: (area: PracticeId) => void}) {
  const [tab, setTab] = useState<PracticeId>('property');
  return (
    <SectionShell
      id="practice"
      eyebrow="I. Practice areas"
      title="Five areas of law, handled with the same care"
      lead="Choose an area to see what the firm helps with and how fees are agreed.">
      <VStack gap={8}>
        <div className={styles.tabsWrap}>
          <TabList value={tab} onChange={v => setTab(v as PracticeId)} role="tablist" hasDivider>
            {practiceAreas.map(a => (
              <Tab key={a.id} value={a.id} label={a.label} panelId={`practice-panel-${a.id}`} id={`practice-tab-${a.id}`} />
            ))}
          </TabList>
        </div>
        {practiceAreas.map((a, i) => (
          <div
            key={a.id}
            id={`practice-panel-${a.id}`}
            role="tabpanel"
            aria-labelledby={`practice-tab-${a.id}`}
            hidden={tab !== a.id}
            tabIndex={0}
            className={styles.practicePanel}>
            <VStack gap={5} className={styles.practiceMain}>
              <span className={styles.practiceNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <Heading level={3} className={styles.practiceTitle}>
                {a.title}
              </Heading>
              <Text as="p" type="large" color="secondary" textWrap="pretty">
                {a.summary}
              </Text>
              <div>
                <Button label={`Enquire about ${a.label.toLowerCase()}`} variant="primary" onClick={() => onEnquire(a.id)} />
              </div>
            </VStack>
            <VStack gap={5} className={styles.practiceAside}>
              <VStack gap={3}>
                <Text as="p" className={styles.smallCaps}>
                  We can help with
                </Text>
                <ul className={styles.ruledList}>
                  {a.helpWith.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </VStack>
              <VStack gap={2}>
                <span>
                  <Badge label={a.feeKind} variant="neutral" />
                </span>
                <Text as="p" color="secondary">
                  {a.feeApproach}
                </Text>
              </VStack>
            </VStack>
          </div>
        ))}
      </VStack>
    </SectionShell>
  );
}
