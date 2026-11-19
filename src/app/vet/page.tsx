import {ConceptBar} from '@/components/shell/ConceptBar';
import {VetHeader} from '@/components/vet/VetHeader';
import {Hero} from '@/components/vet/Hero';
import {Services} from '@/components/vet/Services';
import {PlanCalculator} from '@/components/vet/PlanCalculator';
import {Hours} from '@/components/vet/Hours';
import {Emergency} from '@/components/vet/Emergency';
import {Team} from '@/components/vet/Team';
import {Faqs} from '@/components/vet/Faqs';
import {AppointmentForm} from '@/components/vet/AppointmentForm';
import {VetFooter} from '@/components/vet/VetFooter';
import styles from '@/components/vet/vet.module.css';

export default function VetPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Meadowlark Vets" slug="vet" />
      <VetHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <PlanCalculator />
        <Hours />
        <Emergency />
        <Team />
        <Faqs />
        <AppointmentForm />
      </main>
      <VetFooter />
    </>
  );
}
