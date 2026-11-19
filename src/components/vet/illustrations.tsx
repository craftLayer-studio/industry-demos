// Original, hand-drawn-style SVG animals for the Meadowlark Vets demo.
// Each animal is drawn inside a 120 x 120 box so it can be placed in a larger
// scene with a transform, or rendered alone with <PetPortrait>.
import type {CSSProperties} from 'react';
import type {PetType} from './lib/data';
import styles from './vet.module.css';

const c = (token: string): CSSProperties => ({fill: `var(--meadowlark-${token})`});
const ink: CSSProperties = {fill: 'var(--meadowlark-ink)'};
const inkStroke: CSSProperties = {
  fill: 'none',
  stroke: 'var(--meadowlark-ink)',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function DogShape() {
  return (
    <g>
      {/* tail */}
      <g className={styles.wag}>
        <path d="M92 78c10-6 14-18 12-28" style={{...inkStroke, stroke: 'var(--meadowlark-fur-tan)', strokeWidth: 9}} />
      </g>
      {/* body */}
      <ellipse cx="62" cy="88" rx="32" ry="24" style={c('fur-tan')} />
      <ellipse cx="58" cy="94" rx="16" ry="14" style={c('fur-cream')} />
      {/* paws */}
      <ellipse cx="46" cy="110" rx="9" ry="6" style={c('fur-cream')} />
      <ellipse cx="72" cy="110" rx="9" ry="6" style={c('fur-cream')} />
      {/* head */}
      <circle cx="54" cy="50" r="26" style={c('fur-tan')} />
      {/* ears */}
      <g className={styles.earFlop}>
        <path d="M30 34c-10 4-12 22-6 32 6-2 10-12 10-22z" style={c('fur-dark')} />
      </g>
      <path d="M76 32c10 4 12 22 6 32-6-2-10-12-10-22z" style={c('fur-dark')} />
      {/* muzzle */}
      <ellipse cx="54" cy="60" rx="14" ry="10" style={c('fur-cream')} />
      <ellipse cx="54" cy="55" rx="5" ry="3.6" style={ink} />
      <path d="M54 59v4m-6 1c3 3 9 3 12 0" style={inkStroke} />
      {/* eyes */}
      <g className={styles.blink}>
        <circle cx="44" cy="44" r="3.4" style={ink} />
        <circle cx="64" cy="44" r="3.4" style={ink} />
      </g>
      {/* collar */}
      <path d="M36 72c12 6 26 6 38 0" style={{...inkStroke, stroke: 'var(--meadowlark-clover)', strokeWidth: 6}} />
      <circle cx="55" cy="78" r="4" style={c('butter')} />
    </g>
  );
}

export function CatShape() {
  return (
    <g>
      <g className={styles.wag}>
        <path d="M86 96c18 4 26-8 20-22" style={{...inkStroke, stroke: 'var(--meadowlark-fur-grey)', strokeWidth: 8}} />
      </g>
      <path d="M34 112c-4-26 8-46 26-46s30 20 26 46z" style={c('fur-grey')} />
      <path d="M50 112c-2-14 2-24 10-24s12 10 10 24z" style={c('white')} />
      {/* head */}
      <circle cx="60" cy="52" r="24" style={c('fur-grey')} />
      <g className={styles.earTwitch}>
        <path d="M40 40 38 16l18 14z" style={c('fur-grey')} />
        <path d="M42 34 41 22l9 7z" style={c('clover')} />
      </g>
      <path d="M80 40 82 16 64 30z" style={c('fur-grey')} />
      <path d="M78 34 79 22l-9 7z" style={c('clover')} />
      {/* stripes */}
      <path d="M54 30l2 8m6-8-1 8" style={{...inkStroke, stroke: 'var(--meadowlark-fur-dark)', strokeWidth: 2.5}} />
      {/* face */}
      <g className={styles.blink}>
        <ellipse cx="51" cy="50" rx="3" ry="4" style={ink} />
        <ellipse cx="69" cy="50" rx="3" ry="4" style={ink} />
      </g>
      <path d="M57 58h6l-3 3z" style={c('clover')} />
      <path d="M60 61c-1 4-6 4-7 1m7-1c1 4 6 4 7 1" style={{...inkStroke, strokeWidth: 2}} />
      <path d="M36 58l12 2m-12 5 12-2m36-5-12 2m12 5-12-2" style={{...inkStroke, strokeWidth: 1.6}} />
    </g>
  );
}

export function RabbitShape() {
  return (
    <g>
      {/* ears */}
      <g className={styles.earTwitch}>
        <ellipse cx="48" cy="24" rx="8" ry="22" transform="rotate(-10 48 24)" style={c('fur-cream')} />
        <ellipse cx="48" cy="26" rx="3.6" ry="15" transform="rotate(-10 48 26)" style={c('clover')} />
      </g>
      <ellipse cx="70" cy="24" rx="8" ry="22" transform="rotate(12 70 24)" style={c('fur-cream')} />
      <ellipse cx="70" cy="26" rx="3.6" ry="15" transform="rotate(12 70 26)" style={c('clover')} />
      {/* body */}
      <ellipse cx="62" cy="92" rx="30" ry="24" style={c('fur-cream')} />
      <circle cx="90" cy="98" r="8" style={c('white')} />
      <ellipse cx="48" cy="112" rx="10" ry="5" style={c('white')} />
      {/* head */}
      <circle cx="58" cy="60" r="21" style={c('fur-cream')} />
      <g className={styles.blink}>
        <circle cx="50" cy="57" r="3" style={ink} />
        <circle cx="66" cy="57" r="3" style={ink} />
      </g>
      <circle cx="45" cy="65" r="4" style={{...c('clover'), opacity: 0.6}} />
      <circle cx="71" cy="65" r="4" style={{...c('clover'), opacity: 0.6}} />
      <path d="M55 64h6l-3 3z" style={c('clover')} />
      <path d="M58 67v3m-4 1c2 2 6 2 8 0" style={{...inkStroke, strokeWidth: 2}} />
    </g>
  );
}

export function HamsterShape() {
  return (
    <g>
      <ellipse cx="60" cy="86" rx="36" ry="28" style={c('fur-tan')} />
      <ellipse cx="60" cy="94" rx="24" ry="18" style={c('white')} />
      {/* ears */}
      <circle cx="36" cy="62" r="9" style={c('fur-tan')} />
      <circle cx="36" cy="62" r="5" style={c('clover')} />
      <circle cx="84" cy="62" r="9" style={c('fur-tan')} />
      <circle cx="84" cy="62" r="5" style={c('clover')} />
      <g className={styles.blink}>
        <circle cx="49" cy="78" r="3.2" style={ink} />
        <circle cx="71" cy="78" r="3.2" style={ink} />
      </g>
      <circle cx="60" cy="85" r="2.6" style={c('clover')} />
      <path d="M60 87c-1 3-5 3-6 1m6-1c1 3 5 3 6 1" style={{...inkStroke, strokeWidth: 1.8}} />
      {/* paws holding a seed */}
      <ellipse cx="60" cy="100" rx="5" ry="7" style={c('butter')} />
      <circle cx="54" cy="100" r="3.4" style={c('fur-cream')} />
      <circle cx="66" cy="100" r="3.4" style={c('fur-cream')} />
    </g>
  );
}

export const petShapes: Record<PetType, () => React.JSX.Element> = {
  dog: DogShape,
  cat: CatShape,
  rabbit: RabbitShape,
  small: HamsterShape,
};

/** A single animal on a soft round backdrop. Decorative. */
export function PetPortrait({pet, className}: {pet: PetType; className?: string}) {
  const Shape = petShapes[pet];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className={className}>
      <circle cx="60" cy="64" r="54" style={c('hill')} />
      <Shape />
    </svg>
  );
}

/** Meadowlark brand mark: a round little songbird on a leaf. */
export function MeadowlarkMark({size = 32}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="20" style={{fill: 'var(--color-accent)'}} />
      <path d="M8 30c8-1 16-4 24-12-6 9-14 13-24 12z" style={c('grass')} />
      <circle cx="20" cy="19" r="8" style={c('butter')} />
      <path d="M14 19c2 4 8 5 12 1" style={{fill: 'none', stroke: 'var(--meadowlark-ink)', strokeWidth: 2.4, strokeLinecap: 'round'}} />
      <circle cx="23" cy="16" r="1.6" style={ink} />
      <path d="M28 16l4 1.5-4 1.5z" style={c('fur-tan')} />
    </svg>
  );
}
