import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {QuillMark} from './icons';
import {CONTACT_EMAIL} from './lib/data';
import styles from './academy.module.css';

export function AcademyFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <VStack gap={3}>
          <span className={styles.footerBrand}>
            <span className={styles.brandMark}>
              <QuillMark />
            </span>
            Quillmark Academy
          </span>
          <Text as="p" color="secondary" textWrap="pretty" className={styles.footerText}>
            A fictional online academy. Courses, instructors, dates and prices on this page are sample content. No
            enrolments, payments or messages are processed.
          </Text>
        </VStack>
        <nav aria-label="Footer">
          <ul className={styles.footerLinks}>
            <li>
              <a href="#courses">Course catalogue</a>
            </li>
            <li>
              <a href="#cohorts">Upcoming cohorts</a>
            </li>
            <li>
              <a href="#enquire">Enrolment enquiry</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`${styles.container} ${styles.footerBase}`}>
        <Text type="supporting" color="secondary">
          <a href={STUDIO_URL}>Concept demo by CraftLayer Studio</a>
        </Text>
      </div>
    </footer>
  );
}
