import styles from './coffee.module.css';

/** Five-step roast scale. The visible pips are decorative; the text says the value. */
export function RoastScale({value, label, compact = false}: {value: number; label: string; compact?: boolean}) {
  return (
    <span className={`${styles.roastScale} ${compact ? styles.roastScaleCompact : ''}`}>
      <span className={styles.roastPips} aria-hidden="true">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={styles.roastPip} data-on={i <= value ? 'true' : undefined} data-step={i} />
        ))}
      </span>
      <span className={styles.roastText}>
        {label} roast<span className={styles.visuallyHidden}>, {value} of 5 on the roast scale</span>
      </span>
    </span>
  );
}
