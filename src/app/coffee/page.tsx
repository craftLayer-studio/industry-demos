import {ConceptBar} from '@/components/shell/ConceptBar';
import {BrewGuides} from '@/components/coffee/BrewGuides';
import {CartDrawer} from '@/components/coffee/CartDrawer';
import {Faq} from '@/components/coffee/Faq';
import {Hero} from '@/components/coffee/Hero';
import {ProductDialog} from '@/components/coffee/ProductDialog';
import {Shop} from '@/components/coffee/Shop';
import {ShopProvider} from '@/components/coffee/ShopContext';
import {SiteFooter} from '@/components/coffee/SiteFooter';
import {SiteHeader} from '@/components/coffee/SiteHeader';
import {Subscription} from '@/components/coffee/Subscription';
import {Wholesale} from '@/components/coffee/Wholesale';
import styles from '@/components/coffee/coffee.module.css';

export default function CoffeePage() {
  return (
    <ShopProvider>
      {/* ConceptBar is itself a labelled <aside> landmark. */}
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>
      <ConceptBar brand="Brightwater Coffee" />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Hero />
        <Shop />
        <Subscription />
        <BrewGuides />
        <Wholesale />
        <Faq />
      </main>
      <SiteFooter />
      <ProductDialog />
      <CartDrawer />
    </ShopProvider>
  );
}
