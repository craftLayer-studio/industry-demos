import {ConceptBar} from '@/components/shell/ConceptBar';
import {Header} from '@/components/weddings/Header';
import {Footer} from '@/components/weddings/Footer';
import {Hero} from '@/components/weddings/Hero';
import {Spaces} from '@/components/weddings/Spaces';
import {Planner} from '@/components/weddings/Planner';
import {Included} from '@/components/weddings/Included';
import {GettingHere} from '@/components/weddings/GettingHere';
import {Faqs} from '@/components/weddings/Faqs';
import {ViewingRequest} from '@/components/weddings/ViewingRequest';
import styles from '@/components/weddings/hollin.module.css';

export default function WeddingsPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Hollin Barn" slug="weddings" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Spaces />
        <Planner />
        <Included />
        <GettingHere />
        <Faqs />
        <ViewingRequest />
      </main>
      <Footer />
    </>
  );
}
