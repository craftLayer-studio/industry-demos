import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {HeroArt} from './illustrations';
import styles from './nonprofit.module.css';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={6} className={styles.heroCopy}>
          <Text as="p" color="inherit" className={styles.heroTag}>
            Pantries · Kitchens · Breakfast clubs
          </Text>
          <Heading level={1} id="hero-heading" color="inherit" className={styles.heroTitle}>
            Pull up a chair. <span className={styles.heroAccent}>There&rsquo;s food for everyone.</span>
          </Heading>
          <Text as="p" type="large" color="inherit" textWrap="pretty" className={styles.heroLead}>
            Common Table is a neighbourhood food network in the fictional city of Larkfield: open-shelf pantries,
            shared suppers and school breakfast clubs, run by neighbours for neighbours.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#donate" label="Donate" variant="primary" size="lg" />
            <Button href="#volunteer" label="Volunteer" variant="secondary" size="lg" className={styles.btnOutline} />
          </HStack>
          <Text as="p" type="supporting" color="inherit" className={styles.heroNote}>
            Need food this week? <a href="#get-help">See pantry hours</a>.
          </Text>
        </VStack>
        <HeroArt className={styles.heroArt} />
      </div>
    </section>
  );
}
