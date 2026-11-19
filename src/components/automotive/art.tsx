/**
 * Original SVG illustrations for the Torque & Co. Motors concept demo:
 * the brand mark, a technical car cutaway, a dial gauge and service glyphs.
 * All decorative art is aria-hidden; meaning is always given in text nearby.
 */
import type {ServiceId} from './lib/estimate';

type ArtProps = {className?: string};

export function TorqueMark({className}: ArtProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M20 2 35.6 11v18L20 38 4.4 29V11Z" fill="var(--tq-orange)" />
      <path d="M20 7.5 30.8 13.75v12.5L20 32.5 9.2 26.25v-12.5Z" fill="none" stroke="#140A03" strokeWidth="1.6" />
      <path d="M13 14h14v3.4h-5.2V28h-3.6V17.4H13Z" fill="#140A03" />
    </svg>
  );
}

/** Side-on technical cutaway of a generic hatchback with numbered call-outs. */
export function CutawayArt({className}: ArtProps) {
  const ink = 'var(--tq-ink)';
  const steel = 'var(--tq-steel)';
  const orange = 'var(--tq-orange)';
  const cyan = 'var(--tq-cyan)';
  const callout = {fontFamily: 'var(--font-family-code)', fontSize: 11, letterSpacing: '0.08em', fill: ink} as const;
  return (
    <svg viewBox="0 0 640 420" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="tq-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--tq-line)" strokeWidth="0.6" />
        </pattern>
        <linearGradient id="tq-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--tq-graphite-3)" />
          <stop offset="1" stopColor="var(--tq-graphite-2)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="640" height="420" fill="url(#tq-grid)" opacity="0.55" />

      {/* dimension line */}
      <g stroke={steel} strokeWidth="1" fill="none">
        <path d="M40 372v14M604 372v14M40 379h564" />
      </g>
      <text x="322" y="398" textAnchor="middle" style={{...callout, fill: steel}}>
        SAMPLE PROFILE · NOT TO SCALE
      </text>

      {/* ground */}
      <path d="M16 344H624" stroke={steel} strokeWidth="1.5" />

      {/* body shell */}
      <path
        d="M40 296V256Q44 230 74 224L180 206Q224 160 272 152L398 150Q448 152 488 198L566 212Q602 220 604 252V296H560A60 60 0 0 0 440 296H210A60 60 0 0 0 90 296Z"
        fill="url(#tq-body)"
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* glasshouse */}
      <path d="M198 208Q232 168 274 162L334 161V208Z" fill="var(--tq-graphite)" stroke={ink} strokeWidth="1.5" />
      <path d="M346 161L396 161Q436 164 470 206L346 208Z" fill="var(--tq-graphite)" stroke={ink} strokeWidth="1.5" />
      {/* door shut lines */}
      <path d="M340 160V292M206 214 214 292" stroke={steel} strokeWidth="1.2" fill="none" />

      {/* engine bay cutaway */}
      <path d="M488 214H586Q596 216 596 228V276H488Z" fill="var(--tq-graphite)" stroke={orange} strokeWidth="1.5" strokeDasharray="5 4" />
      <rect x="500" y="226" width="54" height="34" rx="3" fill="none" stroke={orange} strokeWidth="2" />
      <path d="M508 226v-8M520 226v-8M532 226v-8M544 226v-8" stroke={orange} strokeWidth="2" />
      <circle cx="574" cy="246" r="9" fill="none" stroke={orange} strokeWidth="2" />
      <path d="M574 237v18M565 246h18" stroke={orange} strokeWidth="1.2" />

      {/* battery / floor pack cutaway */}
      <g stroke={cyan} strokeWidth="1.4" fill="none">
        <rect x="222" y="272" width="206" height="18" rx="2" strokeDasharray="4 3" />
        {Array.from({length: 9}, (_, i) => (
          <path key={i} d={`M${244 + i * 20} 274v14`} />
        ))}
      </g>

      {/* aircon condenser */}
      <path d="M598 232v40" stroke={cyan} strokeWidth="3" strokeLinecap="round" />

      {/* wheels with brake discs */}
      {[150, 500].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="300" r="44" fill="#0B0C0E" stroke={ink} strokeWidth="2" />
          <circle cx={cx} cy="300" r="29" fill="none" stroke={steel} strokeWidth="2" />
          <circle cx={cx} cy="300" r="22" fill="none" stroke={orange} strokeWidth="3" strokeDasharray="3 3" />
          <path d={`M${cx - 18} 282 A26 26 0 0 1 ${cx + 6} 275`} stroke={orange} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx={cx} cy="300" r="6" fill={steel} />
        </g>
      ))}

      {/* call-outs */}
      <g stroke={orange} strokeWidth="1.2" fill="none">
        <path d="M527 226V76H498" />
        <path d="M500 268 470 120H440" />
        <path d="M598 236 616 170" />
        <path d="M325 290V330H372" />
      </g>
      <g fill={orange}>
        <circle cx="527" cy="226" r="3.5" />
        <circle cx="500" cy="268" r="3.5" />
        <circle cx="598" cy="236" r="3.5" />
        <circle cx="325" cy="290" r="3.5" />
      </g>
      <text x="492" y="80" textAnchor="end" style={callout}>
        01 OIL + FILTERS
      </text>
      <text x="434" y="116" textAnchor="end" style={callout}>
        02 BRAKES
      </text>
      <text x="628" y="160" textAnchor="end" style={callout}>
        03 A/C
      </text>
      <text x="378" y="334" style={{...callout, fill: ink}}>
        04 HV PACK
      </text>
    </svg>
  );
}

/** Semicircular dial. `value` is 0 to 1. */
export function Gauge({value, className}: ArtProps & {value: number}) {
  const v = Math.min(1, Math.max(0, value));
  const cx = 120;
  const cy = 120;
  const r = 96;
  const angle = Math.PI + v * Math.PI;
  const nx = cx + Math.cos(angle) * (r - 18);
  const ny = cy + Math.sin(angle) * (r - 18);
  const arcEndX = cx + Math.cos(angle) * r;
  const arcEndY = cy + Math.sin(angle) * r;
  const ticks = Array.from({length: 11}, (_, i) => {
    const a = Math.PI + (i / 10) * Math.PI;
    const inner = i % 5 === 0 ? r - 16 : r - 9;
    return {
      x1: cx + Math.cos(a) * inner,
      y1: cy + Math.sin(a) * inner,
      x2: cx + Math.cos(a) * (r - 2),
      y2: cy + Math.sin(a) * (r - 2),
      major: i % 5 === 0,
    };
  });
  return (
    <svg viewBox="0 0 240 132" className={className} aria-hidden="true" focusable="false">
      <path d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--tq-line)" strokeWidth="8" strokeLinecap="round" />
      {v > 0 ? (
        <path
          d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${arcEndX.toFixed(2)} ${arcEndY.toFixed(2)}`}
          fill="none"
          stroke="var(--tq-orange)"
          strokeWidth="8"
          strokeLinecap="round"
          className="tq-gauge-arc"
        />
      ) : null}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1.toFixed(2)}
          y1={t.y1.toFixed(2)}
          x2={t.x2.toFixed(2)}
          y2={t.y2.toFixed(2)}
          stroke={t.major ? 'var(--tq-ink)' : 'var(--tq-steel)'}
          strokeWidth={t.major ? 2 : 1}
        />
      ))}
      <line x1={cx} y1={cy} x2={nx.toFixed(2)} y2={ny.toFixed(2)} stroke="var(--tq-orange)" strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="8" fill="var(--tq-graphite-3)" stroke="var(--tq-orange)" strokeWidth="2" />
    </svg>
  );
}

/** Line glyph per service, drawn on a 48 unit grid. */
export function ServiceGlyph({kind, className}: ArtProps & {kind: ServiceId}) {
  const s = {fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
  let body: React.ReactNode;
  switch (kind) {
    case 'interim':
      body = (
        <>
          <path d="M24 6C24 6 13 19 13 27a11 11 0 0 0 22 0C35 19 24 6 24 6Z" {...s} />
          <path d="M19 28a5 5 0 0 0 5 5" {...s} />
        </>
      );
      break;
    case 'full':
      body = (
        <>
          <circle cx="24" cy="24" r="7" {...s} />
          <path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.6 10.6l4.2 4.2M33.2 33.2l4.2 4.2M10.6 37.4l4.2-4.2M33.2 14.8l4.2-4.2" {...s} />
        </>
      );
      break;
    case 'major':
      body = (
        <>
          <path d="M30 8a9 9 0 0 0-11 11L7 31a4 4 0 0 0 6 6l12-12a9 9 0 0 0 11-11l-5 5-5-1-1-5Z" {...s} />
        </>
      );
      break;
    case 'mot':
      body = (
        <>
          <rect x="10" y="8" width="28" height="34" rx="2" {...s} />
          <path d="M18 8V5h12v3M16 22l5 5 10-10M16 35h16" {...s} />
        </>
      );
      break;
    case 'brakes':
      body = (
        <>
          <circle cx="24" cy="24" r="17" {...s} />
          <circle cx="24" cy="24" r="5" {...s} />
          <path d="M11 13a17 17 0 0 1 14-6" {...s} strokeWidth={5} />
        </>
      );
      break;
    case 'aircon':
      body = (
        <>
          <path d="M24 6v36M8.4 15l31.2 18M8.4 33l31.2-18" {...s} />
          <path d="M19 9l5 4 5-4M19 39l5-4 5 4" {...s} />
        </>
      );
      break;
    case 'ev':
      body = (
        <>
          <rect x="7" y="13" width="30" height="22" rx="3" {...s} />
          <path d="M37 20h4v8h-4M23 16l-5 9h7l-4 8" {...s} />
        </>
      );
      break;
  }
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}
