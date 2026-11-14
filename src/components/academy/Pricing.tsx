import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SectionShell} from './SectionShell';
import {courses} from './lib/data';
import {formatPrice, instalment} from './lib/format';
import styles from './academy.module.css';

function range(format: 'live' | 'self-paced') {
  const prices = courses.filter(c => c.format === format).map(c => c.price);
  return [Math.min(...prices), Math.max(...prices)] as const;
}

export function Pricing() {
  const [selfMin, selfMax] = range('self-paced');
  const [liveMin, liveMax] = range('live');
  const plans = [
    {
      name: 'Self-paced course',
      price: `${formatPrice(selfMin)} to ${formatPrice(selfMax)}`,
      note: 'per course, sample prices',
      points: ['Start any day', 'Recorded lessons and exercises', 'Written feedback on set checkpoints', 'Access for 12 months'],
    },
    {
      name: 'Live cohort',
      price: `${formatPrice(liveMin)} to ${formatPrice(liveMax)}`,
      note: 'per course, sample prices',
      points: ['Weekly live sessions, recorded', 'Instructor feedback every week', 'Small-group critique', 'One free move to a later cohort'],
      featured: true,
    },
    {
      name: 'Learning path',
      price: '10% off',
      note: 'sample discount when three path courses are booked together',
      points: ['Three courses in a set order', 'One enquiry, one plan', 'Pause between courses', 'Same feedback rhythm throughout'],
    },
  ];

  return (
    <SectionShell
      id="pricing"
      eyebrow="Pricing and financial information"
      title="Sample prices, shown plainly"
      lead="Quillmark Academy is a concept demo, so these numbers are illustrations of how pricing could be presented. Nothing can be bought here.">
      <VStack gap={6}>
        <ul className={styles.priceGrid}>
          {plans.map(p => (
            <li key={p.name} className={`${styles.priceCard} ${p.featured ? styles.priceFeatured : ''}`}>
              <VStack gap={4}>
                <Heading level={3} className={styles.priceName}>
                  {p.name}
                </Heading>
                <VStack gap={1}>
                  <Text className={styles.priceFigure}>{p.price}</Text>
                  <Text type="supporting" color="secondary">
                    {p.note}
                  </Text>
                </VStack>
                <ul className={styles.checkList}>
                  {p.points.map(pt => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </VStack>
            </li>
          ))}
        </ul>
        <div className={styles.financeNote}>
          <VStack gap={3}>
            <Heading level={3} className={styles.financeTitle}>
              Paying over time (sample policy)
            </Heading>
            <Text as="p" color="secondary" textWrap="pretty">
              Any course could be split into three equal monthly payments with no added fee. For example, a{' '}
              {formatPrice(890)} live cohort would be three payments of {formatPrice(instalment(890))}. In this sample
              policy, a full refund is available until the end of the first week, and a limited number of
              fee-assistance places are offered each cycle.
            </Text>
          </VStack>
          <Button href="#enquire" label="Ask about payment options" variant="secondary" />
        </div>
      </VStack>
    </SectionShell>
  );
}
