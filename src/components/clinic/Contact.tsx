import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import {Banner} from '@astryxdesign/core/Banner';
import {SectionShell} from './SectionShell';
import {contact} from './lib/data';
import {MailIcon, PhoneIcon, PinIcon} from './icons';
import styles from './clinic.module.css';

export function Contact() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      lead="Every contact detail here is a placeholder. The phone number uses the fictional 555 range and the email uses the reserved example.com domain."
      tinted>
      <VStack gap={6}>
        <Grid columns={{minWidth: 240, max: 3}} gap={4}>
          <Card padding={6} className={styles.fullHeight}>
            <HStack gap={3} vAlign="start">
              <span className={styles.iconTile}>
                <PhoneIcon />
              </span>
              <VStack gap={1}>
                <Heading level={3}>Phone</Heading>
                <Link href={contact.phoneHref}>{contact.phoneDisplay}</Link>
                <Text type="supporting">Fictional number</Text>
              </VStack>
            </HStack>
          </Card>
          <Card padding={6} className={styles.fullHeight}>
            <HStack gap={3} vAlign="start">
              <span className={styles.iconTile}>
                <MailIcon />
              </span>
              <VStack gap={1}>
                <Heading level={3}>Email</Heading>
                <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                <Text type="supporting">Placeholder address</Text>
              </VStack>
            </HStack>
          </Card>
          <Card padding={6} className={styles.fullHeight}>
            <HStack gap={3} vAlign="start">
              <span className={styles.iconTile}>
                <PinIcon />
              </span>
              <VStack gap={1}>
                <Heading level={3}>Visit</Heading>
                <Text>{contact.addressLines.join(', ')}</Text>
                <Text type="supporting">Invented address</Text>
              </VStack>
            </HStack>
          </Card>
        </Grid>
        <Banner
          status="warning"
          title="Not a real clinic"
          description="Do not enter real medical or personal information. In an emergency, contact your local emergency number."
        />
      </VStack>
    </SectionShell>
  );
}
