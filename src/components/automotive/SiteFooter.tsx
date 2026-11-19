import {STUDIO_URL} from '@/lib/paths';
import {TorqueMark} from './art';
import styles from './torque.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.stripe} aria-hidden="true" />
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <p className={styles.brand}>
            <TorqueMark className={styles.brandMark} />
            <span className={styles.brandWord}>
              Torque<span className={styles.brandAmp}>&amp;</span>Co.
              <span className={styles.brandSub}>Motors</span>
            </span>
          </p>
          <p className={styles.footerText}>
            A fictional independent garage. Concept demo only: no vehicles are looked up, no bookings are made and no
            work is carried out.
          </p>
        </div>
        <div>
          <h2 className={styles.footerHeading}>Workshop (fictional)</h2>
          <address className={styles.footerText}>
            Bay 3, Ironworks Yard
            <br />
            Castlebridge (fictional address)
            <br />
            <a href="mailto:workshop@example.com" className={styles.footerLink}>
              workshop@example.com
            </a>
          </address>
          <p className={`${styles.footerText} ${styles.mono}`}>Mon to Sat · 08:00 to 18:00 (sample hours)</p>
        </div>
        <div>
          <h2 className={styles.footerHeading}>On this page</h2>
          <ul className={styles.footerLinks}>
            {[
              ['#services', 'Service menu'],
              ['#estimate', 'Price estimator'],
              ['#mot', 'MOT reminder'],
              ['#booking', 'Booking request'],
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
          . Torque &amp; Co. Motors, its prices and every figure on this page are invented for illustration. Illustrations
          are original.
        </p>
      </div>
    </footer>
  );
}
