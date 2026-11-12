import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {MapIllustration} from './MapIllustration';
import {contact} from './lib/data';
import {PinIcon} from './icons';
import styles from './clinic.module.css';

const directions = [
  {title: 'By tram', text: 'Line 4 to the Harbour Lane stop, then a two-minute walk south.'},
  {title: 'By bike', text: 'Covered bike racks beside the main entrance.'},
  {title: 'By car', text: 'Drop-off bay at the door; short-stay parking on Park Row.'},
];

export function Location() {
  return (
    <SectionShell
      id="location"
      eyebrow="Location"
      title="Find us by the park"
      lead="The address, streets and transport lines below are invented for this concept demo."
      tinted>
      <Grid columns={{minWidth: 320, max: 2}} gap={8} align="center">
        <MapIllustration />
        <VStack gap={6}>
          <HStack gap={3} vAlign="start">
            <PinIcon className={styles.iconInline} />
            <VStack gap={1}>
              <Heading level={3}>Northstar Clinic (fictional)</Heading>
              <address className={styles.address}>
                <Text as="p" color="secondary">
                  {contact.addressLines[0]}
                  <br />
                  {contact.addressLines[1]}
                </Text>
              </address>
            </VStack>
          </HStack>
          <VStack gap={4} as="ul" className={styles.plainList}>
            {directions.map(d => (
              <VStack gap={1} as="li" key={d.title}>
                <Text weight="semibold">{d.title}</Text>
                <Text color="secondary">{d.text}</Text>
              </VStack>
            ))}
          </VStack>
          <Text type="supporting" as="p">
            Step-free entrance, lift to every floor and accessible toilets on each level.
          </Text>
        </VStack>
      </Grid>
    </SectionShell>
  );
}
