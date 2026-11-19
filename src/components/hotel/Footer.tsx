import {Wordmark} from './Header';
import {STUDIO_URL} from '@/lib/paths';
import styles from './saltmarsh.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>
            <Wordmark />
          </span>
          <p>
            A fictional boutique hotel in the fictional estuary village of Wrenmouth. Rooms, rates, places and dishes on
            this page are invented for demonstration.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.footerNav}>
          <ul>
            <li><a href="#rooms">Rooms and suites</a></li>
            <li><a href="#rates">Availability and rates</a></li>
            <li><a href="#dining">Dining and spa</a></li>
            <li><a href="#area">Local area guide</a></li>
            <li><a href="#book">Request a stay</a></li>
          </ul>
        </nav>
        <div className={styles.footerNote}>
          <p>
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>.
          </p>
          <p>Not a real hotel. Nothing on this page can be booked or paid for, and no data leaves your browser.</p>
          <p>Address: 1 Creek Lane, Wrenmouth (fictional). Email: stay@example.com</p>
        </div>
      </div>
    </footer>
  );
}
