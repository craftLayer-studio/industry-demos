import {ConceptBar} from '@/components/shell/ConceptBar';
import {AshgroveHeader} from '@/components/real-estate/AshgroveHeader';
import {AshgroveFooter} from '@/components/real-estate/AshgroveFooter';
import {EstateProvider} from '@/components/real-estate/EstateProvider';
import {Hero} from '@/components/real-estate/Hero';
import {Listings} from '@/components/real-estate/Listings';
import {Mortgage} from '@/components/real-estate/Mortgage';
import {SellingProcess} from '@/components/real-estate/SellingProcess';
import {AreaGuide} from '@/components/real-estate/AreaGuide';
import {Faqs} from '@/components/real-estate/Faqs';
import {ViewingRequest} from '@/components/real-estate/ViewingRequest';
import {Office} from '@/components/real-estate/Office';
import styles from '@/components/real-estate/ashgrove.module.css';

export default function RealEstatePage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Ashgrove Property" />
      <AshgroveHeader />
      <main id="main" tabIndex={-1}>
        <EstateProvider>
          <Hero />
          <Listings />
          <Mortgage />
          <SellingProcess />
          <AreaGuide />
          <Faqs />
          <ViewingRequest />
          <Office />
        </EstateProvider>
      </main>
      <AshgroveFooter />
    </>
  );
}
