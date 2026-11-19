'use client';

import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {DESIGN_STAGES} from './lib/stages';
import styles from './ostrander.module.css';

export function Stages() {
  const [value, setValue] = useState('0');
  const stage = DESIGN_STAGES[Number(value)];
  const panelId = 'stage-panel';

  return (
    <SectionShell
      id="stages"
      index="02"
      eyebrow="Design stages"
      tone="sheet"
      title="Eight stages, from first question to a building in use."
      lead="Most UK projects move through a common sequence numbered 0 to 7. These are our own plain-English summaries of each stage, simplified for this demo.">
      <div className={styles.stageRail} aria-hidden="true">
        {DESIGN_STAGES.map(s => (
          <span key={s.n} className={s.n <= stage.n ? styles.stageRailOn : undefined} />
        ))}
      </div>
      <TabList value={value} onChange={setValue} role="tablist" hasDivider className={styles.stageTabs}>
        {DESIGN_STAGES.map(s => (
          <Tab key={s.n} value={String(s.n)} label={`${s.n} ${s.short}`} panelId={panelId} />
        ))}
      </TabList>
      <div id={panelId} role="tabpanel" aria-label={`Stage ${stage.n}: ${stage.title}`} className={styles.stagePanel} tabIndex={0}>
        <p className={styles.stageNumeral} aria-hidden="true">
          {stage.n}
        </p>
        <div className={styles.stageMain}>
          <Heading level={3} className={styles.stageTitle}>
            Stage {stage.n}: {stage.title}
          </Heading>
          <Text as="p" type="large" textWrap="pretty" className={styles.stageSummary}>
            {stage.summary}
          </Text>
        </div>
        <div className={styles.stageLists}>
          <div>
            <p className={styles.listLabel}>Typical outputs</p>
            <ul className={styles.dashList}>
              {stage.outputs.map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.listLabel}>Your decisions</p>
            <ul className={styles.dashList}>
              {stage.decisions.map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
