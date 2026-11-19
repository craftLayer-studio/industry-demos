'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {SectionShell} from './SectionShell';
import {PetPortrait} from './illustrations';
import {petTypes, services, type PetType} from './lib/data';
import {filterServices, type PetFilter} from './lib/services';
import styles from './vet.module.css';

const filters: {value: PetFilter; label: string}[] = [
  {value: 'all', label: 'All pets'},
  ...petTypes.map(p => ({value: p.id as PetFilter, label: p.plural})),
];

function petList(pets: PetType[]): string {
  return pets.map(p => petTypes.find(t => t.id === p)!.plural).join(' · ');
}

export function Services() {
  const [filter, setFilter] = useState<PetFilter>('all');
  const shown = filterServices(services, filter);
  const filterLabel = filters.find(f => f.value === filter)!.label.toLowerCase();

  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="Something for every kind of pet"
      lead="Pick a pet type to see what a visit could look like. These services are examples for a fictional practice.">
      <VStack gap={5}>
        <HStack gap={2} wrap="wrap" role="group" aria-label="Show services for">
          {filters.map(f => (
            <ToggleButton
              key={f.value}
              label={f.label}
              isPressed={filter === f.value}
              onPressedChange={() => setFilter(f.value)}
            />
          ))}
        </HStack>
        <p className={styles.liveCount} aria-live="polite" role="status">
          Showing {shown.length} {shown.length === 1 ? 'service' : 'services'} for {filterLabel}.
        </p>
        <ul className={styles.serviceList}>
          {shown.map((s, i) => (
            <li key={s.id}>
              <Card padding={5} className={styles.serviceCard}>
                <VStack gap={3}>
                  <HStack gap={3} vAlign="center">
                    <PetPortrait pet={filter === 'all' ? s.pets[i % s.pets.length] : filter} className={styles.servicePortrait} />
                    <Heading level={3}>{s.name}</Heading>
                  </HStack>
                  <Text as="p" color="secondary">
                    {s.summary}
                  </Text>
                  <Text type="supporting" weight="semibold" color="accent">
                    For {petList(s.pets)}
                  </Text>
                </VStack>
              </Card>
            </li>
          ))}
        </ul>
      </VStack>
    </SectionShell>
  );
}
