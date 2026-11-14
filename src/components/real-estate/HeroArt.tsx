import {Facade} from './PropertyArt';
import {propertyById} from './lib/data';
import styles from './ashgrove.module.css';

const LINE = 'var(--ashgrove-line)';

/** Hero composition: a Georgian elevation under an arch, with an ash tree. */
export function HeroArt() {
  const ferry = propertyById('ferry-row-7')!;
  return (
    <svg viewBox="0 0 400 500" className={styles.heroArt} aria-hidden="true" focusable="false">
      <rect width="400" height="500" fill="var(--ashgrove-stone)" />
      <circle cx="292" cy="150" r="54" fill="var(--ashgrove-terracotta)" opacity="0.9" />
      <g stroke={LINE} strokeWidth="1.2" fill="none" opacity="0.6">
        <path d="M60,96 q6,-6 12,0 q6,-6 12,0" />
        <path d="M96,72 q5,-5 10,0 q5,-5 10,0" />
      </g>
      <g transform="translate(-50 190) scale(1.25)">
        <Facade style="townhouse" palette={ferry.palette} />
      </g>
      {/* Ash tree */}
      <g>
        <path d="M58,478 C60,420 52,380 62,330 M62,360 C40,340 30,320 26,296 M62,350 C84,330 96,316 102,290" stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" />
        <g fill="var(--ashgrove-sage)" opacity="0.88">
          <ellipse cx="60" cy="282" rx="52" ry="40" />
          <ellipse cx="22" cy="306" rx="30" ry="24" />
          <ellipse cx="104" cy="300" rx="32" ry="26" />
          <ellipse cx="66" cy="246" rx="34" ry="26" />
        </g>
        <g stroke={LINE} strokeWidth="0.9" fill="none" opacity="0.45">
          <path d="M30,290 q14,-10 28,0 M70,262 q14,-10 28,0 M80,304 q12,-8 24,0 M40,318 q10,-7 20,0" />
        </g>
      </g>
      <line x1="0" x2="400" y1="478" y2="478" stroke={LINE} strokeWidth="2" />
      <rect y="479" width="400" height="21" fill="var(--ashgrove-stone-deep)" />
      {/* Dimension line: a draughtsman's touch */}
      <g stroke="var(--ashgrove-terracotta)" strokeWidth="1" opacity="0.9">
        <line x1="380" x2="380" y1="222" y2="476" />
        <line x1="374" x2="386" y1="222" y2="222" />
        <line x1="374" x2="386" y1="476" y2="476" />
      </g>
    </svg>
  );
}
