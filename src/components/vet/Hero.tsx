import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Grid} from '@astryxdesign/core/Grid';
import {HeroArt} from './HeroArt';
import styles from './vet.module.css';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className={styles.hero} id="top">
      <Grid columns={{minWidth: 400, max: 2}} gap={10} align="center" className={styles.container}>
        <VStack gap={6}>
          <span className={styles.eyebrow}>Fictional vet practice · concept demo</span>
          <Heading level={1} id="hero-heading" className={styles.heroTitle} textWrap="balance">
            Friendly care for <em>paws, whiskers</em> and little noses
          </Heading>
          <Text type="large" color="secondary" as="p" textWrap="pretty">
            Meadowlark Vets is an imagined neighbourhood practice for dogs, cats, rabbits and small pets. Browse
            services by pet, build a sample health plan and try the appointment request. Nothing you enter leaves
            your browser.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#appointment" label="Request an appointment" variant="primary" size="lg" />
            <Button href="#plans" label="Build a health plan" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.factList} aria-label="At a glance">
            <li>
              <span className={styles.dot} aria-hidden="true" />
              <Text>Dogs, cats, rabbits and small pets</Text>
            </li>
            <li>
              <span className={styles.dot} aria-hidden="true" />
              <Text>Open six days (fictional hours)</Text>
            </li>
            <li>
              <span className={styles.dot} aria-hidden="true" />
              <Text>No data is sent or stored</Text>
            </li>
          </ul>
        </VStack>
        <HeroArt />
      </Grid>
    </section>
  );
}
