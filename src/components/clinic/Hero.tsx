'use client';

import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Grid} from '@astryxdesign/core/Grid';
import {Icon} from '@astryxdesign/core/Icon';
import {HeroArt} from './HeroArt';
import {ArrowRightIcon, ClockIcon, NorthstarMark, PinIcon, ShieldIcon} from './icons';
import styles from './clinic.module.css';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className={styles.hero} id="top">
      <Grid columns={{minWidth: 440, max: 2}} gap={10} align="center" className={styles.container}>
        <VStack gap={6}>
          <span className={styles.eyebrow}>
            <NorthstarMark width={16} height={16} />
            Fictional clinic · concept demo
          </span>
          <Heading level={1} id="hero-heading" className={styles.heroTitle} textWrap="balance">
            Calm, joined‑up care for every stage of life
          </Heading>
          <Text type="large" color="secondary" as="p" textWrap="pretty">
            Northstar is an imagined neighbourhood clinic bringing family medicine, paediatrics and four specialist
            teams under one roof. Explore the clinicians, then try the appointment request flow. Nothing you enter
            leaves your browser.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button
              href="#book"
              label="Request an appointment"
              variant="primary"
              size="lg"
              endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
            />
            <Button href="#clinicians" label="Meet the clinicians" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.factList}>
            <li>
              <ClockIcon />
              <Text>Weekdays 8:00 – 18:00</Text>
            </li>
            <li>
              <PinIcon />
              <Text>48 Harbour Lane (fictional)</Text>
            </li>
            <li>
              <ShieldIcon />
              <Text>No data is sent or stored</Text>
            </li>
          </ul>
        </VStack>
        <HeroArt />
      </Grid>
    </section>
  );
}
