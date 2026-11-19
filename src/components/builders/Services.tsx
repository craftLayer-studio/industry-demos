'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {ServiceArt, type ArtKind} from './art';
import {Section} from './Section';
import styles from './keystone.module.css';

type Service = {
  value: string;
  label: string;
  art: ArtKind;
  title: string;
  summary: string;
  involves: string[];
  spec: [string, string][];
  note: string;
};

const SERVICES: Service[] = [
  {
    value: 'extensions',
    label: 'Extensions',
    art: 'extension',
    title: 'Rear, side and wrap-around extensions',
    summary:
      'More ground-floor space without moving house. We would handle the drawings, the structural design and the approvals, then build it with the same crew from footings to final coat of paint.',
    involves: [
      'Measured survey and planning drawings',
      'Structural calculations and building control',
      'Foundations, steelwork, shell and roof',
      'Glazing, first and second fix, plastering and decoration',
    ],
    spec: [
      ['Typical footprint', '12 to 40 m² (sample)'],
      ['On site', '10 to 20 weeks (illustrative)'],
      ['Living at home?', 'Usually yes, with a sealed-off work zone'],
    ],
    note: 'Try the estimator below for an illustrative cost range.',
  },
  {
    value: 'lofts',
    label: 'Loft conversions',
    art: 'dormer',
    title: 'Dormer, hip-to-gable and roof-light lofts',
    summary:
      'Turn the void under the roof into a bedroom, an office or a shower room. Most of the work happens from scaffold, so the house below stays liveable for longer.',
    involves: [
      'Head-height and structure check on the survey',
      'Dormer or roof-light design and approvals',
      'New floor joists, insulation and fire-safe escape route',
      'Stair, en suite, electrics and finishes',
    ],
    spec: [
      ['Minimum head height', 'About 2.2 m at the ridge (rule of thumb)'],
      ['On site', '6 to 12 weeks (illustrative)'],
      ['Scaffold', 'Needed for most dormers'],
    ],
    note: 'Party-wall agreements may apply to terraced and semi-detached homes.',
  },
  {
    value: 'kitchens',
    label: 'Kitchens',
    art: 'kitchen',
    title: 'Knock-throughs and kitchen rebuilds',
    summary:
      'From swapping units to taking out a load-bearing wall and starting again. We would coordinate the steel, the trades and the fitters so the kitchen is out of action for as few weeks as possible.',
    involves: [
      'Layout planning around plumbing, gas and extraction',
      'Wall removal with steel beams where needed',
      'New electrics, lighting and underfloor heating options',
      'Units, worktops, tiling and appliance fitting',
    ],
    spec: [
      ['Typical room', '12 to 30 m² (sample)'],
      ['On site', '4 to 8 weeks (illustrative)'],
      ['Temporary kitchen', 'Set up in another room on request'],
    ],
    note: 'We would never fit a kitchen we did not plan with you first.',
  },
  {
    value: 'renovations',
    label: 'Renovations',
    art: 'renovation',
    title: 'Whole-house and period renovations',
    summary:
      'Rewiring, replumbing, new heating, replastering and layout changes, sequenced so the messy work happens once. Suited to tired period homes and recent purchases.',
    involves: [
      'Condition survey and a phased schedule of works',
      'Strip-out, damp and structural repairs',
      'Rewire, replumb and heating upgrade',
      'Plastering, joinery, flooring and decoration',
    ],
    spec: [
      ['Scope', 'Single floor to whole house'],
      ['On site', '8 to 26 weeks (illustrative)'],
      ['Living at home?', 'Depends on the phase; we would plan it with you'],
    ],
    note: 'Older homes can hide surprises, so we would always price a contingency.',
  },
];

export function Services() {
  const [active, setActive] = useState(SERVICES[0].value);
  return (
    <Section
      id="services"
      number="01"
      kicker="Services"
      title="Four trades under one site lead"
      lead="Pick a service to see what a typical job involves. Durations and sizes are illustrative examples, not commitments.">
      <div className={styles.tabsWrap}>
        <TabList value={active} onChange={setActive} role="tablist" hasDivider size="lg">
          {SERVICES.map(s => (
            <Tab key={s.value} value={s.value} label={s.label} panelId={`service-panel-${s.value}`} id={`service-tab-${s.value}`} />
          ))}
        </TabList>
      </div>
      {SERVICES.map(s => (
        <div
          key={s.value}
          id={`service-panel-${s.value}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${s.value}`}
          hidden={s.value !== active}
          tabIndex={0}
          className={styles.servicePanel}>
          <div className={styles.serviceArtFrame}>
            <ServiceArt kind={s.art} id={`svc-${s.value}`} className={styles.serviceArt} />
          </div>
          <div className={styles.serviceBody}>
            <Heading level={3} className={styles.serviceTitle}>
              {s.title}
            </Heading>
            <p className={styles.bodyText}>{s.summary}</p>
            <h4 className={styles.miniHeading}>Typically involves</h4>
            <ol className={styles.involves}>
              {s.involves.map(i => (
                <li key={i}>{i}</li>
              ))}
            </ol>
            <dl className={styles.specList}>
              {s.spec.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.finePrint}>{s.note}</p>
            <div className={styles.inlineActions}>
              <Button label={`Request a survey for ${s.label.toLowerCase()}`} href="#survey" variant="primary" className={styles.btnSlab} />
              {s.value === 'extensions' ? (
                <Button label="Open the estimator" href="#estimate" className={styles.btnOutline} />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}
