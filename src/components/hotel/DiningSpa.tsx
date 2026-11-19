'use client';

import {useState, type ReactNode} from 'react';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {BreakfastArt, DiningArt, SpaArt} from './art';
import {breakfastItems, dining, treatments} from './lib/data';
import {formatGBP} from './lib/rates';
import styles from './saltmarsh.module.css';

type TabId = 'dining' | 'spa' | 'breakfast';

const tabs: {id: TabId; label: string}[] = [
  {id: 'dining', label: 'The Net Loft'},
  {id: 'spa', label: 'Tidehouse spa'},
  {id: 'breakfast', label: 'Breakfast'},
];

function Panel({id, active, art, title, intro, children}: {id: TabId; active: TabId; art: ReactNode; title: string; intro: string; children: ReactNode}) {
  return (
    <div id={`dine-panel-${id}`} role="tabpanel" aria-labelledby={`dine-tab-${id}`} hidden={active !== id} tabIndex={0} className={styles.dinePanel}>
      <div className={styles.dineArt}>{art}</div>
      <VStack gap={4} className={styles.dineCopy}>
        <Heading level={3} className={styles.dineTitle}>
          {title}
        </Heading>
        <Text as="p" color="secondary" textWrap="pretty">
          {intro}
        </Text>
        {children}
      </VStack>
    </div>
  );
}

export function DiningSpa() {
  const [active, setActive] = useState<TabId>('dining');
  return (
    <SectionShell
      id="dining"
      eyebrow="Dining and spa"
      title="Slow suppers, salt air and a seaweed bath"
      lead="A short, seasonal menu in the old net loft, a small spa in the tidehouse and a breakfast worth getting up for. Dishes, treatments and prices are samples.">
      <VStack gap={6}>
        <TabList value={active} onChange={v => setActive(v as TabId)} role="tablist" hasDivider>
          {tabs.map(t => (
            <Tab key={t.id} value={t.id} label={t.label} panelId={`dine-panel-${t.id}`} id={`dine-tab-${t.id}`} />
          ))}
        </TabList>
        <Panel
          id="dining"
          active={active}
          art={<DiningArt />}
          title="The Net Loft"
          intro="Twenty covers under the old rafters, open for supper Wednesday to Sunday in this concept. The menu follows the boats and the kitchen garden.">
          <ul className={styles.menuList} aria-label="Sample dishes">
            {dining.map(d => (
              <li key={d.name}>
                <span className={styles.menuName}>{d.name}</span>
                <span className={styles.menuNote}>{d.note}</span>
                <span className={styles.menuPrice}>{formatGBP(d.price)}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel
          id="spa"
          active={active}
          art={<SpaArt />}
          title="Tidehouse spa"
          intro="A sauna, a cold plunge and two treatment rooms in the stone tidehouse by the creek. Sessions are for hotel guests in this concept.">
          <ul className={styles.menuList} aria-label="Sample treatments">
            {treatments.map(t => (
              <li key={t.name}>
                <span className={styles.menuName}>{t.name}</span>
                <span className={styles.menuNote}>
                  {t.note} · {t.minutes} min
                </span>
                <span className={styles.menuPrice}>{formatGBP(t.price)}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel
          id="breakfast"
          active={active}
          art={<BreakfastArt />}
          title="Breakfast"
          intro="Served from 8 until 10 at long tables by the window. Add it to any stay in the rate calculator.">
          <ul className={styles.plainList}>
            {breakfastItems.map(b => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Panel>
      </VStack>
    </SectionShell>
  );
}
