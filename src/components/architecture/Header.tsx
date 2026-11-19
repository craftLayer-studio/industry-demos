import {Button} from '@astryxdesign/core/Button';
import {Wordmark} from './Wordmark';
import styles from './ostrander.module.css';

const navItems = [
  {href: '#work', label: 'Work'},
  {href: '#stages', label: 'Stages'},
  {href: '#fees', label: 'Fees'},
  {href: '#approach', label: 'Approach'},
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand} aria-label="Ostrander Studio, back to top">
          <Wordmark />
        </a>
        <nav aria-label="Ostrander Studio sections" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  <span className={styles.navNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#brief" label="Start a brief" variant="primary" size="sm" />
      </div>
    </header>
  );
}
