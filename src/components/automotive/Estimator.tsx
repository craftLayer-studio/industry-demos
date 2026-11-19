'use client';

import {useMemo} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {Gauge} from './art';
import {Section} from './Section';
import {
  ENGINE_BANDS,
  FUELS,
  SERVICES,
  VEHICLE_CLASSES,
  engineApplies,
  estimate,
  formatMoney,
  formatRange,
  type EngineBand,
  type EstimateInput,
  type Fuel,
  type ServiceId,
  type VehicleClass,
} from './lib/estimate';
import type {LoadedVehicle} from './Workshop';
import styles from './torque.module.css';

/** Top of the gauge scale, in pounds (sample). */
const GAUGE_MAX = 700;

const SHORT_ENGINE: Record<EngineBand, string> = {small: '≤ 1.4', medium: '1.4–2.0', large: '2.0+'};
const SHORT_CLASS: Record<VehicleClass, string> = {city: 'City', family: 'Family', suv: 'SUV', van: 'Van'};

type Props = {
  input: EstimateInput;
  onChange: (next: EstimateInput) => void;
  loaded: LoadedVehicle | null;
  onReset: () => void;
  onBook: () => void;
};

export function Estimator({input, onChange, loaded, onReset, onBook}: Props) {
  const result = useMemo(() => estimate(input), [input]);
  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) => onChange({...input, [key]: value});
  const vehicleLabel = VEHICLE_CLASSES.find(v => v.value === input.vehicle);
  const service = SERVICES.find(s => s.value === input.service);

  return (
    <Section
      id="estimate"
      code="EST-02"
      kicker="Price estimator"
      tone="grid"
      title="Read the price off the dial first"
      lead="Choose a service, vehicle class, engine and fuel to see an illustrative price range. Every rate here is an invented sample figure for a fictional garage, not a quote.">
      <div className={styles.estimatorGrid}>
        <form className={styles.panel} onSubmit={e => e.preventDefault()} aria-label="Estimator inputs">
          {loaded ? (
            <p className={styles.loadedNote}>
              <Badge variant="orange" label={`Sample from ${loaded.plate}`} /> {loaded.sample.label}. Change anything below.
            </p>
          ) : null}
          <Selector
            label="Service"
            options={SERVICES.map(s => ({value: s.value, label: s.label}))}
            value={input.service}
            onChange={v => set('service', v as ServiceId)}
            width="100%"
          />
          <div className={styles.controlBlock}>
            <p className={styles.controlLabel}>
              Vehicle class
            </p>
            <SegmentedControl label="Vehicle class" value={input.vehicle} onChange={v => set('vehicle', v as VehicleClass)} layout="fill">
              {VEHICLE_CLASSES.map(v => (
                <SegmentedControlItem key={v.value} value={v.value} label={SHORT_CLASS[v.value]} />
              ))}
            </SegmentedControl>
            <p className={styles.finePrint}>{vehicleLabel?.example}</p>
          </div>
          <RadioList label="Fuel" orientation="horizontal" containerClassName={styles.fuelField} value={input.fuel} onChange={v => set('fuel', v as Fuel)}>
            {FUELS.map(f => (
              <RadioListItem key={f.value} value={f.value} label={f.label} />
            ))}
          </RadioList>
          <div className={styles.controlBlock}>
            <p className={styles.controlLabel}>Engine size (litres)</p>
            <SegmentedControl
              label="Engine size in litres"
              value={input.engine}
              onChange={v => set('engine', v as EngineBand)}
              layout="fill"
              isDisabled={!engineApplies(input.fuel)}
              disabledMessage="Engine size does not apply to electric cars.">
              {ENGINE_BANDS.map(b => (
                <SegmentedControlItem key={b.value} value={b.value} label={SHORT_ENGINE[b.value]} />
              ))}
            </SegmentedControl>
            {!engineApplies(input.fuel) ? <p className={styles.finePrint}>Not used for electric cars.</p> : null}
          </div>
          <div className={styles.inlineActions}>
            <Button label="Reset estimator" onClick={onReset} variant="ghost" />
          </div>
        </form>

        <section className={styles.dash} aria-labelledby="dash-title">
          <div className={styles.dashHead}>
            <h3 id="dash-title" className={styles.dashTitle}>
              {service?.label}
            </h3>
            <Badge variant="warning" label="Illustrative" />
          </div>
          <div className={styles.gaugeWrap}>
            <Gauge value={result.ok ? result.high / GAUGE_MAX : 0} className={styles.gauge} />
            <p className={styles.gaugeScale} aria-hidden="true">
              <span>£0</span>
              <span>£{GAUGE_MAX}+</span>
            </p>
          </div>
          <p className={styles.dashTotal} aria-live="polite" aria-atomic="true">
            <span className={styles.dashTotalLabel}>Sample price range</span>
            <span className={styles.dashTotalValue}>{formatRange(result)}</span>
          </p>
          {result.ok ? (
            <>
              <Table density="compact" dividers="rows" className={styles.breakdown}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Line (sample)</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.items.map(i => (
                    <TableRow key={i.key}>
                      <TableCell>{i.label}</TableCell>
                      <TableCell>
                        <span className={styles.mono}>{formatMoney(i.amount)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Midpoint before range</TableCell>
                    <TableCell>
                      <span className={styles.mono}>{formatMoney(result.items.reduce((a, i) => a + i.amount, 0))}</span>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              {result.notes.length ? (
                <ul className={styles.notes}>
                  {result.notes.map(n => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <p className={styles.warnText}>{result.reason}</p>
          )}
          <p className={styles.finePrint}>
            Sample figures only, including VAT in this concept. Not a quote and not market data. A real garage would
            confirm the price for your exact vehicle before starting.
          </p>
          <div className={styles.inlineActions}>
            <Button label="Request this booking" variant="primary" onClick={onBook} isDisabled={!result.ok} />
          </div>
        </section>
      </div>
    </Section>
  );
}
