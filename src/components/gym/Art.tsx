/**
 * Original SVG artwork for the Forge Fitness demo. No photographs: every
 * visual here is drawn in code so nothing depicts a real person or place.
 */
import styles from './art.module.css';

export function LogoMark({size = 32}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={styles.logo}>
      <rect width="32" height="32" className={styles.fillAccent} />
      <path d="M8 6h17l-2.5 5H13.5v3.5H21l-2.5 5h-5V26H8z" className={styles.fillInk} />
    </svg>
  );
}

export function HeroArt() {
  const rings = [250, 214, 178, 120, 64, 26];
  return (
    <svg
      viewBox="0 0 600 680"
      width="600"
      height="680"
      role="img"
      aria-label="Abstract illustration of a weight plate and barbell crossing a diagonal signal stripe"
      className={styles.heroArt}
    >
      <defs>
        <pattern id="forge-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <rect width="3" height="10" className={styles.fillAccent} />
        </pattern>
        <pattern id="forge-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" className={styles.strokeGrid} />
        </pattern>
      </defs>
      <rect width="600" height="680" fill="url(#forge-grid)" />
      <polygon points="600,40 600,300 0,640 0,380" fill="url(#forge-hatch)" opacity="0.9" />
      <g transform="translate(330 330)">
        {rings.map((r, i) => (
          <circle
            key={r}
            r={r}
            className={i === 0 ? styles.plateOuter : i === 3 ? styles.plateAccent : styles.plateRing}
          />
        ))}
        <circle r="26" className={styles.fillInk} />
        <circle r="12" className={styles.fillAccent} />
        <text y="-150" textAnchor="middle" className={styles.plateLabel}>
          20 KG
        </text>
        <text y="172" textAnchor="middle" className={styles.plateLabel}>
          FORGE · CALDER CITY
        </text>
      </g>
      <g transform="rotate(-29 300 340)">
        <rect x="-60" y="334" width="720" height="12" className={styles.fillBone} />
        <rect x="40" y="318" width="22" height="44" className={styles.fillBone} />
        <rect x="538" y="318" width="22" height="44" className={styles.fillBone} />
      </g>
      <text x="24" y="660" className={styles.figLabel}>
        FIG. 01 / THE PLATFORM
      </text>
      <text x="576" y="30" textAnchor="end" className={styles.figLabel}>
        EST. FOR THIS DEMO
      </text>
    </svg>
  );
}

type PortraitTone = 0 | 1 | 2 | 3;

/** Abstract duotone "portrait": halftone silhouette plus monogram. Not a real person. */
export function Portrait({initials, name, tone}: {initials: string; name: string; tone: PortraitTone}) {
  const id = `forge-dots-${initials}`;
  const tilt = [-6, 4, -2, 7][tone];
  return (
    <svg
      viewBox="0 0 300 360"
      width="300"
      height="360"
      role="img"
      aria-label={`Illustrated abstract portrait for ${name}`}
      preserveAspectRatio="xMidYMin slice"
      className={`${styles.portrait} ${styles[`tone${tone}`]}`}
    >
      <defs>
        <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform={`rotate(${20 + tone * 15})`}>
          <circle cx="4" cy="4" r="2.2" className={styles.fillAccent} />
        </pattern>
      </defs>
      <rect width="300" height="360" className={styles.portraitBg} />
      <text x="-8" y="250" className={styles.monogram}>
        {initials}
      </text>
      <g transform={`rotate(${tilt} 150 300)`}>
        <path d="M30 360c8-78 52-118 120-118s112 40 120 118z" fill={`url(#${id})`} />
        <ellipse cx="150" cy="160" rx="54" ry="64" fill={`url(#${id})`} />
        <path d="M30 360c8-78 52-118 120-118" fill="none" className={styles.rimLight} />
        <path d="M96 160a54 64 0 0 1 54-64" fill="none" className={styles.rimLight} />
      </g>
      <rect x="0" y="0" width="300" height="360" fill="none" className={styles.portraitFrame} />
    </svg>
  );
}

export type GalleryScene = 'platform' | 'ring' | 'sled' | 'rig' | 'loft';

export function GalleryArt({scene, label}: {scene: GalleryScene; label: string}) {
  return (
    <svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label={label} className={styles.gallery} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" className={styles.galleryBg} />
      {scene === 'platform' && <PlatformScene />}
      {scene === 'ring' && <RingScene />}
      {scene === 'sled' && <SledScene />}
      {scene === 'rig' && <RigScene />}
      {scene === 'loft' && <LoftScene />}
    </svg>
  );
}

function PlatformScene() {
  return (
    <g>
      {Array.from({length: 9}, (_, i) => (
        <rect key={i} x={60 + i * 31} y="40" width="29" height="220" className={i % 2 ? styles.fillSteel : styles.fillSteelDark} />
      ))}
      <rect x="120" y="40" width="160" height="220" className={styles.fillWood} />
      <rect x="20" y="146" width="360" height="8" className={styles.fillBone} />
      {[34, 50, 336, 352].map(x => (
        <rect key={x} x={x} y="96" width="14" height="108" className={x === 50 || x === 336 ? styles.fillAccent : styles.fillInk} />
      ))}
    </g>
  );
}

function RingScene() {
  return (
    <g>
      <polygon points="40,270 360,270 300,120 100,120" className={styles.fillSteelDark} />
      {[0, 1, 2].map(i => (
        <path
          key={i}
          d={`M${40 + i * 20} ${230 - i * 34}L${100 + i * 0} ${100 - i * 4}M${360 - i * 20} ${230 - i * 34}L300 ${100 - i * 4}M${100} ${100 - i * 4}H300`}
          className={i === 1 ? styles.ropeAccent : styles.rope}
        />
      ))}
      {[40, 360, 100, 300].map((x, i) => (
        <rect key={x} x={x - 5} y={i < 2 ? 150 : 70} width="10" height={i < 2 ? 120 : 50} className={styles.fillBone} />
      ))}
      <circle cx="200" cy="215" r="34" className={styles.ringOutline} />
    </g>
  );
}

function SledScene() {
  return (
    <g>
      <polygon points="0,300 400,300 236,60 164,60" className={styles.fillTurf} />
      {[0.25, 0.5, 0.75].map(t => {
        const y = 60 + t * 240;
        const half = 36 + t * 164;
        return <path key={t} d={`M${200 - half} ${y}H${200 + half}`} className={styles.laneLine} />;
      })}
      <path d="M200 60V300" className={styles.laneDash} />
      <text x="200" y="270" textAnchor="middle" className={styles.laneNumber}>
        25M
      </text>
      <polygon points="160,190 240,190 252,226 148,226" className={styles.fillAccent} />
      <rect x="150" y="226" width="100" height="8" className={styles.fillInk} />
    </g>
  );
}

function RigScene() {
  return (
    <g>
      {[50, 130, 270, 350].map(x => (
        <g key={x}>
          <rect x={x - 9} y="30" width="18" height="250" className={styles.fillSteel} />
          {Array.from({length: 14}, (_, i) => (
            <rect key={i} x={x - 2.5} y={46 + i * 16} width="5" height="5" className={styles.fillInk} />
          ))}
        </g>
      ))}
      <rect x="30" y="30" width="340" height="14" className={styles.fillSteel} />
      <rect x="20" y="132" width="360" height="7" className={styles.fillBone} />
      <rect x="2" y="104" width="22" height="62" className={styles.fillAccent} />
      <rect x="376" y="104" width="22" height="62" className={styles.fillAccent} />
    </g>
  );
}

function LoftScene() {
  return (
    <g>
      {Array.from({length: 7}, (_, i) => (
        <path
          key={i}
          d={`M-10 ${80 + i * 28}C90 ${50 + i * 28} 150 ${120 + i * 28} 210 ${90 + i * 28}S330 ${60 + i * 28} 410 ${100 + i * 28}`}
          className={i === 3 ? styles.waveAccent : styles.wave}
        />
      ))}
      <circle cx="310" cy="70" r="30" className={styles.ringOutline} />
    </g>
  );
}

export function MapArt() {
  return (
    <svg
      viewBox="0 0 560 400"
      width="560"
      height="400"
      role="img"
      aria-label="Stylised map: Forge Fitness sits on Sample Lane beside the Calder River, two blocks from Kiln Street station. The map and streets are fictional."
      className={styles.map}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="560" height="400" className={styles.mapBg} />
      <g className={styles.mapBlocks}>
        {Array.from({length: 6}, (_, col) =>
          Array.from({length: 5}, (_, row) => (
            <rect key={`${col}-${row}`} x={14 + col * 92} y={14 + row * 78} width="78" height="64" />
          )),
        )}
      </g>
      <rect x="198" y="92" width="170" height="142" className={styles.mapPark} />
      <path d="M-20 330C120 300 180 380 300 330S470 220 590 250" className={styles.mapRiver} />
      <path d="M0 85H560M0 241H560M189 0V400M373 0V400" className={styles.mapMajor} />
      <g transform="translate(373 163)">
        <circle r="46" className={styles.pinPulse} />
        <path d="M0 18L-16-6A20 20 0 1 1 16-6Z" className={styles.fillAccent} />
        <circle cy="-10" r="7" className={styles.fillInk} />
      </g>
      <rect x="391" y="140" width="128" height="30" className={styles.fillInk} />
      <text x="400" y="161" className={styles.mapPinLabel}>
        FORGE FITNESS
      </text>
      <g transform="translate(189 241)">
        <rect x="-11" y="-11" width="22" height="22" className={styles.fillBone} />
        <text y="5" textAnchor="middle" className={styles.mapStationText}>
          K
        </text>
      </g>
      <text transform="translate(386 24) rotate(90)" className={styles.mapLabel}>
        SAMPLE LANE
      </text>
      <text x="22" y="232" className={styles.mapLabel}>
        KILN STREET
      </text>
      <text x="230" y="168" className={styles.mapLabel}>
        ANVIL PARK
      </text>
      <text x="40" y="370" className={styles.mapLabel}>
        CALDER RIVER
      </text>
      <text x="540" y="388" textAnchor="end" className={styles.mapNote}>
        ILLUSTRATIVE MAP · NOT TO SCALE · FICTIONAL
      </text>
    </svg>
  );
}
