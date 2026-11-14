'use client';

import {useState, type ComponentType} from 'react';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {Heading} from '@astryxdesign/core/Heading';
import {Section} from './Section';
import {AlertsArt, FunnelArt, LiveEventsArt, RetentionArt} from './FeatureArt';
import {CheckIcon} from './icons';
import styles from './saas.module.css';

type Feature = {
  id: string;
  tab: string;
  title: string;
  body: string;
  bullets: string[];
  Art: ComponentType;
};

const features: Feature[] = [
  {
    id: 'funnels',
    tab: 'Funnels',
    title: 'See exactly where people drop off',
    body: 'Pick any sequence of events and Pulsegrid draws the funnel, with conversion between every step and the time it usually takes.',
    bullets: ['Build a funnel by clicking events, not writing queries', 'Split any step by plan, device or signup week', 'Open the people behind a drop-off'],
    Art: FunnelArt,
  },
  {
    id: 'retention',
    tab: 'Retention',
    title: 'Know who comes back, and why',
    body: 'Cohort curves show whether the product is getting stickier release by release, so you can tell a real improvement from a busy week.',
    bullets: ['Weekly and monthly cohorts side by side', 'Define "came back" with the event that matters to you', 'Compare cohorts before and after a launch'],
    Art: RetentionArt,
  },
  {
    id: 'live',
    tab: 'Live events',
    title: 'Watch events arrive as you ship',
    body: 'A live stream of incoming events helps you check new tracking in seconds, right after a deploy, instead of waiting for tomorrow’s numbers.',
    bullets: ['Filter the stream by event name or property', 'Spot malformed or missing properties early', 'Ids stay pseudonymous by default'],
    Art: LiveEventsArt,
  },
  {
    id: 'alerts',
    tab: 'Alerts',
    title: 'Hear about changes before customers do',
    body: 'Pulsegrid learns each metric’s usual range and flags meaningful changes, written in plain language and sent where your team already talks.',
    bullets: ['Ranges adapt to weekly rhythms', 'One readable sentence per alert, not a wall of charts', 'Mute, snooze or route alerts per metric'],
    Art: AlertsArt,
  },
];

export function FeatureTour() {
  const [active, setActive] = useState(features[0].id);
  return (
    <Section
      id="features"
      eyebrow="Feature tour"
      title="Four views that answer most product questions"
      lead="Pulsegrid keeps the surface small on purpose. Each view is built around a question a product team asks every week.">
      <div className={styles.tourShell}>
        <div className={styles.tourTabs}>
          <TabList value={active} onChange={setActive} role="tablist" hasDivider size="lg">
            {features.map(f => (
              <Tab key={f.id} value={f.id} label={f.tab} panelId={`feature-panel-${f.id}`} id={`feature-tab-${f.id}`} />
            ))}
          </TabList>
        </div>
        {features.map(f => (
          <div
            key={f.id}
            id={`feature-panel-${f.id}`}
            role="tabpanel"
            aria-labelledby={`feature-tab-${f.id}`}
            hidden={active !== f.id}
            tabIndex={0}
            className={styles.tourPanel}>
            <div className={styles.tourCopy}>
              <Heading level={3} className={styles.tourTitle}>
                {f.title}
              </Heading>
              <p className={styles.bodyText}>{f.body}</p>
              <ul className={styles.checkList}>
                {f.bullets.map(b => (
                  <li key={b}>
                    <CheckIcon className={styles.checkIcon} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.tourArt}>
              <span className={styles.sampleTag}>Sample data</span>
              <f.Art />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
