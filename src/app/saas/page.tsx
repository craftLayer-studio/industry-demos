import {ConceptBar} from '@/components/shell/ConceptBar';
import {SiteHeader} from '@/components/saas/SiteHeader';
import {Hero} from '@/components/saas/Hero';
import {FeatureTour} from '@/components/saas/FeatureTour';
import {HowItWorks} from '@/components/saas/HowItWorks';
import {SampleDashboard} from '@/components/saas/SampleDashboard';
import {Pricing} from '@/components/saas/Pricing';
import {Integrations} from '@/components/saas/Integrations';
import {Security} from '@/components/saas/Security';
import {Faq} from '@/components/saas/Faq';
import {Waitlist} from '@/components/saas/Waitlist';
import {SiteFooter} from '@/components/saas/SiteFooter';
import styles from '@/components/saas/saas.module.css';

export default function SaasPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Pulsegrid" slug="saas" />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Hero />
        <FeatureTour />
        <HowItWorks />
        <SampleDashboard />
        <Pricing />
        <Integrations />
        <Security />
        <Faq />
        <Waitlist />
      </main>
      <SiteFooter />
    </>
  );
}
