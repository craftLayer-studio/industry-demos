import Link from 'next/link';
import {STUDIO_URL} from '@/lib/paths';
import styles from './ConceptBar.module.css';

/**
 * Persistent disclosure shown on every demo page. Required: these are
 * fictional brands built by CraftLayer Studio, not real businesses.
 */
export function ConceptBar({brand}: {brand: string}) {
  return (
    <div className={styles.bar} role="note" aria-label="Concept demo notice">
      <span className={styles.badge}>Concept demo</span>
      <span className={styles.text}>
        {brand} is a fictional brand designed and built by{' '}
        <a href={STUDIO_URL}>CraftLayer Studio</a>. No real bookings, orders or data are processed.
      </span>
      <Link href="/" className={styles.back}>
        All demos
      </Link>
    </div>
  );
}
