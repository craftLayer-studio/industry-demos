import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Table, TableBody, TableRow, TableCell, TableHeader, TableHeaderCell} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {OfficeMap} from './OfficeMap';
import {office} from './lib/data';
import styles from './ashgrove.module.css';

export function Office() {
  return (
    <SectionShell
      id="office"
      eyebrow="The office"
      title="On Corn Exchange Street, a minute from the square"
      lead="Drop in to talk through a move. The address and town are fictional, so please do not set out to find them.">
      <div className={styles.officeGrid}>
        <Card padding={6} className={styles.officeCard}>
          <VStack gap={6}>
            <VStack gap={2}>
              <Heading level={3} className={styles.formHeading}>
                Ashgrove Property
              </Heading>
              <address className={styles.address}>
                {office.street}
                <br />
                {office.town} (a fictional market town)
              </address>
            </VStack>
            <VStack gap={1}>
              <Text type="label" color="secondary" as="p">
                Email
              </Text>
              <a className={styles.inlineLink} href={`mailto:${office.email}`}>
                {office.email}
              </a>
              <Text type="supporting" color="secondary" as="p">
                A placeholder address on the reserved example.com domain. No one reads it.
              </Text>
            </VStack>
            <VStack gap={2}>
              <Heading level={4} className={styles.smallHeading}>
                Opening hours
              </Heading>
              <Table density="compact" dividers="rows">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Days</TableHeaderCell>
                    <TableHeaderCell>Hours</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {office.hours.map(h => (
                    <TableRow key={h.days}>
                      <TableCell>{h.days}</TableCell>
                      <TableCell>{h.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Text type="supporting" color="secondary" as="p">
                Sample hours for the demo. Viewings are offered on weekdays only.
              </Text>
            </VStack>
          </VStack>
        </Card>
        <figure className={styles.mapFigure}>
          <OfficeMap className={styles.map} />
          <figcaption>Stylised map, not to scale. Wealdbury is fictional.</figcaption>
        </figure>
      </div>
    </SectionShell>
  );
}
