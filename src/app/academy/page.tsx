import {ConceptBar} from '@/components/shell/ConceptBar';
import {AcademyHeader} from '@/components/academy/AcademyHeader';
import {Hero} from '@/components/academy/Hero';
import {AcademyProvider} from '@/components/academy/AcademyProvider';
import {Catalogue} from '@/components/academy/Catalogue';
import {LearningPaths} from '@/components/academy/LearningPaths';
import {HowItWorks} from '@/components/academy/HowItWorks';
import {Instructors} from '@/components/academy/Instructors';
import {CohortCalendar} from '@/components/academy/CohortCalendar';
import {Pricing} from '@/components/academy/Pricing';
import {Faqs} from '@/components/academy/Faqs';
import {Enquiry} from '@/components/academy/Enquiry';
import {AcademyFooter} from '@/components/academy/AcademyFooter';
import styles from '@/components/academy/academy.module.css';

export default function AcademyPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Quillmark Academy" slug="academy" />
      <AcademyHeader />
      <AcademyProvider>
        <main id="main" tabIndex={-1} className={styles.main}>
          <Hero />
          <Catalogue />
          <LearningPaths />
          <HowItWorks />
          <Instructors />
          <CohortCalendar />
          <Pricing />
          <Faqs />
          <Enquiry />
        </main>
      </AcademyProvider>
      <AcademyFooter />
    </>
  );
}
