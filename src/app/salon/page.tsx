import {ConceptBar} from '@/components/shell/ConceptBar';
import {SalonHeader} from '@/components/salon/SalonHeader';
import {Hero} from '@/components/salon/Hero';
import {BookingBridgeProvider} from '@/components/salon/BookingBridge';
import {ServiceMenu} from '@/components/salon/ServiceMenu';
import {Specialists} from '@/components/salon/Specialists';
import {Packages} from '@/components/salon/Packages';
import {GiftCard} from '@/components/salon/GiftCard';
import {FirstVisit} from '@/components/salon/FirstVisit';
import {Booking} from '@/components/salon/Booking';
import {Visit} from '@/components/salon/Visit';
import {Faqs} from '@/components/salon/Faqs';
import {SalonFooter} from '@/components/salon/SalonFooter';
import styles from '@/components/salon/salon.module.css';

export default function SalonPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Fernlight Salon & Spa" />
      <SalonHeader />
      <main id="main" tabIndex={-1}>
        <BookingBridgeProvider>
          <Hero />
          <ServiceMenu />
          <Specialists />
          <Packages />
          <GiftCard />
          <FirstVisit />
          <Booking />
          <Visit />
          <Faqs />
        </BookingBridgeProvider>
      </main>
      <SalonFooter />
    </>
  );
}
