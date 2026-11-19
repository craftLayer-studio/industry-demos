import {Wordmark} from './Header';
import {STUDIO_URL} from '@/lib/paths';
import styles from './hollin.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>
            <Wordmark />
          </span>
          <p>
            A fictional countryside wedding and events venue. The barn, spaces, prices, dates and places on this page are
            invented for demonstration.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.footerNav}>
          <ul>
            <li><a href="#spaces">Spaces and capacities</a></li>
            <li><a href="#packages">Package builder</a></li>
            <li><a href="#dates">Sample availability</a></li>
            <li><a href="#getting-here">Getting here</a></li>
            <li><a href="#viewing">Book a viewing</a></li>
          </ul>
        </nav>
        <div className={styles.footerNote}>
          <p>
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>.
          </p>
          <p>Not a real venue. Nothing on this page can be booked or paid for, and no data leaves your browser.</p>
          <p>Address: Hollin Lane, Wendlebury (fictional). Email: hello@example.com</p>
        </div>
      </div>
    </footer>
  );
}
