import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {SaltmarshMark} from './art';
import styles from './saltmarsh.module.css';

const navItems = [
  {href: '#rooms', label: 'Rooms'},
  {href: '#rates', label: 'Rates'},
  {href: '#dining', label: 'Dining and spa'},
  {href: '#area', label: 'The area'},
  {href: '#faqs', label: 'Questions'},
];

export function Wordmark() {
  return (
    <>
      <SaltmarshMark className={styles.brandMark} />
      <span className={styles.brandText}>
        <span className={styles.brandSmall}>The</span>
        <span className={styles.brandName}>Saltmarsh</span>
      </span>
    </>
  );
}

export function Header() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand} aria-label="The Saltmarsh, back to top">
          <Wordmark />
        </a>
        <nav aria-label="The Saltmarsh sections" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#book" label="Request a stay" variant="primary" className={styles.hideSm} />
        <Button href="#book" label="Book" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
