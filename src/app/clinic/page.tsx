import {ConceptBar} from '@/components/shell/ConceptBar';
import {ClinicHeader} from '@/components/clinic/ClinicHeader';
import {Hero} from '@/components/clinic/Hero';
import {Specialties} from '@/components/clinic/Specialties';
import {Services} from '@/components/clinic/Services';
import {ClinicInteractive} from '@/components/clinic/ClinicInteractive';
import {Hours} from '@/components/clinic/Hours';
import {Location} from '@/components/clinic/Location';
import {Faqs} from '@/components/clinic/Faqs';
import {Contact} from '@/components/clinic/Contact';
import {ClinicFooter} from '@/components/clinic/ClinicFooter';
import styles from '@/components/clinic/clinic.module.css';

export default function ClinicPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Northstar Clinic" />
      <ClinicHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Specialties />
        <Services />
        <ClinicInteractive />
        <Hours />
        <Location />
        <Faqs />
        <Contact />
      </main>
      <ClinicFooter />
    </>
  );
}
