import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {ArbourMark} from './art';
import styles from './dental.module.css';

const navItems = [
  {href: '#treatments', label: 'Treatments'},
  {href: '#payments', label: 'Payments'},
  {href: '#journey', label: 'First visit'},
  {href: '#team', label: 'Team'},
  {href: '#faq', label: 'FAQ'},
];

export function DentalHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <ArbourMark />
          <span className={styles.brandName}>
            Arbour <span className={styles.brandSub}>Dental</span>
          </span>
        </a>
        <nav aria-label="Arbour Dental sections" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} color="primary" className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#consultation" label="Request a consultation" variant="primary" className={styles.hideSm} />
        <Button href="#consultation" label="Enquire" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
