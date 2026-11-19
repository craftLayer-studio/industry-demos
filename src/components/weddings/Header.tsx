import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {HollinMark} from './art';
import styles from './hollin.module.css';

const navItems = [
  {href: '#spaces', label: 'Spaces'},
  {href: '#packages', label: 'Packages'},
  {href: '#dates', label: 'Dates'},
  {href: '#included', label: 'Included'},
  {href: '#getting-here', label: 'Getting here'},
  {href: '#faqs', label: 'Questions'},
];

export function Wordmark() {
  return (
    <>
      <HollinMark className={styles.brandMark} />
      <span className={styles.brandText}>
        <span className={styles.brandName}>Hollin Barn</span>
        <span className={styles.brandSmall}>Weddings and gatherings</span>
      </span>
    </>
  );
}

export function Header() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand} aria-label="Hollin Barn, back to top">
          <Wordmark />
        </a>
        <nav aria-label="Hollin Barn sections" className={styles.nav}>
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
        <Button href="#viewing" label="Book a viewing" variant="primary" className={styles.hideSm} />
        <Button href="#viewing" label="Visit" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
