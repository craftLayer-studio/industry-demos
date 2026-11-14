import {STUDIO_URL} from '@/lib/paths';
import {PulseMark} from './icons';
import styles from './saas.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <div className={styles.footerBrand}>
          <span className={styles.brand}>
            <span className={styles.brandMark}>
              <PulseMark />
            </span>
            Pulsegrid
          </span>
          <p className={styles.smallText}>
            A fictional product-analytics SaaS. All product names, prices and numbers are sample content.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.footerNav}>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#security">Privacy</a>
            </li>
            <li>
              <a href="#waitlist">Waitlist</a>
            </li>
          </ul>
        </nav>
        <div className={styles.footerMeta}>
          <p>
            Contact (placeholder): <a href="mailto:hello@example.com">hello@example.com</a>
          </p>
          <p>
            <a href={STUDIO_URL}>Concept demo by CraftLayer Studio</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
