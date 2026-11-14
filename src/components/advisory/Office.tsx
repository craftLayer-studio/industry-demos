import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {OfficeMap} from './OfficeMap';
import {office} from './lib/data';
import styles from './advisory.module.css';

export function Office() {
  return (
    <SectionShell
      id="office"
      tone="stone"
      eyebrow="Office and contact"
      title="Visit, call or write"
      lead="Consultations happen by video or at the office. Every detail below is fictional and for demonstration only.">
      <div className={styles.officeGrid}>
        <VStack gap={8}>
          <address className={styles.address}>
            <dl className={styles.contactList}>
              <div>
                <dt>Address</dt>
                <dd>
                  {office.street}
                  <br />
                  {office.city}
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={office.phoneHref} className={styles.tnum}>
                    {office.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${office.email}`}>{office.email}</a>
                </dd>
              </div>
            </dl>
          </address>
          <VStack gap={3}>
            <Heading level={3} className={styles.areaTitle}>
              Office hours
            </Heading>
            <table className={styles.hoursTable}>
              <caption className={styles.liveRegion}>Office hours (fictional)</caption>
              <tbody>
                {office.hours.map(h => (
                  <tr key={h.days}>
                    <th scope="row">{h.days}</th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Text as="p" type="supporting">
              The phone number and email are placeholders. Nothing is monitored.
            </Text>
          </VStack>
        </VStack>
        <OfficeMap />
      </div>
    </SectionShell>
  );
}
