import {Button} from '@astryxdesign/core/Button';
import {TorqueMark} from './art';
import styles from './torque.module.css';

const nav = [
  {href: '#services', label: 'Services'},
  {href: '#estimate', label: 'Estimator'},
  {href: '#how', label: 'How it works'},
  {href: '#mot', label: 'MOT reminder'},
  {href: '#faq', label: 'FAQ'},
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <TorqueMark className={styles.brandMark} />
          <span className={styles.brandWord}>
            Torque<span className={styles.brandAmp}>&amp;</span>Co.
            <span className={styles.brandSub}>Motors</span>
            <span className={styles.visuallyHidden}>, back to top</span>
          </span>
        </a>
        <nav aria-label="Torque & Co. sections" className={styles.nav}>
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
        <Button label="Book in" href="#booking" size="sm" variant="primary" className={styles.headerCta} />
      </div>
    </header>
  );
}
