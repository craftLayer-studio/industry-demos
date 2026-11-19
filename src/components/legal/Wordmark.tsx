import styles from './legal.module.css';

/** Typeset wordmark: roman names, an italic brass ampersand. */
export function Wordmark({className = ''}: {className?: string}) {
  return (
    <span className={`${styles.wordmark} ${className}`}>
      Marlowe <span className={styles.amp}>&amp;</span> Pike
    </span>
  );
}
