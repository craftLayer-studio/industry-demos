import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {QuillMark} from './icons';
import styles from './academy.module.css';

const navItems = [
  {href: '#courses', label: 'Courses'},
  {href: '#paths', label: 'Paths'},
  {href: '#how', label: 'How it works'},
  {href: '#instructors', label: 'Instructors'},
  {href: '#cohorts', label: 'Cohorts'},
  {href: '#pricing', label: 'Pricing'},
  {href: '#faq', label: 'FAQ'},
];

export function AcademyHeader() {
  return (
    <header className={styles.header}>
      <HStack gap={4} vAlign="center" justify="between" className={`${styles.container} ${styles.headerInner}`}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandMark}>
            <QuillMark />
          </span>
          <span>
            Quillmark <span className={styles.brandSub}>Academy</span>
          </span>
        </a>
        <nav aria-label="Quillmark Academy sections" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} color="primary" weight="medium">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#enquire" label="Request enrolment info" variant="primary" className={styles.hideSm} />
        <Button href="#enquire" label="Enquire" variant="primary" className={styles.showSm} />
      </HStack>
    </header>
  );
}
