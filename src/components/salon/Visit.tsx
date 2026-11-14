import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {MapArt} from './art';
import {ADDRESS, openingHours, WEEKDAY_NAMES} from './lib/data';
import {formatClock} from './lib/format';
import styles from './salon.module.css';

export function Visit() {
  return (
    <SectionShell
      id="visit"
      eyebrow="Hours and location"
      title="Find the studio"
      lead="Fernlight is fictional, and so is its address. The map is an illustration, not a real street."
      tone="petal">
      <div className={styles.visitGrid}>
        <VStack gap={5}>
          <Card padding={6}>
            <VStack gap={4}>
              <Heading level={3} className={styles.cardTitle}>
                Opening hours
              </Heading>
              <Table density="compact" dividers="rows">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Day</TableHeaderCell>
                    <TableHeaderCell>Hours</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {WEEKDAY_NAMES.map((name, i) => {
                    const h = openingHours[i + 1];
                    return (
                      <TableRow key={name}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{h ? `${formatClock(h.open)} to ${formatClock(h.close)}` : 'Closed'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Text type="supporting" as="p">
                Last appointments start early enough to finish by closing time.
              </Text>
            </VStack>
          </Card>
          <Card padding={6}>
            <VStack gap={3}>
              <Heading level={3} className={styles.cardTitle}>
                Address
              </Heading>
              <address className={styles.address}>
                Fernlight Salon &amp; Spa
                <br />
                {ADDRESS.line1}
                <br />
                {ADDRESS.line2}
              </address>
              <Text type="supporting" as="p">
                {ADDRESS.note}. Email (fictional): {ADDRESS.email}
              </Text>
            </VStack>
          </Card>
        </VStack>
        <figure className={styles.mapFigure}>
          <MapArt />
          <figcaption className={styles.mapCaption}>Illustrated map. Linden Row and Marrowfield are invented.</figcaption>
        </figure>
      </div>
    </SectionShell>
  );
}
