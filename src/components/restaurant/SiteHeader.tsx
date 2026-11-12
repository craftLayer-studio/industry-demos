'use client';

import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {Icon} from '@astryxdesign/core/Icon';
import {Link} from '@astryxdesign/core/Link';
import {useCart} from './CartContext';
import {BagIcon} from './icons';
import {itemCount} from './lib/cart';
import styles from './restaurant.module.css';

const NAV = [
  {href: '#story', label: 'Story'},
  {href: '#menu', label: 'Menu'},
  {href: '#reserve', label: 'Reserve'},
  {href: '#visit', label: 'Visit'},
];

export function SiteHeader() {
  const {cart, setOpen} = useCart();
  const count = itemCount(cart);
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <HStack className={styles.headerInner} gap={4} align="center" justify="between" wrap="wrap">
        <a href="#top" className={styles.wordmark} aria-label="Juniper Kitchen, back to top">
          <span className={styles.wordmarkMain}>Juniper</span>
          <span className={styles.wordmarkSub}>Kitchen</span>
        </a>
        <nav aria-label="Primary" className={styles.nav}>
          <ul className={styles.navList}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} color="primary" className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          variant="primary"
          label={count > 0 ? `Your order, ${count} ${count === 1 ? 'item' : 'items'}` : 'Your order'}
          icon={<Icon icon={BagIcon} />}
          endContent={count > 0 ? <Badge label={String(count)} /> : undefined}
          onClick={() => setOpen(true)}
          className={styles.orderButton}>
          Order
        </Button>
      </HStack>
    </header>
  );
}
