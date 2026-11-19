import {ConceptBar} from '@/components/shell/ConceptBar';
import {Estimator} from '@/components/builders/Estimator';
import {Faq} from '@/components/builders/Faq';
import {Guarantees} from '@/components/builders/Guarantees';
import {Hero} from '@/components/builders/Hero';
import {Process} from '@/components/builders/Process';
import {Projects} from '@/components/builders/Projects';
import {Services} from '@/components/builders/Services';
import {SiteFooter} from '@/components/builders/SiteFooter';
import {SiteHeader} from '@/components/builders/SiteHeader';
import {Survey} from '@/components/builders/Survey';
import styles from '@/components/builders/keystone.module.css';

export default function BuildersPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      {/* ConceptBar is itself a labelled <aside> landmark. */}
      <ConceptBar brand="Keystone Build Co." slug="builders" />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Hero />
        <Services />
        <Estimator />
        <Process />
        <Projects />
        <Guarantees />
        <Faq />
        <Survey />
      </main>
      <SiteFooter />
    </>
  );
}
