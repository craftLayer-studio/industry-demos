/**
 * Original botanical line art for the Fernlight concept demo: fern fronds,
 * river stones and steam. Pure SVG, computed at render time, no images.
 * All decorative (aria-hidden) unless stated.
 */
import styles from './salon.module.css';

type Pt = {x: number; y: number};

function quad(p0: Pt, c: Pt, p1: Pt, t: number): Pt {
  const u = 1 - t;
  return {x: u * u * p0.x + 2 * u * t * c.x + t * t * p1.x, y: u * u * p0.y + 2 * u * t * c.y + t * t * p1.y};
}

function quadAngle(p0: Pt, c: Pt, p1: Pt, t: number): number {
  const dx = 2 * (1 - t) * (c.x - p0.x) + 2 * t * (p1.x - c.x);
  const dy = 2 * (1 - t) * (c.y - p0.y) + 2 * t * (p1.y - c.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const r = (n: number) => Math.round(n * 10) / 10;

/** A single fern frond: a curved stem with paired leaflets that taper to the tip. */
export function Frond({
  base,
  control,
  tip,
  pairs = 14,
  length = 46,
  className,
}: {
  base: Pt;
  control: Pt;
  tip: Pt;
  pairs?: number;
  length?: number;
  className?: string;
}) {
  const leaflets: {key: string; transform: string; d: string}[] = [];
  for (let i = 0; i < pairs; i++) {
    const t = 0.08 + (i / pairs) * 0.88;
    const p = quad(base, control, tip, t);
    const angle = quadAngle(base, control, tip, t);
    const len = length * (1 - t * 0.82);
    const w = len * 0.22;
    for (const side of [-1, 1]) {
      const a = angle + side * 58;
      leaflets.push({
        key: `${i}${side}`,
        transform: `translate(${r(p.x)} ${r(p.y)}) rotate(${r(a)})`,
        d: `M0 0Q${r(len / 2)} ${r(-w)} ${r(len)} 0Q${r(len / 2)} ${r(w)} 0 0Z`,
      });
    }
  }
  return (
    <g className={className}>
      <path d={`M${base.x} ${base.y} Q${control.x} ${control.y} ${tip.x} ${tip.y}`} fill="none" />
      {leaflets.map(l => (
        <path key={l.key} transform={l.transform} d={l.d} />
      ))}
    </g>
  );
}

export function Steam({x, y, height = 90, className}: {x: number; y: number; height?: number; className?: string}) {
  const lines = [-22, 0, 22].map((dx, i) => {
    const sx = x + dx;
    const h = height - i * 12;
    return `M${sx} ${y} c -14 ${-h / 4} 14 ${-h / 4} 0 ${-h / 2} c -14 ${-h / 4} 14 ${-h / 4} 0 ${-h / 2}`;
  });
  return (
    <g className={className}>
      {lines.map((d, i) => (
        <path key={d} d={d} className={styles.steamLine} style={{animationDelay: `${i * 0.9}s`}} />
      ))}
    </g>
  );
}

export function HeroArt() {
  return (
    <svg className={styles.heroArt} viewBox="0 0 480 604" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="fl-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--fernlight-rose)" />
          <stop offset="1" stopColor="var(--fernlight-blush)" />
        </linearGradient>
        <clipPath id="fl-arch-clip">
          <path d="M40 600V250A200 200 0 0 1 440 250V600Z" />
        </clipPath>
      </defs>
      <path d="M40 600V250A200 200 0 0 1 440 250V600Z" fill="url(#fl-arch)" />
      <g clipPath="url(#fl-arch-clip)">
        <circle cx="318" cy="196" r="62" className={styles.artMoon} />
        <Frond base={{x: 120, y: 610}} control={{x: 70, y: 380}} tip={{x: 210, y: 150}} pairs={17} length={62} className={styles.artFern} />
        <Frond base={{x: 150, y: 610}} control={{x: 200, y: 470}} tip={{x: 330, y: 360}} pairs={12} length={46} className={styles.artFernSoft} />
        <Frond base={{x: 430, y: 620}} control={{x: 470, y: 470}} tip={{x: 380, y: 300}} pairs={11} length={40} className={styles.artFernSoft} />
      </g>
      <path d="M40 600V250A200 200 0 0 1 440 250V600" className={styles.artOutline} />
      <path d="M60 600V252A180 180 0 0 1 420 252V600" className={styles.artOutlineThin} />
      <path d="M12 600H468" className={styles.artOutline} />
      {/* Stacked river stones */}
      <ellipse cx="300" cy="566" rx="96" ry="26" className={styles.artStone} />
      <ellipse cx="306" cy="524" rx="70" ry="21" className={styles.artStoneLight} />
      <ellipse cx="298" cy="489" rx="48" ry="16" className={styles.artStone} />
      <ellipse cx="302" cy="461" rx="28" ry="11" className={styles.artStoneLight} />
      <Steam x={302} y={436} height={110} className={styles.artSteam} />
    </svg>
  );
}

const MOTIF_PATHS: Record<string, {base: Pt; control: Pt; tip: Pt}[]> = {
  fern: [
    {base: {x: 22, y: 182}, control: {x: 14, y: 140}, tip: {x: 30, y: 96}},
    {base: {x: 138, y: 182}, control: {x: 146, y: 140}, tip: {x: 130, y: 96}},
  ],
  leaf: [{base: {x: 22, y: 182}, control: {x: 10, y: 130}, tip: {x: 44, y: 70}}],
  stone: [{base: {x: 138, y: 182}, control: {x: 150, y: 130}, tip: {x: 120, y: 74}}],
  steam: [{base: {x: 22, y: 182}, control: {x: 12, y: 140}, tip: {x: 32, y: 100}}],
};

/** Illustrated monogram portrait in an arch frame. No photographs. */
export function MonogramPortrait({initials, motif}: {initials: string; motif: string}) {
  const fronds = MOTIF_PATHS[motif] ?? MOTIF_PATHS.fern;
  return (
    <svg className={styles.portrait} viewBox="0 0 160 180" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`fl-portrait-${initials}`}>
          <path d="M8 180V80A72 72 0 0 1 152 80V180Z" />
        </clipPath>
      </defs>
      <path d="M8 180V80A72 72 0 0 1 152 80V180Z" className={styles.portraitArch} />
      <path d="M16 180V82A64 64 0 0 1 144 82V180" className={styles.portraitLine} />
      <g clipPath={`url(#fl-portrait-${initials})`}>
        {fronds.map((f, i) => (
          <Frond key={i} {...f} pairs={8} length={18} className={styles.portraitFern} />
        ))}
      </g>
      {motif === 'stone' ? (
        <g className={styles.portraitStones}>
          <ellipse cx="36" cy="170" rx="20" ry="7" />
          <ellipse cx="38" cy="158" rx="13" ry="5" />
        </g>
      ) : null}
      {motif === 'steam' ? <Steam x={124} y={170} height={56} className={styles.portraitSteam} /> : null}
      <text x="80" y="122" textAnchor="middle" className={styles.portraitInitials}>
        {initials}
      </text>
    </svg>
  );
}

export function FernMark() {
  return (
    <svg viewBox="0 0 32 32" className={styles.brandMark} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="15" className={styles.brandMarkRing} />
      <Frond base={{x: 11, y: 28}} control={{x: 9, y: 16}} tip={{x: 22, y: 6}} pairs={7} length={9} className={styles.brandMarkFern} />
    </svg>
  );
}

/** Stylised map of the fictional neighbourhood. Not a real place. */
export function MapArt() {
  return (
    <svg
      className={styles.map}
      viewBox="0 0 480 320"
      role="img"
      aria-label="Stylised map of the fictional Linden Row, Marrowfield, with Fernlight marked beside Willow Park. Not a real location.">
      <rect width="480" height="320" className={styles.mapLand} />
      <path d="M0 250 C90 230 150 290 250 268 S420 230 480 252 V320 H0Z" className={styles.mapWater} />
      <rect x="300" y="36" width="140" height="110" rx="24" className={styles.mapPark} />
      <g className={styles.mapBlocks}>
        <rect x="24" y="30" width="110" height="70" rx="10" />
        <rect x="160" y="30" width="110" height="70" rx="10" />
        <rect x="24" y="130" width="110" height="80" rx="10" />
        <rect x="160" y="130" width="110" height="80" rx="10" />
        <rect x="300" y="176" width="140" height="44" rx="10" />
      </g>
      <g className={styles.mapRoads}>
        <path d="M0 115 H480" />
        <path d="M147 0 V250" />
        <path d="M285 0 V240" />
        <path d="M0 225 C120 215 300 238 480 160" />
      </g>
      <Frond base={{x: 324, y: 100}} control={{x: 318, y: 72}} tip={{x: 338, y: 46}} pairs={5} length={12} className={styles.mapFern} />
      <Frond base={{x: 416, y: 100}} control={{x: 424, y: 72}} tip={{x: 404, y: 46}} pairs={5} length={12} className={styles.mapFern} />
      <text x="370" y="132" textAnchor="middle" className={styles.mapLabel}>Willow Park</text>
      <text x="80" y="108" textAnchor="middle" className={styles.mapStreet}>LINDEN ROW</text>
      <text x="380" y="290" textAnchor="middle" className={styles.mapLabel}>Mill Water</text>
      <g transform="translate(216 115)">
        <circle r="26" className={styles.mapPinHalo} />
        <path d="M0 0 C-12 -14 -14 -20 -14 -26 A14 14 0 0 1 14 -26 C14 -20 12 -14 0 0Z" className={styles.mapPin} />
        <circle cy="-26" r="5" className={styles.mapPinDot} />
      </g>
      <text x="216" y="152" textAnchor="middle" className={styles.mapPinLabel}>Fernlight</text>
    </svg>
  );
}
