import {Button} from '@astryxdesign/core/Button';
import {KeystoneMark} from './art';
import styles from './keystone.module.css';

const nav = [
  {href: '#services', label: 'Services'},
  {href: '#estimate', label: 'Estimator'},
  {href: '#process', label: 'Process'},
  {href: '#projects', label: 'Projects'},
  {href: '#faq', label: 'FAQ'},
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <KeystoneMark className={styles.brandMark} />
          <span className={styles.brandWord}>
            Keystone<span className={styles.brandSub}>Build Co.</span>
            <span className={styles.visuallyHidden}>, back to top</span>
          </span>
        </a>
        <nav aria-label="Keystone sections" className={styles.nav}>
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
        <Button label="Book a survey" href="#survey" size="sm" className={styles.headerCta} />
      </div>
    </header>
  );
}
