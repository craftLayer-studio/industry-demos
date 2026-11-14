'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {SectionShell} from './SectionShell';
import {useBookingBridge} from './BookingBridge';
import {categories, servicesIn, type CategoryId} from './lib/data';
import {formatDuration, formatPrice} from './lib/format';
import styles from './salon.module.css';

export function ServiceMenu() {
  const [tab, setTab] = useState<CategoryId>('hair');
  const bridge = useBookingBridge();

  return (
    <SectionShell
      id="services"
      eyebrow="Service menu"
      title="A considered menu, not a long one"
      lead="Every service starts with a short consultation. Durations are typical; prices are illustrative samples for this concept demo.">
      <Card padding={0} className={styles.menuCard}>
        <VStack gap={0}>
          <div className={styles.menuTabs}>
            <TabList value={tab} onChange={v => setTab(v as CategoryId)} role="tablist" hasDivider layout="fill">
              {categories.map(c => (
                <Tab key={c.id} value={c.id} label={c.name} panelId={`menu-panel-${c.id}`} id={`menu-tab-${c.id}`} />
              ))}
            </TabList>
          </div>
          {categories.map(c => (
            <div
              key={c.id}
              id={`menu-panel-${c.id}`}
              role="tabpanel"
              aria-labelledby={`menu-tab-${c.id}`}
              hidden={tab !== c.id}
              tabIndex={0}
              className={styles.menuPanel}>
              <Text as="p" color="secondary" className={styles.menuSummary}>
                {c.summary}
              </Text>
              <ul className={styles.menuList}>
                {servicesIn(c.id).map(s => (
                  <li key={s.id} className={styles.menuItem}>
                    <VStack gap={1} className={styles.menuItemText}>
                      <Heading level={3} className={styles.menuItemName}>
                        {s.name}
                      </Heading>
                      <Text as="p" color="secondary">
                        {s.description}
                      </Text>
                      {s.note ? (
                        <Text as="p" type="supporting" className={styles.menuNote}>
                          {s.note}
                        </Text>
                      ) : null}
                    </VStack>
                    <dl className={styles.menuMeta}>
                      <dt>Duration</dt>
                      <dd>{formatDuration(s.duration)}</dd>
                      <dt>Sample price</dt>
                      <dd className={styles.menuPrice}>{formatPrice(s.price, s.isFrom)}</dd>
                    </dl>
                    <Button
                      label="Request"
                      variant="secondary"
                      size="sm"
                      aria-label={`Request ${s.name}`}
                      onClick={() => bridge.startWithService(s.id)}
                      className={styles.menuButton}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </VStack>
      </Card>
    </SectionShell>
  );
}
