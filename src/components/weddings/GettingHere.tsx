import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {RouteMap} from './art';
import {travel} from './lib/data';
import styles from './hollin.module.css';

export function GettingHere() {
  return (
    <SectionShell
      id="getting-here"
      eyebrow="Getting here"
      title="Tucked away, easy to find"
      lead="Hollin Barn sits at the end of a quiet lane above a fictional river valley. Every place named here is invented.">
      <div className={styles.travelGrid}>
        <figure className={styles.mapFigure}>
          <RouteMap className={styles.map} />
          <figcaption>
            Sketch map (not to scale, fictional): Hollin Lane leaves the B-road from Wendlebury and climbs to the barn,
            south-east of Ashby Halt station.
          </figcaption>
        </figure>
        <Card padding={6} className={styles.travelCard}>
          <dl className={styles.travelList}>
            {travel.map(t => (
              <div key={t.mode}>
                <dt>
                  <Heading level={3} className={styles.travelMode}>
                    {t.mode}
                  </Heading>
                </dt>
                <dd>
                  <Text as="p" color="secondary" textWrap="pretty">
                    {t.detail}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
          <p className={styles.address}>
            Hollin Barn, Hollin Lane, Wendlebury <span>(fictional address)</span>
          </p>
        </Card>
      </div>
    </SectionShell>
  );
}
