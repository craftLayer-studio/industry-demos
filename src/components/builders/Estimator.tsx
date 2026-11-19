'use client';

import {useMemo, useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {Section} from './Section';
import {
  DEFAULT_INPUT,
  FINISHES,
  MAX_SIZE,
  MIN_SIZE,
  REGIONS,
  STOREYS,
  clampSize,
  estimate,
  formatMoney,
  type EstimateInput,
  type Finish,
  type RegionBand,
  type Storeys,
} from './lib/estimate';
import styles from './keystone.module.css';

export function Estimator() {
  const [input, setInput] = useState<EstimateInput>(DEFAULT_INPUT);
  const result = useMemo(() => estimate(input), [input]);
  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) => setInput(prev => ({...prev, [key]: value}));

  const totalText = `${formatMoney(result.total.low)} to ${formatMoney(result.total.high)}`;

  return (
    <Section
      id="estimate"
      number="02"
      kicker="Extension estimator"
      tone="concrete"
      title="Rough out an extension budget"
      lead="Adjust the size, storeys, finish and region band to see an illustrative cost range. Every rate here is a sample figure for a fictional builder, not a quote or market data.">
      <div className={styles.estimatorGrid}>
        <form className={styles.estimatorForm} onSubmit={e => e.preventDefault()} aria-label="Extension estimator inputs">
          <div className={styles.sizeRow}>
            <NumberInput
              label="Extension footprint"
              description={`Ground-floor area, ${MIN_SIZE} to ${MAX_SIZE} m²`}
              value={input.size}
              onChange={v => set('size', clampSize(v))}
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={1}
              units="m²"
              isIntegerOnly
              hasNumberSteppers
              width="100%"
            />
            <input
              type="range"
              className={styles.range}
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={1}
              value={input.size}
              onChange={e => set('size', clampSize(Number(e.target.value)))}
              aria-label="Extension footprint slider"
              aria-valuetext={`${input.size} square metres`}
            />
          </div>

          <div className={styles.fieldBlock}>
            <p className={styles.fieldLabel} aria-hidden="true">
              Storeys
            </p>
            <SegmentedControl label="Storeys" value={input.storeys} onChange={v => set('storeys', v as Storeys)} layout="fill">
              {STOREYS.map(s => (
                <SegmentedControlItem key={s.value} value={s.value} label={s.label} />
              ))}
            </SegmentedControl>
          </div>

          <RadioList label="Finish level" value={input.finish} onChange={v => set('finish', v as Finish)}>
            {FINISHES.map(f => (
              <RadioListItem key={f.value} value={f.value} label={f.label} description={f.description} />
            ))}
          </RadioList>

          <Selector
            label="Region band"
            description="Fictional sample bands that scale labour and material costs."
            options={REGIONS}
            value={input.region}
            onChange={v => v && set('region', v as RegionBand)}
            width="100%"
          />

          <Button label="Reset to defaults" onClick={() => setInput(DEFAULT_INPUT)} className={styles.btnOutline} />
        </form>

        <div className={styles.resultPanel}>
          <div className={styles.resultHead}>
            <p className={styles.resultKicker}>Illustrative range</p>
            <Badge label="Sample figures" variant="warning" />
          </div>
          <p className={styles.resultTotal}>
            <span>{formatMoney(result.total.low)}</span>
            <span className={styles.resultTo}>to</span>
            <span>{formatMoney(result.total.high)}</span>
          </p>
          <p className={styles.visuallyHidden} aria-live="polite" aria-atomic="true">
            Illustrative range {totalText} for {result.floorArea} square metres of floor area.
          </p>
          <dl className={styles.resultStats}>
            <div>
              <dt>Floor area</dt>
              <dd>{result.floorArea} m²</dd>
            </div>
            <div>
              <dt>Per m²</dt>
              <dd>
                {formatMoney(result.perSquareMetre.low)} to {formatMoney(result.perSquareMetre.high)}
              </dd>
            </div>
            <div>
              <dt>On site</dt>
              <dd>
                {result.weeks.low} to {result.weeks.high} weeks
              </dd>
            </div>
          </dl>
          <div className={styles.tableWrap}>
            <Table density="compact" dividers="rows">
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Line</TableHeaderCell>
                  <TableHeaderCell>Low</TableHeaderCell>
                  <TableHeaderCell>High</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.lines.map(l => (
                  <TableRow key={l.key}>
                    <TableCell>{l.label}</TableCell>
                    <TableCell>{formatMoney(l.low)}</TableCell>
                    <TableCell>{formatMoney(l.high)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total (sample)</TableCell>
                  <TableCell>{formatMoney(result.total.low)}</TableCell>
                  <TableCell>{formatMoney(result.total.high)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <ul className={styles.assumptions}>
            <li>Sample rates only. Real costs depend on ground conditions, access, structure and specification.</li>
            <li>Excludes kitchen units, appliances, VAT and party-wall fees.</li>
            <li>Rounded to the nearest £500. Not a quote and not a promise of price.</li>
          </ul>
          <Button label="Request a site survey" href="#survey" variant="primary" size="lg" className={styles.btnYellow} />
        </div>
      </div>
    </Section>
  );
}
