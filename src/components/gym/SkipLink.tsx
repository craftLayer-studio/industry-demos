import styles from './gym.module.css';

export function SkipLink() {
  return (
    <a href="#main" className={styles.skipLink}>
      Skip to content
    </a>
  );
}
