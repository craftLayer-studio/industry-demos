import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {MeadowlarkMark} from './illustrations';
import styles from './vet.module.css';

const navItems = [
  {href: '#services', label: 'Services'},
  {href: '#plans', label: 'Health plans'},
  {href: '#hours', label: 'Hours'},
  {href: '#emergency', label: 'Emergencies'},
  {href: '#team', label: 'Team'},
  {href: '#faqs', label: 'FAQs'},
];

export function VetHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <MeadowlarkMark />
          Meadowlark Vets
        </a>
        <nav aria-label="Meadowlark Vets sections" className={styles.nav}>
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
        <Button href="#appointment" label="Request a visit" variant="primary" className={styles.hideSm} />
        <Button href="#appointment" label="Book" variant="primary" className={styles.showSm} />
      </HStack>
    </header>
  );
}
