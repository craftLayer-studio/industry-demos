import {ConceptBar} from '@/components/shell/ConceptBar';
import {DentalHeader} from '@/components/dental/DentalHeader';
import {Hero} from '@/components/dental/Hero';
import {DentalInteractive} from '@/components/dental/DentalInteractive';
import {Journey} from '@/components/dental/Journey';
import {Team} from '@/components/dental/Team';
import {Faqs} from '@/components/dental/Faqs';
import {Consultation} from '@/components/dental/Consultation';
import {DentalFooter} from '@/components/dental/DentalFooter';
import styles from '@/components/dental/dental.module.css';

export default function DentalPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Arbour Dental" slug="dental" />
      <DentalHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <DentalInteractive />
        <Journey />
        <Team />
        <Faqs />
        <Consultation />
      </main>
      <DentalFooter />
    </>
  );
}
