import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {Wordmark} from './Wordmark';
import styles from './legal.module.css';

const navItems = [
  {href: '#practice', label: 'Practice areas'},
  {href: '#conveyancing', label: 'Fees'},
  {href: '#how-we-work', label: 'How we work'},
  {href: '#solicitors', label: 'Solicitors'},
  {href: '#faq', label: 'FAQ'},
];

export function LegalHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand} aria-label="Marlowe & Pike, back to top">
          <Wordmark />
        </a>
        <nav aria-label="Marlowe & Pike sections" className={styles.nav}>
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
        <Button href="#enquiry" label="Make an enquiry" variant="primary" className={styles.hideSm} />
        <Button href="#enquiry" label="Enquire" variant="primary" size="sm" className={styles.showSm} />
      </HStack>
    </header>
  );
}
