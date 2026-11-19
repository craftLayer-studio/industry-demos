import type {CSSProperties} from 'react';
import {CatShape, DogShape, HamsterShape, RabbitShape} from './illustrations';
import styles from './vet.module.css';

const c = (token: string): CSSProperties => ({fill: `var(--meadowlark-${token})`});

function Flower({x, y, petal}: {x: number; y: number; petal: string}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0v18" style={{stroke: 'var(--meadowlark-leaf)', strokeWidth: 2.5, strokeLinecap: 'round'}} />
      {[0, 72, 144, 216, 288].map(r => (
        <ellipse key={r} cx="0" cy="-6" rx="3.6" ry="6" transform={`rotate(${r})`} style={c(petal)} />
      ))}
      <circle r="3" style={c('butter')} />
    </g>
  );
}

/** Decorative hero scene: a dog, cat, rabbit and hamster in a sunny meadow. */
export function HeroArt() {
  return (
    <svg className={styles.heroArt} viewBox="0 0 600 500" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="meadowlark-hero-clip">
          <rect width="600" height="500" rx="48" />
        </clipPath>
      </defs>
      <g clipPath="url(#meadowlark-hero-clip)">
        <rect width="600" height="500" style={c('sky')} />
        <circle cx="470" cy="110" r="58" style={c('butter')} />
        <g className={styles.drift}>
          <path d="M70 120a26 26 0 0 1 50-10 20 20 0 0 1 30 18H70z" style={c('white')} />
          <path d="M300 80a20 20 0 0 1 38-8 16 16 0 0 1 24 14h-62z" style={c('white')} />
        </g>
        {/* cottage practice */}
        <g transform="translate(330 150)">
          <rect x="0" y="50" width="150" height="110" rx="18" style={c('white')} />
          <path d="M-14 62 75 0l89 62z" style={{fill: 'var(--color-accent)'}} />
          <rect x="58" y="96" width="36" height="64" rx="18" style={c('grass')} />
          <circle cx="32" cy="98" r="14" style={c('butter')} />
          <circle cx="120" cy="98" r="14" style={c('butter')} />
          <path d="M75 26c-8 0-12 8-8 14h16c4-6 0-14-8-14z" style={c('white')} />
        </g>
        {/* hills */}
        <path d="M0 300c120-60 240-60 340-10s180 40 260 0v210H0z" style={c('hill')} />
        <path d="M0 360c140-40 260-30 380 0s170 20 220 0v140H0z" style={c('grass')} />
        <path d="M0 420c120-20 260-20 380 0s170 10 220 0v80H0z" style={c('leaf')} />
        <Flower x={50} y={392} petal="clover" />
        <Flower x={540} y={378} petal="white" />
        <Flower x={300} y={440} petal="clover" />
        <Flower x={460} y={452} petal="butter" />
      </g>

      {/* animals */}
      <g transform="translate(36 236) scale(1.7)">
        <DogShape />
      </g>
      <g transform="translate(232 270) scale(1.45)">
        <CatShape />
      </g>
      <g transform="translate(392 270) scale(1.4)">
        <RabbitShape />
      </g>
      <g transform="translate(250 384) scale(0.85)">
        <HamsterShape />
      </g>

      {/* meadowlark */}
      <g className={styles.bob}>
        <g transform="translate(176 120)">
          <ellipse cx="0" cy="0" rx="20" ry="16" style={c('butter')} />
          <path d="M-6 2c4 8 16 8 20-2" style={{fill: 'none', stroke: 'var(--meadowlark-ink)', strokeWidth: 3, strokeLinecap: 'round'}} />
          <path d="M-18-2l-14-6 4 12z" style={c('fur-dark')} />
          <path d="M-4-6c-6-14 10-18 14-6" style={c('fur-tan')} />
          <circle cx="8" cy="-4" r="2.4" style={{fill: 'var(--meadowlark-ink)'}} />
          <path d="M18-4l9 3-9 3z" style={c('fur-tan')} />
        </g>
      </g>
    </svg>
  );
}
