import styles from './legal.module.css';

/**
 * Original line engraving of a Georgian townhouse doorway: fanlight, fluted
 * pilasters, six-panel door and a brass plate. Decorative only.
 */
export function HeroArt() {
  const spokes = Array.from({length: 11}, (_, i) => {
    const a = Math.PI - (i * Math.PI) / 10;
    return {x: 200 + Math.cos(a) * 92, y: 150 - Math.sin(a) * 92};
  });
  return (
    <svg className={styles.heroArt} viewBox="0 0 400 520" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="mp-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className={styles.artHatch} />
        </pattern>
      </defs>
      {/* Brick reveal */}
      <rect x="40" y="30" width="320" height="440" fill="url(#mp-hatch)" className={styles.artFaint} />
      {/* Pediment */}
      <path d="M70 58 L200 16 L330 58 Z" className={styles.artLine} />
      <path d="M86 56 L200 26 L314 56" className={styles.artThin} />
      <rect x="64" y="58" width="272" height="14" className={styles.artLine} />
      {/* Pilasters */}
      {[78, 300].map(x => (
        <g key={x}>
          <rect x={x} y="72" width="22" height="384" className={styles.artLine} />
          {[0, 1, 2].map(i => (
            <line key={i} x1={x + 6 + i * 5} y1="84" x2={x + 6 + i * 5} y2="444" className={styles.artThin} />
          ))}
          <rect x={x - 4} y="72" width="30" height="10" className={styles.artLine} />
          <rect x={x - 4} y="446" width="30" height="10" className={styles.artLine} />
        </g>
      ))}
      {/* Fanlight */}
      <path d="M100 150 A100 100 0 0 1 300 150 Z" className={styles.artPanel} />
      <path d="M108 150 A92 92 0 0 1 292 150" className={styles.artLine} />
      <path d="M150 150 A50 50 0 0 1 250 150" className={styles.artLine} />
      {spokes.map((p, i) => (
        <line key={i} x1="200" y1="150" x2={p.x} y2={p.y} className={styles.artThin} />
      ))}
      <circle cx="200" cy="150" r="10" className={styles.artBrass} />
      {/* Door frame and leaf */}
      <rect x="100" y="150" width="200" height="306" className={styles.artLine} />
      <rect x="112" y="162" width="176" height="294" className={styles.artPanel} />
      {[
        [124, 176],
        [204, 176],
        [124, 266],
        [204, 266],
        [124, 366],
        [204, 366],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="72" height={y === 366 ? 76 : 78} className={styles.artLine} />
          <rect x={x + 8} y={y + 8} width="56" height={y === 366 ? 60 : 62} className={styles.artThin} />
        </g>
      ))}
      {/* Brass furniture */}
      <rect x="168" y="252" width="64" height="10" rx="1" className={styles.artBrass} />
      <circle cx="200" cy="212" r="9" className={styles.artBrassLine} />
      <path d="M192 222 Q200 236 208 222" className={styles.artBrassLine} />
      <circle cx="270" cy="330" r="5" className={styles.artBrass} />
      {/* Name plate */}
      <rect x="318" y="250" width="34" height="46" className={styles.artBrass} />
      <line x1="324" y1="264" x2="346" y2="264" className={styles.artPlateText} />
      <line x1="324" y1="272" x2="346" y2="272" className={styles.artPlateText} />
      <line x1="328" y1="280" x2="342" y2="280" className={styles.artPlateText} />
      {/* Steps */}
      <rect x="56" y="456" width="288" height="14" className={styles.artLine} />
      <rect x="40" y="470" width="320" height="14" className={styles.artLine} />
      <rect x="24" y="484" width="352" height="14" className={styles.artLine} />
      {/* Railings */}
      {Array.from({length: 4}, (_, i) => (
        <g key={i}>
          <line x1={6 + i * 8} y1="380" x2={6 + i * 8} y2="484" className={styles.artThin} />
          <line x1={370 + i * 8} y1="380" x2={370 + i * 8} y2="484" className={styles.artThin} />
        </g>
      ))}
    </svg>
  );
}
