import {ConceptBar} from '@/components/shell/ConceptBar';
import {LegalHeader} from '@/components/legal/LegalHeader';
import {Hero} from '@/components/legal/Hero';
import {LegalInteractive} from '@/components/legal/LegalInteractive';
import {Process} from '@/components/legal/Process';
import {Solicitors} from '@/components/legal/Solicitors';
import {Faqs} from '@/components/legal/Faqs';
import {LegalFooter} from '@/components/legal/LegalFooter';
import styles from '@/components/legal/legal.module.css';

export default function LegalPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Marlowe & Pike" slug="legal" />
      <LegalHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <LegalInteractive>
          <Process />
          <Solicitors />
          <Faqs />
        </LegalInteractive>
      </main>
      <LegalFooter />
    </>
  );
}
