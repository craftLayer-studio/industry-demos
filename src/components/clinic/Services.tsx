import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {services} from './lib/data';
import {CheckCircleIcon} from './icons';
import styles from './clinic.module.css';

export function Services() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="Practical help around every visit"
      lead="How the imagined Northstar team would make appointments easier to fit into everyday life."
      tinted>
      <Grid columns={{minWidth: 300, max: 3}} columnGap={8} rowGap={6}>
        {services.map(item => (
          <HStack key={item.title} gap={3} vAlign="start">
            <CheckCircleIcon className={styles.iconInline} />
            <VStack gap={1}>
              <Heading level={3}>{item.title}</Heading>
              <Text as="p" color="secondary">
                {item.text}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Grid>
    </SectionShell>
  );
}
