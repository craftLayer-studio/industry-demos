import {ConceptBar} from '@/components/shell/ConceptBar';
import {Faq} from '@/components/automotive/Faq';
import {HowItWorks} from '@/components/automotive/HowItWorks';
import {SiteFooter} from '@/components/automotive/SiteFooter';
import {SiteHeader} from '@/components/automotive/SiteHeader';
import {Workshop} from '@/components/automotive/Workshop';
import styles from '@/components/automotive/torque.module.css';

export default function AutomotivePage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      {/* ConceptBar is itself a labelled <aside> landmark. */}
      <ConceptBar brand="Torque & Co. Motors" slug="automotive" />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Workshop howItWorks={<HowItWorks />} faq={<Faq />} />
      </main>
      <SiteFooter />
    </>
  );
}
