'use client';

import {useMemo, useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Selector} from '@astryxdesign/core/Selector';
import {Table, proportional} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {useStudio} from './StudioProvider';
import {TYPES, typeLabel, type ProjectType} from './lib/projects';
import {
  BUDGET_BANDS,
  FEE_RATES,
  bandById,
  feeByStage,
  formatGBP,
  formatPercent,
  formatRange,
  indicativeFee,
  type BudgetBand,
} from './lib/fees';
import styles from './ostrander.module.css';

type Row = {id: string; stage: string; fee: string};

const COLUMNS = [
  {key: 'stage' as const, header: 'Stage (share)', width: proportional(3, {minWidth: 96})},
  {key: 'fee' as const, header: 'Sample fee', width: proportional(2, {minWidth: 88}), align: 'end' as const},
];

export function FeeGuide() {
  const {startBrief} = useStudio();
  const [type, setType] = useState<ProjectType>('extension');
  const [budget, setBudget] = useState<BudgetBand>('100-250k');

  const range = useMemo(() => indicativeFee(type, budget), [type, budget]);
  const rows: Row[] = useMemo(
    () =>
      feeByStage(range).map(s => ({
        id: s.stages,
        stage: `${s.stages} · ${s.label} (${formatPercent(s.share)})`,
        fee: formatRange({low: s.low, high: s.high}),
      })),
    [range],
  );
  const rate = FEE_RATES[type];

  return (
    <SectionShell
      id="fees"
      index="03"
      eyebrow="Indicative fee guide"
      title="What design fees might look like."
      lead="Pick a project type and a construction budget to see an illustrative fee range and how it could spread across the stages. Every figure here is a sample for this demo, not a quotation.">
      <div className={styles.feeGrid}>
        <div className={styles.feeControls}>
          <Selector
            label="Project type"
            options={TYPES.map(t => ({value: t.value, label: t.label}))}
            value={type}
            onChange={v => setType(v as ProjectType)}
            width="100%"
          />
          <Selector
            label="Construction budget"
            description="Build cost only, excluding fees, VAT and land."
            options={BUDGET_BANDS.map(b => ({value: b.value, label: b.label}))}
            value={budget}
            onChange={v => setBudget(v as BudgetBand)}
            width="100%"
          />
          <dl className={styles.feeFacts}>
            <div>
              <dt>Sample rate</dt>
              <dd>
                {formatPercent(rate.low)} to {formatPercent(rate.high)} of build cost
              </dd>
            </div>
            <div>
              <dt>Sample minimum</dt>
              <dd>{formatGBP(rate.minimum)}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.feeResult}>
          <div className={styles.feeResultHead}>
            <Badge label="Illustrative" variant="error" />
            <p className={styles.feeResultLabel}>
              Indicative total fee, {typeLabel(type).toLowerCase()}, {bandById(budget).label}
            </p>
          </div>
          <p className={styles.feeFigure} aria-live="polite" aria-atomic="true" data-testid="fee-total">
            {formatRange(range)}
          </p>
          <Table<Row> data={rows} columns={COLUMNS} idKey="id" density="compact" className={styles.feeTable} />
          <div className={styles.feeFooter}>
            <p className={styles.smallPrint}>
              Sample figures, rounded to the nearest £500. Real fees depend on the site, the brief and the services
              chosen, and are agreed in writing. Not a quote, an offer or industry guidance.
            </p>
            <Button
              label="Use these in a brief"
              variant="secondary"
              onClick={() => startBrief({type, budget, source: 'the fee guide'})}
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
