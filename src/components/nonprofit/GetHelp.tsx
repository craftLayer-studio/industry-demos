import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {SectionShell} from './SectionShell';
import {MapArt} from './illustrations';
import {PANTRIES} from './lib/content';
import styles from './nonprofit.module.css';

export function GetHelp() {
  return (
    <SectionShell
      id="get-help"
      tone="forest"
      eyebrow="Get help"
      title="Walk in, no forms at the door"
      lead="In this concept anyone can visit a pantry or kitchen without a referral. The places, addresses and hours below are fictional and cannot be visited.">
      <div className={styles.helpGrid}>
        <figure className={styles.mapFigure}>
          <MapArt className={styles.mapArt} />
          <figcaption>Stylised map of fictional Larkfield. Numbers match the list.</figcaption>
        </figure>
        <ol className={styles.pantryList}>
          {PANTRIES.map((p, i) => (
            <li key={p.id} className={styles.pantryCard}>
              <span className={styles.pantryNum} aria-hidden="true">
                {i + 1}
              </span>
              <VStack gap={2}>
                <Heading level={3} className={styles.smallTitle}>
                  {p.name}
                </Heading>
                <Text as="p" color="secondary">
                  {p.address} <Badge label="Fictional" variant="warning" />
                </Text>
                <dl className={styles.hours}>
                  {p.hours.map(h => (
                    <div key={h.days}>
                      <dt>{h.days}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <Text as="p" type="supporting" color="secondary">
                  {p.notes}
                </Text>
              </VStack>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
