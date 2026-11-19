'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {SectionShell} from './SectionShell';
import {PetPortrait} from './illustrations';
import {petLabel, petTypes, type PetType} from './lib/data';
import {addOnsFor, ageBands, calculatePlan, formatPence, type AddOnId, type AgeBand} from './lib/plan';
import styles from './vet.module.css';

export function PlanCalculator() {
  const [pet, setPet] = useState<PetType>('dog');
  const [age, setAge] = useState<AgeBand>('adult');
  const [chosen, setChosen] = useState<AddOnId[]>(['dental']);

  const available = addOnsFor(pet);
  const activeAddOns = chosen.filter(id => available.some(a => a.id === id));
  const quote = calculatePlan({pet, age, addOns: activeAddOns});
  const band = ageBands.find(b => b.id === age)!;

  return (
    <SectionShell
      id="plans"
      eyebrow="Pet health plans"
      title="Build a plan in three taps"
      lead="Choose your pet, their age and any extras to see a sample monthly price. All prices are illustrative for a fictional practice, not a quote."
      tone="green">
      <section className={styles.planGrid} aria-label="Health plan calculator">
        <Card padding={6}>
          <VStack gap={6}>
            <RadioList
              label="Type of pet"
              value={pet}
              onChange={v => setPet(v as PetType)}>
              {petTypes.map(p => (
                <RadioListItem key={p.id} value={p.id} label={p.label} />
              ))}
            </RadioList>
            <VStack gap={2}>
              <Text type="label" weight="semibold" as="p">
                Age band
              </Text>
              <HStack className={styles.filterBar}>
                <SegmentedControl label="Age band" value={age} onChange={v => setAge(v as AgeBand)}>
                  {ageBands.map(b => (
                    <SegmentedControlItem key={b.id} value={b.id} label={b.label} />
                  ))}
                </SegmentedControl>
              </HStack>
              <Text type="supporting" color="secondary">
                {band.label}: {band.description.toLowerCase()}
              </Text>
            </VStack>
            <fieldset className={styles.addOnSet}>
              <legend className={styles.addOnLegend}>
                <Text type="label" weight="semibold">
                  Add-ons
                </Text>
                <Text type="supporting" color="secondary" display="block">
                  Extras available for a {petLabel(pet).toLowerCase()}.
                </Text>
              </legend>
              <VStack gap={3}>
                {available.map(a => (
                  <CheckboxInput
                    key={a.id}
                    label={a.label}
                    description={`${a.description} Sample price +${formatPence(a.monthly)} a month.`}
                    value={activeAddOns.includes(a.id)}
                    onChange={checked =>
                      setChosen(list => (checked ? [...list.filter(id => id !== a.id), a.id] : list.filter(id => id !== a.id)))
                    }
                  />
                ))}
              </VStack>
            </fieldset>
          </VStack>
        </Card>

        <Card padding={6} elevation="low" className={styles.quoteCard}>
          <VStack gap={5}>
            <HStack gap={4} vAlign="center">
              <PetPortrait pet={pet} className={styles.quotePortrait} />
              <VStack gap={1}>
                <Heading level={3}>Your sample plan</Heading>
                <Text color="secondary">
                  {band.label} {petLabel(pet).toLowerCase()}
                </Text>
              </VStack>
            </HStack>
            <VStack gap={1}>
              <p className={styles.quoteTotal} aria-live="polite" aria-atomic="true">
                {formatPence(quote.monthly)}
                <Text type="large" color="secondary">
                  {' '}
                  a month
                </Text>
              </p>
              <Text color="secondary" hasTabularNumbers>
                Illustrative only. That is {formatPence(quote.yearly)} over 12 months.
              </Text>
            </VStack>
            <ul className={styles.quoteLines} aria-label="Plan breakdown">
              {quote.lines.map(l => (
                <li key={l.label}>
                  <Text>{l.label}</Text>
                  <Text weight="semibold">{formatPence(l.monthly)}</Text>
                </li>
              ))}
            </ul>
            <Card padding={4} variant="yellow">
              <Text as="p">
                <strong>Sample prices.</strong> Meadowlark Vets is fictional. These figures show how a plan builder
                could work and are not an offer.
              </Text>
            </Card>
          </VStack>
        </Card>
      </section>
    </SectionShell>
  );
}
