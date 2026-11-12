import a from './art.module.css';
import styles from './restaurant.module.css';

/** Stylised, fictional neighbourhood map. No third-party map services. */
export function MapArt({label}: {label: string}) {
  const blocks = [
    [40, 40, 150, 90],
    [220, 40, 120, 90],
    [370, 40, 190, 90],
    [40, 160, 150, 100],
    [370, 160, 90, 100],
    [490, 160, 70, 100],
    [220, 290, 120, 90],
    [370, 290, 190, 90],
  ];
  const trees = [
    [248, 182],
    [282, 196],
    [318, 180],
    [262, 222],
    [306, 220],
  ];
  return (
    <svg viewBox="0 0 600 420" width={600} height={420} role="img" aria-label={label} className={`${a.art} ${styles.map}`}>
      <rect width="600" height="420" className={a.cream} />
      {/* river */}
      <path d="M0 300 C 80 270, 120 330, 200 310 L200 420 L0 420 Z" className={a.oliveSoft} />
      <path d="M0 300 C 80 270, 120 330, 200 310" className={a.lineOlive} strokeWidth={2} />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx={4} className={a.linen} />
      ))}
      {/* park */}
      <rect x="220" y="160" width="120" height="100" rx={4} className={a.olive} opacity={0.8} />
      {trees.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={13} className={a.forest} />
      ))}
      {/* streets */}
      <path d="M0 145 H600 M0 275 H600 M205 0 V420 M355 0 V420" className={a.lineCream} strokeWidth={14} />
      <path d="M0 145 H600 M0 275 H600 M205 0 V420 M355 0 V420" className={a.lineLinen} strokeWidth={1.5} strokeDasharray="6 8" />
      {/* tram */}
      <path d="M475 0 V420" className={a.lineInk} strokeWidth={2} strokeDasharray="2 6" opacity={0.5} />
      <circle cx="475" cy="275" r="9" className={a.paper} />
      <circle cx="475" cy="275" r="9" className={a.lineInk} strokeWidth={2.5} />
      <text x="489" y="301" className={styles.mapLabel}>Tram</text>
      <text x="60" y="150" className={styles.mapLabel}>Alder Row</text>
      <text x="280" y="252" textAnchor="middle" className={styles.mapLabelLight}>Fernhill Park</text>
      <text x="22" y="360" className={styles.mapLabel}>River Lark</text>
      <text x="360" y="410" className={styles.mapLabel}>Mill Street</text>
      {/* pin */}
      <g transform="translate(400 145)">
        <circle r="34" className={a.terracotta} opacity={0.18} />
        <path d="M0 0 c-14 -18 -22 -28 -22 -40 a22 22 0 0 1 44 0 c0 12 -8 22 -22 40 z" className={a.terracotta} />
        <circle cy="-40" r="8" className={a.cream} />
      </g>
      <rect x="430" y="94" width="148" height="34" rx="17" className={a.forest} />
      <text x="504" y="116" textAnchor="middle" className={styles.mapPinLabel}>Juniper Kitchen</text>
    </svg>
  );
}
