'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {MapArt} from './Art';
import {contact, hours} from './data';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className={`${styles.section} ${styles.sectionAlt}`} tabIndex={-1}>
      <VStack gap={8} className={styles.wrap}>
        <SectionIntro index="07" eyebrow="Visit" id="visit-title" title="Find the Works">
          Two blocks from Kiln Street station, with bike racks inside and showers on both floors.
        </SectionIntro>
        <HStack className={styles.visitGrid}>
          <figure className={styles.mapFigure}>
            <MapArt />
          </figure>
          <VStack gap={6} className={styles.visitInfo}>
            <VStack gap={2}>
              <Heading level={3} className={styles.infoTitle}>
                Address
              </Heading>
              <address className={styles.address}>
                {contact.addressLines.map(line => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </VStack>
            <VStack gap={2}>
              <Heading level={3} className={styles.infoTitle}>
                Hours
              </Heading>
              <dl className={styles.hours}>
                {hours.map(h => (
                  <VStack key={h.days} className={styles.hoursRow}>
                    <dt>{h.days}</dt>
                    <dd>{h.open}</dd>
                  </VStack>
                ))}
              </dl>
            </VStack>
            <VStack gap={2} id="contact">
              <Heading level={3} className={styles.infoTitle}>
                Contact
              </Heading>
              <Text as="p" color="secondary">
                Questions before your trial? Call or email the front desk. (Demo details: these go nowhere.)
              </Text>
              <ul className={styles.contactList}>
                <li>
                  <Text type="code" className={styles.contactLabel}>
                    Phone
                  </Text>
                  <Link href={contact.phoneHref} isStandalone>
                    {contact.phoneDisplay}
                  </Link>
                </li>
                <li>
                  <Text type="code" className={styles.contactLabel}>
                    Email
                  </Text>
                  <Link href={`mailto:${contact.email}`} isStandalone>
                    {contact.email}
                  </Link>
                </li>
              </ul>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </section>
  );
}
