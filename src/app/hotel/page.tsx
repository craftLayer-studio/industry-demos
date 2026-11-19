import {ConceptBar} from '@/components/shell/ConceptBar';
import {Header} from '@/components/hotel/Header';
import {Footer} from '@/components/hotel/Footer';
import {StayProvider} from '@/components/hotel/StayProvider';
import {Hero} from '@/components/hotel/Hero';
import {Rooms} from '@/components/hotel/Rooms';
import {RateCalculator} from '@/components/hotel/RateCalculator';
import {DiningSpa} from '@/components/hotel/DiningSpa';
import {AreaGuide} from '@/components/hotel/AreaGuide';
import {Faqs} from '@/components/hotel/Faqs';
import {BookingRequest} from '@/components/hotel/BookingRequest';
import styles from '@/components/hotel/saltmarsh.module.css';

export default function HotelPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="The Saltmarsh" slug="hotel" />
      <Header />
      <main id="main" tabIndex={-1}>
        <StayProvider>
          <Hero />
          <Rooms />
          <RateCalculator />
          <DiningSpa />
          <AreaGuide />
          <Faqs />
          <BookingRequest />
        </StayProvider>
      </main>
      <Footer />
    </>
  );
}
