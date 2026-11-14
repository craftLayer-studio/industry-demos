import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {AshgroveMark} from './icons';
import styles from './ashgrove.module.css';

const navItems = [
  {href: '#listings', label: 'Buy and rent'},
  {href: '#mortgage', label: 'Repayments'},
  {href: '#selling', label: 'Selling'},
  {href: '#areas', label: 'Areas'},
  {href: '#faqs', label: 'Questions'},
  {href: '#office', label: 'Office'},
];

export function Wordmark() {
  return (
    <>
      <AshgroveMark className={styles.brandMark} />
      <span className={styles.brandText}>
        <span className={styles.brandName}>Ashgrove</span>
        <span className={styles.brandSub}>Property</span>
      </span>
    </>
  );
}

export function AshgroveHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand} aria-label="Ashgrove Property, back to top">
          <Wordmark />
        </a>
        <nav aria-label="Ashgrove Property sections" className={styles.nav}>
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
        <Button href="#viewing" label="Request a viewing" variant="primary" className={styles.hideSm} />
        <Button href="#viewing" label="Viewings" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
