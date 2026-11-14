import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {Monogram} from './Monogram';
import styles from './advisory.module.css';

const navItems = [
  {href: '#services', label: 'Services'},
  {href: '#estimate', label: 'Fees'},
  {href: '#process', label: 'Process'},
  {href: '#team', label: 'Team'},
  {href: '#insights', label: 'Insights'},
  {href: '#office', label: 'Office'},
];

export function AdvisoryHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <Monogram />
          <span className={styles.brandWord}>Halden &amp; Rowe</span>
        </a>
        <nav aria-label="Halden & Rowe sections" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} color="primary" weight="medium">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#consult" label="Book a consultation" variant="primary" className={styles.hideSm} />
        <Button href="#consult" label="Consult" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
