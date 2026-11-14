import {ConceptBar} from '@/components/shell/ConceptBar';
import {Header} from '@/components/nonprofit/Header';
import {Hero} from '@/components/nonprofit/Hero';
import {Programmes} from '@/components/nonprofit/Programmes';
import {GiftUse} from '@/components/nonprofit/GiftUse';
import {Donate} from '@/components/nonprofit/Donate';
import {Volunteer} from '@/components/nonprofit/Volunteer';
import {Events} from '@/components/nonprofit/Events';
import {GetHelp} from '@/components/nonprofit/GetHelp';
import {Faqs} from '@/components/nonprofit/Faqs';
import {Newsletter} from '@/components/nonprofit/Newsletter';
import {Footer} from '@/components/nonprofit/Footer';
import styles from '@/components/nonprofit/nonprofit.module.css';

export default function NonprofitPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Common Table" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Programmes />
        <GiftUse />
        <Donate />
        <Volunteer />
        <Events />
        <GetHelp />
        <Faqs />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
