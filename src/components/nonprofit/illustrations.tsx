/**
 * Original flat cut-paper illustrations for the Common Table concept demo.
 * Every shape is drawn here by hand; there are no stock or remote images.
 * All illustrations are decorative (aria-hidden) unless stated otherwise.
 */
import styles from './nonprofit.module.css';

const C = {
  butter: '#f9df74',
  butterDeep: '#f3cd45',
  cream: '#fff8e1',
  forest: '#1f4d2b',
  green: '#2f6b3a',
  leaf: '#6fa84f',
  tomato: '#d9512c',
  crust: '#c9803a',
  wood: '#8a5a32',
  sky: '#9fd0d6',
  ink: '#142a19',
};

/** Brand mark: a round table seen from above, with three plates and a leaf. */
export function LogoMark({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" fill={C.green} />
      <circle cx="24" cy="24" r="14" fill={C.butter} />
      <circle cx="24" cy="11.5" r="4.2" fill={C.cream} stroke={C.forest} strokeWidth="1.5" />
      <circle cx="13.2" cy="30.3" r="4.2" fill={C.cream} stroke={C.forest} strokeWidth="1.5" />
      <circle cx="34.8" cy="30.3" r="4.2" fill={C.cream} stroke={C.forest} strokeWidth="1.5" />
      <path d="M20 27c0-6 4-9 9-9-0.5 5-3.5 9-9 9z" fill={C.leaf} />
      <path d="M20 27l5-5" stroke={C.forest} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Bread({x, y}: {x: number; y: number}) {
  return (
    <g transform={`translate(${x} ${y})`} className={styles.cut}>
      <path d="M0 58c0-34 30-58 78-58s78 24 78 58c0 8-6 12-14 12H14C6 70 0 66 0 58z" fill={C.crust} />
      <path d="M10 56c2-26 28-46 68-46s66 20 68 46" fill="none" stroke="#e3a35d" strokeWidth="6" strokeLinecap="round" />
      <path d="M44 22l14 22M74 16l12 26M104 22l10 22" stroke="#8f5420" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Crate({x, y}: {x: number; y: number}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* produce peeking out of the crate */}
      <g className={styles.cut}>
        <path d="M30 34c-8-26 2-44 14-50 4 18 0 36-14 50z" fill={C.leaf} />
        <path d="M44 32c2-24 18-38 32-38-2 20-14 34-32 38z" fill={C.green} />
        <circle cx="96" cy="22" r="22" fill={C.tomato} />
        <path d="M88 2c4 4 12 4 16 0-2 6-14 6-16 0z" fill={C.green} />
        <path d="M128 40l22-62c3-6 12-4 12 3l-14 59z" fill="#ec8a2f" />
        <path d="M150 -24c-2-10 4-16 10-18 0 8-4 14-10 18zM156 -20c6-8 14-8 20-4-6 6-14 6-20 4z" fill={C.leaf} />
        <circle cx="60" cy="30" r="18" fill="#7b3f8c" />
        <circle cx="54" cy="24" r="5" fill="#9a5bab" />
      </g>
      <g className={styles.cut}>
        <rect x="0" y="30" width="186" height="76" rx="6" fill={C.wood} />
        <rect x="10" y="42" width="166" height="14" rx="3" fill="#a87545" />
        <rect x="10" y="66" width="166" height="14" rx="3" fill="#a87545" />
        <rect x="10" y="90" width="166" height="8" rx="3" fill="#a87545" />
        <rect x="74" y="50" width="38" height="20" rx="10" fill="#6b4022" />
      </g>
    </g>
  );
}

function Bowl({x, y}: {x: number; y: number}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={styles.steam} fill="none" stroke={C.cream} strokeWidth="6" strokeLinecap="round">
        <path d="M30 -10c-10-12 10-18 0-32" />
        <path d="M58 -14c-10-12 10-18 0-32" />
        <path d="M86 -10c-10-12 10-18 0-32" />
      </g>
      <g className={styles.cut}>
        <path d="M0 10h116c0 34-24 56-58 56S0 44 0 10z" fill={C.tomato} />
        <ellipse cx="58" cy="10" rx="58" ry="10" fill="#f08b5e" />
        <path d="M14 28h88" stroke={C.cream} strokeWidth="5" strokeLinecap="round" strokeDasharray="1 14" />
      </g>
    </g>
  );
}

function Hand({x, y, flip, skin, sleeve}: {x: number; y: number; flip?: boolean; skin: string; sleeve: string}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} className={styles.cut}>
      <path d="M-40 30h86l10 44h-96z" fill={sleeve} />
      <path
        d="M40 26c14-6 34-10 52-8 8 1 8 10 0 11l-26 3c10 1 24 2 34 6 7 3 4 11-3 10l-24-3c8 3 18 6 24 10 6 4 1 11-5 9l-22-7c6 3 12 7 14 11 3 6-3 9-8 6l-18-10C54 66 46 66 40 62z"
        fill={skin}
      />
    </g>
  );
}

/** Tablecloth outline with a scalloped hem, built from 18 half-circle-ish scallops. */
const CLOTH_PATH = (() => {
  const left = 30;
  const width = 540;
  const count = 18;
  const w = width / count;
  let d = `M${left} 334h${width}v44`;
  for (let i = 0; i < count; i++) d += `q${-w / 2} 22 ${-w} 0`;
  return `${d}z`;
})();

/** Hero poster: a long shared table with bread, a crate of vegetables, soup and reaching hands. */
export function HeroArt({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 600 520" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="ct-hero-card">
          <rect x="0" y="0" width="600" height="520" rx="36" />
        </clipPath>
      </defs>
      <g clipPath="url(#ct-hero-card)">
        <rect x="0" y="0" width="600" height="520" fill={C.cream} />
        <circle cx="320" cy="210" r="200" fill={C.butterDeep} />
        <g fill={C.tomato} opacity="0.85">
          <circle cx="120" cy="96" r="6" />
          <circle cx="520" cy="70" r="8" />
          <circle cx="560" cy="250" r="5" />
          <circle cx="70" cy="250" r="5" />
        </g>
        {/* table legs */}
        <g className={styles.cut}>
          <rect x="88" y="380" width="26" height="130" rx="6" fill={C.wood} />
          <rect x="486" y="380" width="26" height="130" rx="6" fill={C.wood} />
        </g>
        <Crate x={70} y={228} />
        <Bread x={300} y={262} />
        <Bowl x={446} y={274} />
        {/* tablecloth with a scalloped edge */}
        <g className={styles.cut}>
          <path d={CLOTH_PATH} fill={C.green} />
          <path d="M30 334h540v12H30z" fill={C.forest} />
          <g fill={C.butter}>
            <circle cx="80" cy="362" r="5" />
            <circle cx="160" cy="362" r="5" />
            <circle cx="240" cy="362" r="5" />
            <circle cx="320" cy="362" r="5" />
            <circle cx="400" cy="362" r="5" />
            <circle cx="480" cy="362" r="5" />
          </g>
        </g>
        <Hand x={-6} y={262} skin="#c98a5b" sleeve={C.tomato} />
        <Hand x={606} y={262} flip skin="#f0c39b" sleeve={C.sky} />
      </g>
    </svg>
  );
}

/** Pantry: open shelves with jars, tins and a bunch of carrots. */
export function PantryArt({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true" focusable="false">
      <rect x="20" y="16" width="280" height="214" rx="14" fill={C.butterDeep} />
      <g className={styles.cut}>
        <rect x="36" y="96" width="248" height="12" rx="4" fill={C.wood} />
        <rect x="36" y="184" width="248" height="12" rx="4" fill={C.wood} />
      </g>
      <g className={styles.cut}>
        <rect x="52" y="44" width="40" height="52" rx="8" fill={C.cream} />
        <rect x="52" y="38" width="40" height="12" rx="4" fill={C.tomato} />
        <rect x="58" y="62" width="28" height="22" rx="4" fill="#e7b85a" />
        <rect x="104" y="56" width="36" height="40" rx="4" fill={C.green} />
        <rect x="104" y="68" width="36" height="12" fill={C.cream} />
        <rect x="150" y="52" width="36" height="44" rx="4" fill={C.tomato} />
        <rect x="150" y="66" width="36" height="12" fill={C.butter} />
        <rect x="200" y="36" width="64" height="60" rx="6" fill={C.crust} />
        <path d="M212 50h40" stroke="#8f5420" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className={styles.cut}>
        <circle cx="70" cy="164" r="20" fill={C.tomato} />
        <circle cx="104" cy="168" r="16" fill="#ec8a2f" />
        <path d="M138 184l18-52c2-5 10-4 10 2l-12 50z" fill="#ec8a2f" />
        <path d="M160 184l22-46c3-5 10-3 9 3l-15 43z" fill="#ec8a2f" />
        <path d="M158 132c-4-10 2-18 10-20 0 8-4 16-10 20zM186 132c0-10 8-16 16-14-2 8-8 14-16 14z" fill={C.leaf} />
        <rect x="216" y="134" width="56" height="50" rx="8" fill={C.cream} />
        <rect x="222" y="148" width="44" height="10" rx="3" fill={C.green} />
      </g>
    </svg>
  );
}

/** Community kitchen: a big pot on a hob with a ladle and steam. */
export function KitchenArt({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true" focusable="false">
      <rect x="20" y="16" width="280" height="214" rx="14" fill={C.sky} />
      <g className={styles.steam} fill="none" stroke={C.cream} strokeWidth="8" strokeLinecap="round">
        <path d="M120 70c-12-14 12-22 0-38" />
        <path d="M160 64c-12-14 12-22 0-38" />
        <path d="M200 70c-12-14 12-22 0-38" />
      </g>
      <g className={styles.cut}>
        <rect x="46" y="186" width="228" height="22" rx="6" fill={C.forest} />
        <path d="M84 96h152v62c0 16-12 28-28 28h-96c-16 0-28-12-28-28z" fill={C.tomato} />
        <rect x="74" y="86" width="172" height="18" rx="9" fill="#a8361a" />
        <rect x="56" y="110" width="30" height="12" rx="6" fill="#a8361a" />
        <rect x="234" y="110" width="30" height="12" rx="6" fill="#a8361a" />
        <path d="M200 92l40-66" stroke={C.wood} strokeWidth="9" strokeLinecap="round" />
        <path d="M110 136h100" stroke={C.cream} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 18" />
      </g>
    </svg>
  );
}

/** Breakfast club: a bowl of cereal, a spoon, an apple and a carton of milk. */
export function BreakfastArt({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true" focusable="false">
      <rect x="20" y="16" width="280" height="214" rx="14" fill={C.leaf} />
      <circle cx="250" cy="62" r="26" fill={C.butter} />
      <g className={styles.cut}>
        <path d="M52 76h54v104H52z" fill={C.cream} />
        <path d="M52 76l12-26h30l12 26z" fill={C.sky} />
        <rect x="60" y="104" width="38" height="30" rx="4" fill={C.sky} />
      </g>
      <g className={styles.cut}>
        <path d="M120 130h150c0 36-30 62-75 62s-75-26-75-62z" fill={C.butter} />
        <ellipse cx="195" cy="130" rx="75" ry="14" fill={C.cream} />
        <g fill={C.crust}>
          <circle cx="160" cy="126" r="6" />
          <circle cx="182" cy="122" r="6" />
          <circle cx="204" cy="128" r="6" />
          <circle cx="226" cy="124" r="6" />
          <circle cx="172" cy="134" r="5" />
          <circle cx="214" cy="136" r="5" />
        </g>
        <path d="M240 120l40-40" stroke="#c9c2a8" strokeWidth="8" strokeLinecap="round" />
      </g>
      <g className={styles.cut}>
        <path d="M86 196c-20 0-30-14-30-28s10-24 22-24c6 0 8 2 12 2s6-2 12-2c12 0 22 10 22 24s-10 28-30 28z" fill={C.tomato} />
        <path d="M96 146c0-10 6-16 14-18" stroke={C.wood} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/** Small stylised map of fictional Larkfield, with numbered pins matching the pantry cards. */
export function MapArt({className}: {className?: string}) {
  const pins = [
    {n: 1, x: 236, y: 92},
    {n: 2, x: 120, y: 156},
    {n: 3, x: 300, y: 210},
  ];
  return (
    <svg viewBox="0 0 400 280" className={className} aria-hidden="true" focusable="false">
      <rect width="400" height="280" rx="16" fill={C.cream} />
      <path d="M0 230c60-20 90 10 150-10s90-60 150-50 80 20 100 10v100H0z" fill={C.sky} />
      <rect x="40" y="30" width="90" height="70" rx="10" fill="#dcebc9" />
      <rect x="290" y="40" width="80" height="60" rx="10" fill="#dcebc9" />
      <g stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M0 130h400" />
        <path d="M200 0v280" />
        <path d="M60 280L160 130" />
        <path d="M260 0l60 130" />
      </g>
      <g stroke={C.butterDeep} strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="2 10">
        <path d="M0 130h400" />
        <path d="M200 0v280" />
      </g>
      {pins.map(p => (
        <g key={p.n} transform={`translate(${p.x} ${p.y})`} className={styles.cut}>
          <path d="M0 0c-14-16-22-26-22-38a22 22 0 0144 0c0 12-8 22-22 38z" fill={C.green} />
          <circle cx="0" cy="-38" r="13" fill={C.butter} />
          <text x="0" y="-33" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.ink}>
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Envelope with a leaf stamp, for the newsletter band. */
export function LetterArt({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true" focusable="false">
      <g className={styles.cut}>
        <rect x="10" y="20" width="180" height="120" rx="10" fill={C.cream} />
        <path d="M10 30l90 62 90-62" fill="none" stroke={C.tomato} strokeWidth="8" strokeLinejoin="round" />
        <rect x="140" y="34" width="34" height="40" rx="4" fill={C.green} transform="rotate(8 157 54)" />
        <path d="M150 64c0-12 8-18 18-18-1 10-7 18-18 18z" fill={C.butter} transform="rotate(8 157 54)" />
      </g>
    </svg>
  );
}
