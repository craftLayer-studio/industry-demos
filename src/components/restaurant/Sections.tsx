import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {STUDIO_URL} from '@/lib/paths';
import {CakeArt, EmbersArt, GreensArt, HeroArt, SpritzArt, TableArt} from './art';
import {FlameIcon, LeafIcon, MailIcon, PhoneIcon, PinIcon, TableIcon} from './icons';
import {hoursSummary} from './lib/hours';
import {MapArt} from './MapArt';
import styles from './restaurant.module.css';

export const CONTACT = {
  street: '18 Alder Row',
  area: 'Fernhill, Riverside 00018',
  phone: '(555) 014-2290',
  phoneHref: 'tel:+15550142290',
  email: 'hello@example.com',
};

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" id="top">
      <VStack className={styles.heroCopy} gap={5}>
        <Text type="label" className={styles.eyebrow}>
          Seasonal kitchen &amp; wine room · Fernhill
        </Text>
        <Heading level={1} id="hero-title" className={styles.heroTitle}>
          Juniper <em>Kitchen</em>
        </Heading>
        <Text as="p" type="large" className={styles.lede}>
          Wood-fired plates from the morning market, a long table under green lamps, and a wine list poured slowly.
          Dinner Tuesday to Sunday, brunch on Sunday mornings.
        </Text>
        <HStack gap={3} wrap="wrap">
          <Button href="#reserve" variant="primary" size="lg" label="Reserve a table" />
          <Button href="#menu" variant="secondary" size="lg" label="Order for pickup" />
        </HStack>
        <ul className={styles.heroFacts} aria-label="At a glance">
          <li>Dinner from 5 pm</li>
          <li>Sunday brunch 11 am – 3 pm</li>
          <li>Closed Mondays</li>
        </ul>
      </VStack>
      <figure className={styles.heroArt}>
        <HeroArt label="Illustration: a plate of charred leeks, greens, lemon and juniper berries on a terracotta napkin." />
      </figure>
    </section>
  );
}

const PILLARS = [
  {
    icon: FlameIcon,
    title: 'Fire',
    body: 'One oak-fed hearth does most of the cooking: slow embers for lamb, a quick blaze for leeks and bread.',
  },
  {
    icon: LeafIcon,
    title: 'Field',
    body: 'The menu is written around what arrives that morning, so dishes change as the seasons turn.',
  },
  {
    icon: TableIcon,
    title: 'Table',
    body: 'Thirty-two seats, one long communal table and a counter facing the kitchen. Come as you are.',
  },
];

export function Story() {
  return (
    <section className={styles.story} id="story" aria-labelledby="story-title">
      <VStack className={styles.container} gap={8}>
        <VStack className={styles.storyIntro} gap={4}>
          <Text type="label" className={styles.eyebrowLight}>
            Our story
          </Text>
          <Heading level={2} id="story-title" className={styles.storyTitle}>
            A neighbourhood kitchen that cooks by the seasons, and by the fire.
          </Heading>
          <Text as="p" type="large" className={styles.storyText}>
            Juniper Kitchen is an imagined restaurant on a quiet corner of Fernhill. The idea is simple: a small menu
            that changes often, cooked over wood, served on mismatched plates with good bread and better company. We
            named it after the berry we use to cure fish, brine chicken and finish our house spritz.
          </Text>
        </VStack>
        <ul className={styles.pillars}>
          {PILLARS.map((pillar) => (
            <li key={pillar.title} className={styles.pillar}>
              <pillar.icon className={styles.pillarIcon} />
              <Heading level={3} className={styles.pillarTitle}>
                {pillar.title}
              </Heading>
              <Text as="p" className={styles.pillarText}>
                {pillar.body}
              </Text>
            </li>
          ))}
        </ul>
      </VStack>
    </section>
  );
}

const GALLERY = [
  {Art: TableArt, label: 'Illustration: a long dining table under three green pendant lamps, set with plates and candles.', caption: 'The long table', wide: true},
  {Art: EmbersArt, label: 'Illustration: flames and oak logs in an arched wood-fired hearth.', caption: 'Oak embers'},
  {Art: CakeArt, label: 'Illustration: a slice of olive oil cake with poached pear, crème fraîche and honeycomb.', caption: 'Olive oil cake'},
  {Art: SpritzArt, label: 'Illustration: a juniper spritz in a coupe glass with a citrus wheel and a sprig.', caption: 'Spritz hour'},
  {Art: GreensArt, label: 'Illustration: a bowl of garden greens and radishes seen from above.', caption: 'Garden greens'},
];

export function Gallery() {
  return (
    <section className={styles.gallerySection} aria-labelledby="gallery-title">
      <VStack className={styles.container} gap={6}>
        <VStack gap={2}>
          <Text type="label" className={styles.eyebrow}>
            Gallery
          </Text>
          <Heading level={2} id="gallery-title" className={styles.sectionTitle}>
            From the dining room
          </Heading>
          <Text as="p" color="secondary" className={styles.sectionLede}>
            Original illustrations drawn for this concept. Juniper Kitchen is fictional, so there is no real room to
            photograph.
          </Text>
        </VStack>
        <ul className={styles.gallery}>
          {GALLERY.map(({Art, label, caption, wide}) => (
            <li key={caption} className={wide ? styles.galleryWide : styles.galleryItem}>
              <figure className={styles.galleryFigure}>
                <Art label={label} className={styles.galleryArt} />
                <figcaption className={styles.galleryCaption}>{caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </VStack>
    </section>
  );
}

export function Visit() {
  const rows = hoursSummary();
  return (
    <section className={styles.visit} id="visit" aria-labelledby="visit-title">
      <VStack className={styles.container} gap={6}>
        <VStack gap={2}>
          <Text type="label" className={styles.eyebrow}>
            Visit
          </Text>
          <Heading level={2} id="visit-title" className={styles.sectionTitle}>
            Hours &amp; location
          </Heading>
        </VStack>
        <section className={styles.visitGrid} aria-label="Opening hours and contact details">
          <VStack gap={6} className={styles.visitInfo}>
            <VStack gap={3}>
              <Heading level={3} className={styles.smallTitle}>
                Opening hours
              </Heading>
              <dl className={styles.hours}>
                {rows.map((row) => (
                  <div key={row.days} className={styles.hoursRow}>
                    <dt>{row.days}</dt>
                    <dd>{row.hours}</dd>
                  </div>
                ))}
              </dl>
              <Text type="supporting">Kitchen pickup runs from 30 minutes after opening until 30 minutes before close.</Text>
            </VStack>
            <VStack gap={3}>
              <Heading level={3} className={styles.smallTitle}>
                Find us
              </Heading>
              <address className={styles.address}>
                <HStack gap={2} align="start">
                  <PinIcon className={styles.contactIcon} />
                  <Text>
                    {CONTACT.street}
                    <br />
                    {CONTACT.area}
                  </Text>
                </HStack>
                <HStack gap={2} align="center">
                  <PhoneIcon className={styles.contactIcon} />
                  <Link href={CONTACT.phoneHref}>{CONTACT.phone}</Link>
                </HStack>
                <HStack gap={2} align="center">
                  <MailIcon className={styles.contactIcon} />
                  <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>
                </HStack>
              </address>
              <Text type="supporting">Fictional address, phone and email for this concept demo.</Text>
            </VStack>
          </VStack>
          <figure className={styles.mapFigure}>
            <MapArt label="Stylised map: Juniper Kitchen sits on Alder Row, one block from Fernhill Park and the river, near the tram stop." />
            <figcaption className={styles.galleryCaption}>Stylised map, not to scale.</figcaption>
          </figure>
        </section>
      </VStack>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <VStack className={styles.container} gap={6}>
        <HStack justify="between" align="end" wrap="wrap" gap={6}>
          <VStack gap={2}>
            <Text className={styles.footerMark}>
              Juniper <em>Kitchen</em>
            </Text>
            <Text className={styles.footerText}>
              {CONTACT.street}, {CONTACT.area} · {CONTACT.phone}
            </Text>
          </VStack>
          <nav aria-label="Footer">
            <ul className={styles.footerNav}>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#reserve">Reservations</a></li>
              <li><a href="#visit">Hours</a></li>
            </ul>
          </nav>
        </HStack>
        <hr className={styles.footerRule} />
        <HStack justify="between" wrap="wrap" gap={3}>
          <Text className={styles.footerText}>
            Concept demo by{' '}
            <a className={styles.footerLink} href={STUDIO_URL}>
              CraftLayer Studio
            </a>
            . Juniper Kitchen is fictional; no orders, payments or bookings are processed.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
