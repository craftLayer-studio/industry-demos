import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {NorthstarMark} from './icons';
import styles from './clinic.module.css';

const navItems = [
  {href: '#specialties', label: 'Specialties'},
  {href: '#clinicians', label: 'Clinicians'},
  {href: '#hours', label: 'Hours'},
  {href: '#location', label: 'Location'},
  {href: '#faqs', label: 'FAQs'},
  {href: '#contact', label: 'Contact'},
];

export function ClinicHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandMark}>
            <NorthstarMark />
          </span>
          Northstar Clinic
        </a>
        <nav aria-label="Northstar Clinic sections" className={styles.nav}>
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
        <Button href="#book" label="Request appointment" variant="primary" className={styles.hideSm} />
        <Button href="#book" label="Book" variant="primary" className={styles.showSm} />
      </HStack>
    </header>
  );
}
