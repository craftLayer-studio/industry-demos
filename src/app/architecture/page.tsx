import {ConceptBar} from '@/components/shell/ConceptBar';
import {Header} from '@/components/architecture/Header';
import {Footer} from '@/components/architecture/Footer';
import {StudioProvider} from '@/components/architecture/StudioProvider';
import {Hero} from '@/components/architecture/Hero';
import {Archive} from '@/components/architecture/Archive';
import {Stages} from '@/components/architecture/Stages';
import {FeeGuide} from '@/components/architecture/FeeGuide';
import {Approach} from '@/components/architecture/Approach';
import {BriefBuilder} from '@/components/architecture/BriefBuilder';
import styles from '@/components/architecture/ostrander.module.css';

export default function ArchitecturePage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Ostrander Studio" slug="architecture" />
      <Header />
      <main id="main" tabIndex={-1}>
        <StudioProvider>
          <Hero />
          <Archive />
          <Stages />
          <FeeGuide />
          <Approach />
          <BriefBuilder />
        </StudioProvider>
      </main>
      <Footer />
    </>
  );
}
