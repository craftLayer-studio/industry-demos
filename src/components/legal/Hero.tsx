import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {HeroArt} from './HeroArt';
import styles from './legal.module.css';

const promises = ['Fixed fees, agreed in writing', 'One named solicitor', 'Plain-English updates'];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={6} className={styles.heroCopy}>
          <Text as="p" className={styles.eyebrow}>
            Solicitors · A fictional practice
          </Text>
          <Heading level={1} id="hero-heading" textWrap="balance" className={styles.heroTitle}>
            Clear counsel for the moments that <em>matter</em>.
          </Heading>
          <Text as="p" type="large" color="secondary" textWrap="pretty" className={styles.lead}>
            Marlowe &amp; Pike is an imagined high-street firm helping people and small businesses with property,
            family, wills and probate, employment and business matters, with fees agreed before work begins.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#enquiry" label="Make a confidential enquiry" variant="primary" size="lg" />
            <Button href="#conveyancing" label="Estimate a conveyancing fee" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.promises} role="list">
            {promises.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </VStack>
        <div className={styles.heroArtWrap}>
          <HeroArt />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.notice}>
          <strong>Not legal advice.</strong> Marlowe &amp; Pike is a fictional firm in a design concept. Nothing on this
          page is legal advice, and no solicitor–client relationship can be formed here.
        </p>
      </div>
    </section>
  );
}
