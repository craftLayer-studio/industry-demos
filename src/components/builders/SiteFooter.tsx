import {STUDIO_URL} from '@/lib/paths';
import {KeystoneMark} from './art';
import styles from './keystone.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hazardBand} aria-hidden="true" />
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <p className={styles.brand}>
            <KeystoneMark className={styles.brandMark} />
            <span className={styles.brandWord}>
              Keystone<span className={styles.brandSub}>Build Co.</span>
            </span>
          </p>
          <p className={styles.footerText}>
            A fictional builder and home renovator. Concept demo only: no surveys are booked, no quotes are issued and
            no building work is carried out.
          </p>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Yard (fictional)</h2>
          <address className={styles.footerText}>
            Unit 7, Quarry Lane Trade Park
            <br />
            Millbrook (fictional address)
            <br />
            <a href="mailto:hello@example.com" className={styles.footerLink}>
              hello@example.com
            </a>
          </address>
        </div>
        <div>
          <h2 className={styles.footerHeading}>On this page</h2>
          <ul className={styles.footerLinks}>
            {[
              ['#services', 'Services'],
              ['#estimate', 'Extension estimator'],
              ['#guarantees', 'Our commitments'],
              ['#survey', 'Request a site survey'],
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
        <p className={styles.footerFine}>
          Concept demo by{' '}
          <a href={STUDIO_URL} className={styles.footerLink}>
            CraftLayer Studio
          </a>
          . Keystone Build Co., its projects and every figure on this page are invented for illustration.
          Illustrations are original.
        </p>
      </div>
    </footer>
  );
}
