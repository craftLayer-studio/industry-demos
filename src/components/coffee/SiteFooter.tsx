import {STUDIO_URL} from '@/lib/paths';
import {BrandMark} from './icons';
import styles from './coffee.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <p className={styles.brand}>
            <BrandMark className={styles.brandMark} />
            <span className={styles.brandWord}>Brightwater</span>
          </p>
          <p className={styles.smallText}>
            A fictional small-batch coffee roaster. Concept demo only: no coffee is sold, roasted or shipped.
          </p>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Visit (fictional)</h2>
          <address className={styles.smallText}>
            Unit 4, Harbour Yard
            <br />
            Brightwater (fictional address)
            <br />
            <a href="mailto:hello@example.com" className={styles.footerLink}>
              hello@example.com
            </a>
          </address>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Explore</h2>
          <ul className={styles.footerLinks}>
            {[
              ['#shop', 'Shop coffee'],
              ['#subscribe', 'Subscriptions'],
              ['#brew', 'Brew guides'],
              ['#wholesale', 'Wholesale'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className={styles.footerLink}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${styles.container} ${styles.footerBase}`}>
        <p className={styles.finePrint}>
          Concept demo by{' '}
          <a href={STUDIO_URL} className={styles.footerLink}>
            CraftLayer Studio
          </a>
          . Brightwater Coffee, its coffees and prices are invented. Illustrations are original.
        </p>
      </div>
    </footer>
  );
}
