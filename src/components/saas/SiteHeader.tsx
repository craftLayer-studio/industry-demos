import {Button} from '@astryxdesign/core/Button';
import {PulseMark} from './icons';
import styles from './saas.module.css';

const nav = [
  {href: '#features', label: 'Features'},
  {href: '#dashboard', label: 'Sample dashboard'},
  {href: '#pricing', label: 'Pricing'},
  {href: '#security', label: 'Privacy'},
  {href: '#faq', label: 'FAQ'},
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand} aria-label="Pulsegrid, back to top">
          <span className={styles.brandMark}>
            <PulseMark />
          </span>
          <span>Pulsegrid</span>
        </a>
        <nav aria-label="Pulsegrid sections" className={styles.nav}>
          <ul className={styles.navList}>
            {nav.map(item => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#waitlist" label="Join the waitlist" variant="primary" size="sm" className={styles.headerCta} />
      </div>
    </header>
  );
}
