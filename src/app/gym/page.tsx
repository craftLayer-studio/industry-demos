import {ConceptBar} from '@/components/shell/ConceptBar';
import {Coaches} from '@/components/gym/Coaches';
import {Gallery} from '@/components/gym/Gallery';
import {GymStateProvider} from '@/components/gym/GymState';
import {Hero} from '@/components/gym/Hero';
import {Membership} from '@/components/gym/Membership';
import {Programmes} from '@/components/gym/Programmes';
import {Schedule} from '@/components/gym/Schedule';
import {SiteFooter} from '@/components/gym/SiteFooter';
import {SiteHeader} from '@/components/gym/SiteHeader';
import {SkipLink} from '@/components/gym/SkipLink';
import {TrialBooking} from '@/components/gym/TrialBooking';
import {Visit} from '@/components/gym/Visit';

export default function GymPage() {
  return (
    <GymStateProvider>
      <SkipLink />
      <ConceptBar brand="Forge Fitness" slug="gym" />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Programmes />
        <Coaches />
        <Membership />
        <Schedule />
        <TrialBooking />
        <Gallery />
        <Visit />
      </main>
      <SiteFooter />
    </GymStateProvider>
  );
}
