'use client';

import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {useShop} from './ShopContext';
import {BagIcon, BrandMark} from './icons';
import {itemCount} from './lib/cart';
import styles from './coffee.module.css';

const nav = [
  {href: '#shop', label: 'Shop'},
  {href: '#subscribe', label: 'Subscriptions'},
  {href: '#brew', label: 'Brew guides'},
  {href: '#wholesale', label: 'Wholesale'},
  {href: '#faq', label: 'FAQ'},
];

export function SiteHeader() {
  const {cart, setCartOpen} = useShop();
  const count = itemCount(cart);
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <BrandMark className={styles.brandMark} />
          <span className={styles.brandWord}>
            Brightwater<span className={styles.brandSub}>Coffee roasters</span>
            <span className={styles.visuallyHidden}>, back to top</span>
          </span>
        </a>
        <nav aria-label="Brightwater sections" className={styles.nav}>
          <ul className={styles.navList}>
            {nav.map(item => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          label={count === 0 ? 'Cart' : `Cart (${count})`}
          aria-label={count === 0 ? 'Open cart, empty' : `Open cart, ${count} ${count === 1 ? 'bag' : 'bags'}`}
          icon={<Icon icon={BagIcon} />}
          variant="secondary"
          size="sm"
          onClick={() => setCartOpen(true)}
          className={styles.cartButton}
        />
      </div>
    </header>
  );
}
