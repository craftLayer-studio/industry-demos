import styles from './ostrander.module.css';

/** Ostrander wordmark: a square registration mark with one red corner, and the name set tight. */
export function Wordmark({sub = true}: {sub?: boolean}) {
  return (
    <>
      <svg viewBox="0 0 24 24" className={styles.brandMark} aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="12" width="10.5" height="10.5" className={styles.brandMarkRed} />
        <path d="M1.5 12h21M12 1.5v21" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className={styles.brandText}>
        <span className={styles.brandName}>Ostrander</span>
        {sub ? <span className={styles.brandSub}>Studio</span> : null}
      </span>
    </>
  );
}
