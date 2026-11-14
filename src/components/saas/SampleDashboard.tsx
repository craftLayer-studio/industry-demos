'use client';

import {useState, type PointerEvent} from 'react';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Collapsible} from '@astryxdesign/core/Collapsible';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Section} from './Section';
import {RANGES, buildChart, formatCount, seriesFor, shortDate, weeklyBuckets, type RangeId} from './lib/chart';
import styles from './saas.module.css';

const BOX = {width: 1000, height: 320, padTop: 10, padRight: 0, padBottom: 0, padLeft: 0};

export function SampleDashboard() {
  const [range, setRange] = useState<RangeId>('30d');
  const [hover, setHover] = useState<number | null>(null);
  const data = seriesFor(range);
  const geo = buildChart(data.current, BOX, range === '7d' ? 7 : 5);
  const rangeLabel = RANGES.find(r => r.id === range)?.label ?? '';
  const up = data.changePct >= 0;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHover(Math.round(ratio * (data.current.length - 1)));
  };

  const hovered = hover !== null ? data.current[hover] : null;
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const pointY = (v: number) => BOX.padTop + (1 - (v - geo.min) / (geo.max - geo.min)) * (BOX.height - BOX.padTop);

  const stats = [
    {label: 'Total active-user days', value: formatCount(data.total)},
    {label: 'Daily average', value: formatCount(data.average)},
    {label: 'Busiest day', value: `${formatCount(data.peak.value)}`, note: shortDate(data.peak.date)},
    {
      label: 'Versus previous period',
      value: `${up ? '+' : ''}${data.changePct.toFixed(1)}%`,
      tone: up ? 'up' : 'down',
    },
  ];

  const weekly = range === '90d' ? weeklyBuckets(data.current) : null;

  return (
    <Section
      id="dashboard"
      eyebrow="Try it"
      title="A dashboard you can poke at"
      lead="This widget runs on generated sample data, the same kind of view Pulsegrid would build from your events. Switch the range to redraw it.">
      <div className={styles.dashCard}>
        <div className={styles.dashHead}>
          <div className={styles.dashTitleBlock}>
            <Heading level={3} className={styles.dashTitle}>
              Daily active users
            </Heading>
            <span className={styles.sampleTag}>Sample data</span>
          </div>
          <SegmentedControl label="Date range" value={range} onChange={v => setRange(v as RangeId)}>
            {RANGES.map(r => (
              <SegmentedControlItem key={r.id} value={r.id} label={r.id} />
            ))}
          </SegmentedControl>
        </div>

        <p className={styles.visuallyHidden} role="status" aria-live="polite">
          Showing sample data for the last {rangeLabel}. Daily average {formatCount(data.average)}, {up ? 'up' : 'down'}{' '}
          {Math.abs(data.changePct).toFixed(1)} percent on the previous period.
        </p>

        <dl className={styles.statRow}>
          {stats.map(s => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statLabel}>{s.label}</dt>
              <dd className={`${styles.statValue} ${s.tone === 'up' ? styles.up : s.tone === 'down' ? styles.down : ''}`}>
                {s.value}
                {s.note ? <span className={styles.statNote}> on {s.note}</span> : null}
              </dd>
            </div>
          ))}
        </dl>

        <figure className={styles.chartFigure}>
          <figcaption className={styles.visuallyHidden}>
            Line chart of sample daily active users over the last {rangeLabel}, from {shortDate(data.current[0].date)} to{' '}
            {shortDate(data.current[data.current.length - 1].date)}. Values range from about {formatCount(geo.min)} to{' '}
            {formatCount(geo.max)}. The same data is available in the table below.
          </figcaption>
          <div className={styles.chartFrame}>
            <div className={styles.yAxis} aria-hidden="true">
              {geo.yTicks.map(t => (
                <span key={t.value} style={{top: pct(t.y, BOX.height)}}>
                  {formatCount(t.value)}
                </span>
              ))}
            </div>
            <div
              className={styles.plot}
              onPointerMove={onMove}
              onPointerLeave={() => setHover(null)}
              aria-hidden="true">
              <svg viewBox={`0 0 ${BOX.width} ${BOX.height}`} preserveAspectRatio="none" className={styles.plotSvg}>
                <defs>
                  <linearGradient id="dash-line" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="var(--pulsegrid-violet)" />
                    <stop offset="1" stopColor="var(--pulsegrid-cyan)" />
                  </linearGradient>
                  <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--pulsegrid-violet)" stopOpacity="0.32" />
                    <stop offset="1" stopColor="var(--pulsegrid-violet)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {geo.yTicks.map(t => (
                  <path key={t.value} d={`M0 ${t.y}H${BOX.width}`} className={styles.chartGrid} vectorEffect="non-scaling-stroke" />
                ))}
                <path d={geo.area} fill="url(#dash-area)" className={styles.chartArea} />
                <path
                  d={geo.line}
                  fill="none"
                  stroke="url(#dash-line)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className={styles.chartLine}
                  key={range}
                />
              </svg>
              {hovered && hover !== null ? (
                <>
                  <span className={styles.crosshair} style={{left: pct(hover, data.current.length - 1)}} />
                  <span
                    className={styles.chartDot}
                    style={{left: pct(hover, data.current.length - 1), top: pct(pointY(hovered.value), BOX.height)}}
                  />
                  <span
                    className={`${styles.chartTip} ${hover > data.current.length / 2 ? styles.chartTipLeft : ''}`}
                    style={{left: pct(hover, data.current.length - 1)}}>
                    <strong>{formatCount(hovered.value)}</strong> {shortDate(hovered.date)}
                  </span>
                </>
              ) : (
                <span
                  className={`${styles.chartDot} ${styles.chartDotPulse}`}
                  style={{left: '100%', top: pct(geo.last.y, BOX.height)}}
                />
              )}
            </div>
            <div className={styles.xAxis} aria-hidden="true">
              {geo.xLabels.map((l, i) => (
                <span key={`${l.label}-${i}`} style={{left: pct(l.x, BOX.width)}}>
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </figure>

        <Collapsible
          defaultIsOpen={false}
          trigger={
            <Text weight="semibold">
              {weekly ? 'View the data as a table (weekly totals)' : 'View the data as a table'}
            </Text>
          }>
          <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={`Sample data table, last ${rangeLabel}`}>
            <Table density="compact" isStriped>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>{weekly ? 'Week' : 'Date'}</TableHeaderCell>
                  <TableHeaderCell>{weekly ? 'Active-user days (sample)' : 'Daily active users (sample)'}</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekly
                  ? weekly.map(w => (
                      <TableRow key={w.start}>
                        <TableCell>
                          {shortDate(w.start)} to {shortDate(w.end)}
                        </TableCell>
                        <TableCell>{formatCount(w.total)}</TableCell>
                      </TableRow>
                    ))
                  : data.current.map(p => (
                      <TableRow key={p.date}>
                        <TableCell>{shortDate(p.date)}</TableCell>
                        <TableCell>{formatCount(p.value)}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </Collapsible>
      </div>
    </Section>
  );
}
