import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import styles from './ostrander.module.css';

const PRINCIPLES = [
  {
    title: 'Start with the grid',
    body: 'Every project is set out on one dimensional grid. Walls, windows, joinery and structure share it, so the building is easier to draw, price and build.',
    art: (
      <g>
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`v${i}`} x1={8 + i * 16} y1={6} x2={8 + i * 16} y2={74} />
        ))}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`h${i}`} x1={4} y1={8 + i * 16} x2={76} y2={8 + i * 16} />
        ))}
        <rect x={24} y={24} width={32} height={32} className={styles.artRed} />
      </g>
    ),
  },
  {
    title: 'Draw the light first',
    body: 'We plot sun paths and sightlines before rooms. Openings are placed where light and view are best, then the plan follows.',
    art: (
      <g>
        <path d="M6 70 H74" />
        <path d="M14 70 V30 H66 V70" />
        <path d="M40 4 L52 30" className={styles.artRedLine} />
        <path d="M52 4 L64 30" className={styles.artRedLine} />
        <path d="M28 4 L40 30" className={styles.artRedLine} />
        <path d="M40 30 L28 70 M52 30 L40 70 M64 30 L52 70" strokeDasharray="3 3" />
      </g>
    ),
  },
  {
    title: 'Few materials, well joined',
    body: 'Three or four materials per project, chosen to age well and meet each other cleanly. Detail is where quality is decided.',
    art: (
      <g>
        <rect x={8} y={8} width={30} height={64} />
        <rect x={42} y={8} width={30} height={30} />
        <rect x={42} y={42} width={30} height={30} className={styles.artRed} />
        <path d="M8 24 H38 M8 40 H38 M8 56 H38" />
      </g>
    ),
  },
  {
    title: 'Budget as a design input',
    body: 'Cost is checked at every stage, not at the end. If a move does not earn its cost, it comes out early, while change is cheap.',
    art: (
      <g>
        <path d="M6 72 H74" />
        <rect x={10} y={46} width={10} height={26} />
        <rect x={26} y={34} width={10} height={38} />
        <rect x={42} y={40} width={10} height={32} />
        <rect x={58} y={28} width={10} height={44} className={styles.artRed} />
        <path d="M4 26 H76" strokeDasharray="4 3" />
      </g>
    ),
  },
];

export function Approach() {
  return (
    <SectionShell
      id="approach"
      index="04"
      eyebrow="Approach"
      tone="ink"
      title="Four rules we would draw by."
      lead="How an imagined practice like Ostrander might work. A statement of intent for this demo, not a record of past projects.">
      <ol className={styles.principles}>
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} className={styles.principle}>
            <svg viewBox="0 0 80 80" className={styles.principleArt} aria-hidden="true" focusable="false">
              {p.art}
            </svg>
            <p className={styles.principleNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </p>
            <Heading level={3} className={styles.principleTitle}>
              {p.title}
            </Heading>
            <Text as="p" className={styles.principleBody}>
              {p.body}
            </Text>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
