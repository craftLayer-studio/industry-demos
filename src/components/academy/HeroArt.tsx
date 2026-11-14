import styles from './academy.module.css';

/**
 * Hero illustration: an open notebook page with a wireframe sketch, a small
 * chart, a code snippet, a feedback sticky note and a quill. Pure SVG drawn
 * with theme tokens so it follows the Quillmark palette.
 */
export function HeroArt() {
  const rules = Array.from({length: 15}, (_, i) => 92 + i * 26);
  return (
    <svg
      viewBox="0 0 560 520"
      className={styles.heroArt}
      role="img"
      aria-label="Illustration: a notebook page with a wireframe sketch, a bar chart, a code snippet and a feedback note, with a quill resting on top">
      <defs>
        <filter id="qm-soft" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#5b3a1f" floodOpacity="0.14" />
        </filter>
        <clipPath id="qm-page">
          <rect x="70" y="40" width="430" height="440" rx="18" />
        </clipPath>
      </defs>

      {/* Back page */}
      <g transform="rotate(4 285 260)">
        <rect x="76" y="46" width="430" height="440" rx="18" fill="var(--quillmark-paper-deep)" stroke="var(--quillmark-rule)" strokeWidth="2" />
      </g>

      {/* Front page */}
      <g transform="rotate(-2.5 285 260)" filter="url(#qm-soft)">
        <rect x="70" y="40" width="430" height="440" rx="18" fill="var(--color-background-surface)" stroke="var(--quillmark-rule)" strokeWidth="2" />
        <g clipPath="url(#qm-page)">
          {rules.map(y => (
            <line key={y} x1="70" x2="500" y1={y} y2={y} stroke="var(--quillmark-rule)" strokeWidth="1.5" />
          ))}
          <line x1="128" x2="128" y1="40" y2="480" stroke="var(--quillmark-margin)" strokeWidth="2" />
        </g>
        {/* Binding holes */}
        {[90, 170, 250, 330, 410].map(y => (
          <circle key={y} cx="96" cy={y} r="7" fill="var(--quillmark-paper-deep)" stroke="var(--quillmark-rule)" strokeWidth="2" />
        ))}

        {/* Page heading */}
        <text x="146" y="80" className={styles.artHeading} fill="var(--quillmark-ink)">
          Week 3 · studio notes
        </text>
        <path d="M146 90c40-4 90-5 150-1" stroke="var(--quillmark-saffron)" strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Wireframe sketch */}
        <g transform="translate(150 118)">
          <rect width="112" height="196" rx="16" fill="var(--quillmark-teal-soft)" stroke="var(--quillmark-teal)" strokeWidth="2.5" />
          <rect x="14" y="20" width="84" height="44" rx="8" fill="none" stroke="var(--quillmark-teal)" strokeWidth="2" strokeDasharray="5 5" />
          <path d="M14 20l84 44M98 20 14 64" stroke="var(--quillmark-teal)" strokeWidth="1.5" opacity="0.6" />
          <rect x="14" y="78" width="62" height="8" rx="4" fill="var(--quillmark-teal)" />
          <rect x="14" y="94" width="84" height="6" rx="3" fill="var(--quillmark-teal)" opacity="0.45" />
          <rect x="14" y="106" width="70" height="6" rx="3" fill="var(--quillmark-teal)" opacity="0.45" />
          <rect x="14" y="148" width="84" height="28" rx="14" fill="var(--color-accent)" />
          <rect x="34" y="159" width="44" height="6" rx="3" fill="var(--color-on-accent)" />
          {/* Hand-drawn annotation */}
          <path d="M112 162c18 2 28-6 34-18" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M140 140l6 4-1 7" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Bar chart */}
        <g transform="translate(300 128)">
          <path d="M0 0v118h160" stroke="var(--quillmark-ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {[
            [16, 70],
            [46, 52],
            [76, 88],
            [106, 64],
            [136, 102],
          ].map(([x, h]) => (
            <path
              key={x}
              d={`M${x} 117 v-${h} q1 -3 4 -3 h14 q3 0 3 3 v${h}`}
              fill="var(--quillmark-saffron-soft)"
              stroke="var(--quillmark-saffron)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          ))}
          <path d="M24 56c26-6 40 6 60-20 20-14 40 4 60-26" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="144" cy="10" r="5" fill="var(--color-accent)" />
        </g>

        {/* Code snippet */}
        <g transform="translate(300 286)">
          <rect width="176" height="96" rx="12" fill="var(--quillmark-ink)" />
          <text x="16" y="30" className={styles.artCode} fill="var(--quillmark-saffron)">
            {'<label for="email">'}
          </text>
          <rect x="16" y="44" width="92" height="7" rx="3.5" fill="var(--quillmark-teal-soft)" opacity="0.8" />
          <rect x="28" y="60" width="118" height="7" rx="3.5" fill="var(--quillmark-orange-soft)" opacity="0.85" />
          <rect x="16" y="76" width="64" height="7" rx="3.5" fill="var(--quillmark-teal-soft)" opacity="0.6" />
        </g>

        {/* Checklist */}
        <g transform="translate(150 346)">
          {['Interview notes', 'Test the prototype', 'Write it up'].map((label, i) => (
            <g key={label} transform={`translate(0 ${i * 30})`}>
              <rect width="16" height="16" rx="4" fill="none" stroke="var(--quillmark-ink)" strokeWidth="2" />
              {i < 2 ? (
                <path d="M3 8.5l3.5 3.5L13 4" stroke="var(--color-accent)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
              <text x="26" y="13" className={styles.artNote} fill="var(--quillmark-ink)">
                {label}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Sticky note with feedback */}
      <g transform="rotate(6 470 70)">
        <rect x="392" y="22" width="150" height="112" rx="6" fill="var(--quillmark-saffron)" />
        <path d="M392 120l150 0v8a6 6 0 0 1-6 6H398a6 6 0 0 1-6-6Z" fill="var(--quillmark-ink)" opacity="0.08" />
        <text x="406" y="52" className={styles.artNoteStrong} fill="var(--quillmark-ink)">
          Feedback
        </text>
        <text x="406" y="76" className={styles.artNote} fill="var(--quillmark-ink)">
          Lovely hierarchy.
        </text>
        <text x="406" y="98" className={styles.artNote} fill="var(--quillmark-ink)">
          Try a bigger tap
        </text>
        <text x="406" y="120" className={styles.artNote} fill="var(--quillmark-ink)">
          target here.
        </text>
      </g>

      {/* Quill */}
      <g transform="translate(372 500) rotate(-24)">
        <path d="M0 0c40-30 120-46 196-40-50 26-120 48-196 40Z" fill="var(--color-background-surface)" stroke="var(--quillmark-ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M6 1c56-12 118-24 186-40" stroke="var(--quillmark-ink)" strokeWidth="2" fill="none" />
        {[40, 70, 100, 130, 160].map(x => (
          <path key={x} d={`M${x} ${-x * 0.2}l-14 ${x > 120 ? 6 : 10}`} stroke="var(--quillmark-rule)" strokeWidth="2" strokeLinecap="round" />
        ))}
        <path d="M6 1-26 16" stroke="var(--quillmark-ink)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="-30" cy="18" r="3.5" fill="var(--color-accent)" />
      </g>

      {/* Cohort chip */}
      <g transform="translate(24 404)">
        <rect width="156" height="56" rx="28" fill="var(--color-background-surface)" stroke="var(--quillmark-rule)" strokeWidth="2" />
        {[
          ['IO', 'var(--quillmark-orange-soft)'],
          ['TR', 'var(--quillmark-teal-soft)'],
          ['PH', 'var(--quillmark-saffron-soft)'],
        ].map(([label, fill], i) => (
          <g key={label} transform={`translate(${28 + i * 24} 28)`}>
            <circle r="17" fill={fill} stroke="var(--color-background-surface)" strokeWidth="3" />
            <text textAnchor="middle" y="5" className={styles.artInitials} fill="var(--quillmark-ink)">
              {label}
            </text>
          </g>
        ))}
        <text x="98" y="34" className={styles.artNoteStrong} fill="var(--quillmark-ink)">
          +15
        </text>
      </g>
    </svg>
  );
}
