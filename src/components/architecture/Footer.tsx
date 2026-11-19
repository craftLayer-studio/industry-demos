import {STUDIO_URL} from '@/lib/paths';
import {Wordmark} from './Wordmark';
import styles from './ostrander.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>
            <Wordmark />
          </span>
          <p>
            A fictional architecture and interiors practice. Every project, drawing, place and figure on this page is
            invented for demonstration.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.footerNav}>
          <ul>
            <li><a href="#work">Project archive</a></li>
            <li><a href="#stages">Design stages</a></li>
            <li><a href="#fees">Indicative fees</a></li>
            <li><a href="#approach">Approach</a></li>
            <li><a href="#brief">Brief builder</a></li>
          </ul>
        </nav>
        <div className={styles.footerNote}>
          <p className={styles.footerMono}>
            Drawing Office 4, Ledger Yard
            <br />
            Ostrander (fictional address)
            <br />
            studio@example.com
          </p>
          <p>
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>. Not a real practice: no enquiries are received
            and no data leaves this page.
          </p>
        </div>
      </div>
    </footer>
  );
}
