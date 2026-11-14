import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {LogoMark} from './illustrations';
import styles from './nonprofit.module.css';

const navItems = [
  {href: '#programmes', label: 'What we do'},
  {href: '#volunteer', label: 'Volunteer'},
  {href: '#events', label: 'Events'},
  {href: '#get-help', label: 'Get help'},
  {href: '#faq', label: 'FAQ'},
];

export function Header() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <LogoMark className={styles.logo} />
          <span>Common Table</span>
        </a>
        <nav aria-label="Common Table sections" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} color="primary" weight="semibold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#donate" label="Donate" variant="primary" className={styles.headerCta} />
      </HStack>
    </header>
  );
}
