import styles from './saas.module.css';

/** Mini UI illustrations for the feature tour. All values are sample data. */

export function FunnelArt() {
  const steps = [
    {label: 'Landing', v: 100},
    {label: 'Sign up', v: 64},
    {label: 'Onboard', v: 47},
    {label: 'Invite', v: 26},
    {label: 'Upgrade', v: 11},
  ];
  return (
    <svg viewBox="0 0 360 230" className={styles.art} role="img" aria-labelledby="art-funnel-title">
      <title id="art-funnel-title">
        Sample funnel chart with five steps, from landing at 100 percent down to upgrade at 11 percent.
      </title>
      <defs>
        <linearGradient id="fa-bar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--pulsegrid-violet)" />
          <stop offset="1" stopColor="var(--pulsegrid-violet-deep)" />
        </linearGradient>
      </defs>
      {[40, 90, 140].map(y => (
        <path key={y} d={`M20 ${y}h320`} className={styles.mkGrid} />
      ))}
      {steps.map((s, i) => {
        const h = (s.v / 100) * 150;
        const x = 28 + i * 64;
        return (
          <g key={s.label}>
            <rect x={x} y={190 - h} width="44" height={h} rx="6" fill="url(#fa-bar)" opacity={1 - i * 0.08} />
            {i < steps.length - 1 ? (
              <path
                d={`M${x + 44} ${190 - h} L${x + 64} ${190 - (steps[i + 1].v / 100) * 150} L${x + 64} 190 L${x + 44} 190Z`}
                fill="var(--pulsegrid-violet)"
                opacity="0.12"
              />
            ) : null}
            <text x={x + 22} y={182 - h} textAnchor="middle" className={styles.mkSmallValue}>
              {s.v}%
            </text>
            <text x={x + 22} y="210" textAnchor="middle" className={styles.mkMuted}>
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RetentionArt() {
  const curves = [
    {d: 'M24 30 C70 110, 120 128, 336 140', o: 1},
    {d: 'M24 30 C70 120, 130 145, 336 158', o: 0.6},
    {d: 'M24 30 C60 135, 120 165, 336 178', o: 0.35},
  ];
  return (
    <svg viewBox="0 0 360 230" className={styles.art} role="img" aria-labelledby="art-ret-title">
      <title id="art-ret-title">
        Sample retention curves for three signup cohorts, each flattening out after the first few weeks.
      </title>
      {[30, 80, 130, 180].map(y => (
        <path key={y} d={`M24 ${y}h312`} className={styles.mkGrid} />
      ))}
      {curves.map((c, i) => (
        <path
          key={i}
          d={c.d}
          fill="none"
          stroke={i === 0 ? 'var(--pulsegrid-cyan)' : 'var(--pulsegrid-violet)'}
          strokeOpacity={c.o}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {['W0', 'W2', 'W4', 'W6', 'W8'].map((w, i) => (
        <text key={w} x={24 + i * 78} y="210" textAnchor="middle" className={styles.mkMuted}>
          {w}
        </text>
      ))}
      <g transform="translate(220 52)">
        <rect width="116" height="44" rx="10" className={styles.mkTileRaised} />
        <text x="12" y="18" className={styles.mkMuted}>
          Oct cohort, W4
        </text>
        <text x="12" y="36" className={styles.mkSmallValueStrong}>
          38.4%
        </text>
      </g>
    </svg>
  );
}

export function LiveEventsArt() {
  const rows = [
    {t: '14:02:11', e: 'project.created', who: 'user_8f2'},
    {t: '14:02:09', e: 'invite.sent', who: 'user_31a'},
    {t: '14:02:04', e: 'checkout.started', who: 'user_c77'},
    {t: '14:01:58', e: 'signup.completed', who: 'user_0d4'},
    {t: '14:01:51', e: 'report.shared', who: 'user_8f2'},
  ];
  return (
    <svg viewBox="0 0 360 230" className={styles.art} role="img" aria-labelledby="art-live-title">
      <title id="art-live-title">
        Sample live event stream listing five recent events with timestamps and anonymous user ids.
      </title>
      <circle cx="30" cy="22" r="5" fill="var(--pulsegrid-lime)" />
      <text x="44" y="26" className={styles.mkLabel}>
        Streaming sample events
      </text>
      {rows.map((r, i) => (
        <g key={r.t} transform={`translate(16 ${40 + i * 37})`} opacity={1 - i * 0.13}>
          <rect width="328" height="30" rx="8" className={i === 0 ? styles.mkTileRaised : styles.mkTile} />
          <text x="12" y="19" className={styles.mkMono}>
            {r.t}
          </text>
          <text x="92" y="19" className={styles.mkMonoAccent}>
            {r.e}
          </text>
          <text x="316" y="19" textAnchor="end" className={styles.mkMono}>
            {r.who}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function AlertsArt() {
  return (
    <svg viewBox="0 0 360 230" className={styles.art} role="img" aria-labelledby="art-alert-title">
      <title id="art-alert-title">
        Sample alert card: signup conversion fell well below its usual range on Tuesday, shown on a small line chart
        with the dip highlighted.
      </title>
      <rect x="16" y="90" width="328" height="20" rx="4" fill="var(--pulsegrid-cyan)" opacity="0.08" />
      <path
        d="M16 104 L56 98 L96 102 L136 96 L176 100 L206 150 L236 104 L276 98 L316 101 L344 97"
        fill="none"
        stroke="var(--pulsegrid-cyan)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="206" cy="150" r="6" fill="var(--pulsegrid-pink)" />
      <circle cx="206" cy="150" r="12" fill="none" stroke="var(--pulsegrid-pink)" strokeOpacity="0.4" />
      <g transform="translate(16 16)">
        <rect width="328" height="56" rx="12" className={styles.mkTileRaised} />
        <rect x="12" y="14" width="28" height="28" rx="8" fill="var(--pulsegrid-pink)" fillOpacity="0.18" />
        <path d="M26 21v9M26 34.5v.5" stroke="var(--pulsegrid-pink)" strokeWidth="2.4" strokeLinecap="round" />
        <text x="52" y="25" className={styles.mkLabel}>
          Signup conversion is unusually low
        </text>
        <text x="52" y="43" className={styles.mkMuted}>
          Tuesday · 18% under its 4-week range
        </text>
      </g>
      <g transform="translate(16 178)">
        <rect width="150" height="34" rx="10" className={styles.mkTile} />
        <text x="14" y="22" className={styles.mkMuted}>
          Sent to #product-alerts
        </text>
      </g>
    </svg>
  );
}
