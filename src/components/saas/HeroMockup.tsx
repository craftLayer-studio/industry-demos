import {buildChart, generateDailySeries} from './lib/chart';
import styles from './saas.module.css';

const CHART_BOX = {width: 400, height: 150, padTop: 12, padRight: 8, padBottom: 8, padLeft: 8};
// 7-day rolling average of the last 45 sample days: a calmer line for the hero.
const daily = generateDailySeries().slice(-51);
const smoothed = daily.slice(6).map((p, i) => ({
  date: p.date,
  value: Math.round(daily.slice(i, i + 7).reduce((sum, d) => sum + d.value, 0) / 7),
}));
const geometry = buildChart(smoothed, CHART_BOX, 2);

const funnel = [
  {label: 'Visited', pct: 100},
  {label: 'Signed up', pct: 62},
  {label: 'Created project', pct: 41},
  {label: 'Invited a teammate', pct: 23},
];

// Retention heatmap: rows are weekly cohorts, columns are weeks since signup.
const cohorts = [
  [100, 58, 46, 40, 37],
  [100, 61, 49, 42],
  [100, 55, 44],
  [100, 63],
];

/**
 * Decorative product UI mockup for the hero, drawn entirely in SVG. Values
 * are fixed sample data; the accessible name says so.
 */
export function HeroMockup() {
  return (
    <figure className={styles.mockupFigure}>
      <svg
        viewBox="0 0 640 452"
        className={styles.mockup}
        role="img"
        aria-labelledby="hero-mockup-title"
        preserveAspectRatio="xMidYMid meet">
        <title id="hero-mockup-title">
          Illustration of the Pulsegrid overview dashboard with sample data: an active users line chart, an activation
          funnel and a retention grid.
        </title>
        <defs>
          <linearGradient id="hm-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--pulsegrid-violet)" />
            <stop offset="1" stopColor="var(--pulsegrid-cyan)" />
          </linearGradient>
          <linearGradient id="hm-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--pulsegrid-violet)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--pulsegrid-violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hm-bar" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--pulsegrid-violet)" />
            <stop offset="1" stopColor="var(--pulsegrid-cyan)" />
          </linearGradient>
        </defs>

        {/* Window */}
        <rect x="0.5" y="0.5" width="639" height="451" rx="18" className={styles.mkWindow} />
        <path d="M0.5 44.5h639" className={styles.mkRule} />
        <circle cx="24" cy="22" r="5" className={styles.mkDot} />
        <circle cx="42" cy="22" r="5" className={styles.mkDot} />
        <circle cx="60" cy="22" r="5" className={styles.mkDot} />
        <rect x="236" y="12" width="168" height="20" rx="10" className={styles.mkPill} />
        <text x="320" y="26" textAnchor="middle" className={styles.mkMuted}>
          Overview · last 30 days
        </text>

        {/* Sidebar */}
        <path d="M128.5 44.5v407" className={styles.mkRule} />
        <rect x="18" y="64" width="92" height="26" rx="8" className={styles.mkNavActive} />
        <text x="30" y="81" className={styles.mkNavActiveText}>
          Overview
        </text>
        {['Funnels', 'Retention', 'Live events', 'Alerts', 'Reports'].map((label, i) => (
          <text key={label} x="30" y={115 + i * 30} className={styles.mkNavText}>
            {label}
          </text>
        ))}

        {/* KPI tiles */}
        {[
          {label: 'Active users', value: '2,418', delta: '+6.2%'},
          {label: 'Activation', value: '41.2%', delta: '+1.8 pt'},
          {label: 'Week 4 retention', value: '36%', delta: '+0.9 pt'},
        ].map((kpi, i) => (
          <g key={kpi.label} transform={`translate(${146 + i * 160} 62)`}>
            <rect width="148" height="70" rx="12" className={styles.mkTile} />
            <text x="14" y="24" className={styles.mkMuted}>
              {kpi.label}
            </text>
            <text x="14" y="54" className={styles.mkValue}>
              {kpi.value}
            </text>
            <text x="134" y="54" textAnchor="end" className={styles.mkDelta}>
              {kpi.delta}
            </text>
          </g>
        ))}

        {/* Line chart */}
        <g transform="translate(146 146)">
          <rect width="468" height="168" rx="12" className={styles.mkTile} />
          <text x="14" y="24" className={styles.mkLabel}>
            Daily active users
          </text>
          <rect x="370" y="11" width="84" height="20" rx="10" className={styles.mkBadge} />
          <text x="412" y="25" textAnchor="middle" className={styles.mkBadgeText}>
            Sample data
          </text>
          <g transform="translate(30 6)">
            {[40, 80, 120].map(y => (
              <path key={y} d={`M8 ${y}h392`} className={styles.mkGrid} />
            ))}
            <path d={geometry.area} fill="url(#hm-area)" />
            <path d={geometry.line} fill="none" stroke="url(#hm-line)" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx={geometry.last.x} cy={geometry.last.y} r="4.5" className={styles.mkPoint} />
          </g>
        </g>

        {/* Funnel */}
        <g transform="translate(146 328)">
          <rect width="250" height="106" rx="12" className={styles.mkTile} />
          <text x="14" y="22" className={styles.mkLabel}>
            Activation funnel
          </text>
          {funnel.map((step, i) => (
            <g key={step.label} transform={`translate(14 ${34 + i * 17})`}>
              <rect width="160" height="10" rx="5" className={styles.mkTrack} />
              <rect width={(160 * step.pct) / 100} height="10" rx="5" fill="url(#hm-bar)" />
              <text x="222" y="9" textAnchor="end" className={styles.mkSmallValue}>
                {step.pct}%
              </text>
            </g>
          ))}
        </g>

        {/* Retention grid */}
        <g transform="translate(408 328)">
          <rect width="206" height="106" rx="12" className={styles.mkTile} />
          <text x="14" y="22" className={styles.mkLabel}>
            Weekly retention
          </text>
          {cohorts.map((row, r) =>
            row.map((v, c) => (
              <rect
                key={`${r}-${c}`}
                x={14 + c * 36}
                y={32 + r * 17}
                width="32"
                height="13"
                rx="3"
                fill="var(--pulsegrid-cyan)"
                fillOpacity={0.12 + (v / 100) * 0.75}
              />
            )),
          )}
        </g>
      </svg>
    </figure>
  );
}
