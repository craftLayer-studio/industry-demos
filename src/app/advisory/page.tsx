import {ConceptBar} from '@/components/shell/ConceptBar';
import {AdvisoryHeader} from '@/components/advisory/AdvisoryHeader';
import {Hero} from '@/components/advisory/Hero';
import {PracticeAreas} from '@/components/advisory/PracticeAreas';
import {Audiences} from '@/components/advisory/Audiences';
import {AdvisoryInteractive} from '@/components/advisory/AdvisoryInteractive';
import {Process} from '@/components/advisory/Process';
import {Team} from '@/components/advisory/Team';
import {Insights} from '@/components/advisory/Insights';
import {Faqs} from '@/components/advisory/Faqs';
import {Office} from '@/components/advisory/Office';
import {AdvisoryFooter} from '@/components/advisory/AdvisoryFooter';
import styles from '@/components/advisory/advisory.module.css';

export default function AdvisoryPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Halden & Rowe" slug="advisory" />
      <AdvisoryHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <PracticeAreas />
        <Audiences />
        <AdvisoryInteractive
          after={<Office />}>
          <Process />
          <Team />
          <Insights />
          <Faqs />
        </AdvisoryInteractive>
      </main>
      <AdvisoryFooter />
    </>
  );
}
