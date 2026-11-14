import styles from './advisory.module.css';

/** Typeset H&R monogram in a double-ruled square. Decorative. */
export function Monogram({className = ''}: {className?: string}) {
  return (
    <span className={`${styles.monogram} ${className}`} aria-hidden="true">
      H&amp;R
    </span>
  );
}
