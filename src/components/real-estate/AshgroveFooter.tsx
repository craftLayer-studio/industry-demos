import {Wordmark} from './AshgroveHeader';
import {STUDIO_URL} from '@/lib/paths';
import styles from './ashgrove.module.css';

export function AshgroveFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>
            <Wordmark />
          </span>
          <p>
            A fictional independent estate agency in the fictional market town of Wealdbury. Listings, prices, people and
            places on this page are invented for demonstration.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.footerNav}>
          <ul>
            <li><a href="#listings">Homes for sale and to rent</a></li>
            <li><a href="#mortgage">Repayment estimator</a></li>
            <li><a href="#selling">Selling with us</a></li>
            <li><a href="#areas">Area guide</a></li>
            <li><a href="#viewing">Request a viewing</a></li>
          </ul>
        </nav>
        <div className={styles.footerNote}>
          <p>
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>.
          </p>
          <p>Not a real business. Nothing on this page is an offer, a valuation or financial advice, and no data is sent anywhere.</p>
        </div>
      </div>
    </footer>
  );
}
