import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {FernMark} from './art';
import styles from './salon.module.css';

const navItems = [
  {href: '#services', label: 'Services'},
  {href: '#specialists', label: 'Specialists'},
  {href: '#packages', label: 'Spa packages'},
  {href: '#gift-cards', label: 'Gift cards'},
  {href: '#visit', label: 'Visit'},
  {href: '#faq', label: 'FAQ'},
];

export function SalonHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <FernMark />
          <span className={styles.brandName}>
            Fernlight <span className={styles.brandAmp}>Salon &amp; Spa</span>
          </span>
        </a>
        <nav aria-label="Fernlight sections" className={styles.nav}>
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
        <Button href="#book" label="Request an appointment" variant="primary" className={styles.hideSm} />
        <Button href="#book" label="Book" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
