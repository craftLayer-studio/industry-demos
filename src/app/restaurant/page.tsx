import {ConceptBar} from '@/components/shell/ConceptBar';
import {CartDrawer} from '@/components/restaurant/CartDrawer';
import {CartProvider} from '@/components/restaurant/CartContext';
import {MenuSection} from '@/components/restaurant/MenuSection';
import {Reservation} from '@/components/restaurant/Reservation';
import {Gallery, Hero, SiteFooter, Story, Visit} from '@/components/restaurant/Sections';
import {SiteHeader} from '@/components/restaurant/SiteHeader';

export default function RestaurantPage() {
  return (
    <>
      <ConceptBar brand="Juniper Kitchen" />
      <CartProvider>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Story />
          <MenuSection />
          <Reservation />
          <Gallery />
          <Visit />
        </main>
        <SiteFooter />
        <CartDrawer />
      </CartProvider>
    </>
  );
}
