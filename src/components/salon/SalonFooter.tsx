import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import {FernMark} from './art';
import {STUDIO_URL} from '@/lib/paths';
import styles from './salon.module.css';

export function SalonFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <VStack gap={3}>
          <p className={styles.footerBrand}>
            <FernMark /> Fernlight Salon &amp; Spa
          </p>
          <Text as="p" className={styles.footerText}>
            A fictional hair, skin and spa studio. Prices and durations are samples. No appointment, gift card or
            payment is ever processed on this page.
          </Text>
        </VStack>
        <nav aria-label="Footer">
          <ul className={styles.footerLinks}>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#gift-cards">Gift cards</a>
            </li>
            <li>
              <a href="#book">Appointment request</a>
            </li>
            <li>
              <a href="#visit">Hours and location</a>
            </li>
          </ul>
        </nav>
        <VStack gap={2}>
          <Text as="p" className={styles.footerText}>
            Concept demo by{' '}
            <Link href={STUDIO_URL} className={styles.footerStrong}>
              CraftLayer Studio
            </Link>
          </Text>
          <Text as="p" className={styles.footerSmall}>
            Botanical illustrations are original artwork made for this demo.
          </Text>
        </VStack>
      </div>
    </footer>
  );
}
