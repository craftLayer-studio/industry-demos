'use client';

import {useState} from 'react';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Button} from '@astryxdesign/core/Button';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';
import {SectionShell} from './SectionShell';
import {clinicians, specialties, specialtyById, type Clinician} from './lib/data';
import {countLabel, filterClinicians, type SpecialtyFilter} from './lib/filter';
import {formatDays} from './lib/format';
import styles from './clinic.module.css';

const filters: {value: SpecialtyFilter; label: string}[] = [
  {value: 'all', label: 'All'},
  ...specialties.map(s => ({value: s.id as SpecialtyFilter, label: s.name})),
];

export function Clinicians({onRequest}: {onRequest: (clinician: Clinician) => void}) {
  const [filter, setFilter] = useState<SpecialtyFilter>('all');
  const visible = filterClinicians(clinicians, filter);

  return (
    <SectionShell
      id="clinicians"
      eyebrow="Clinicians"
      title="Meet the (fictional) team"
      lead="Names and profiles are invented for this demo. Avatars show initials rather than photos of real people.">
      <VStack gap={6}>
        <VStack gap={3}>
          <Text type="label" id="clinician-filter-label">
            Filter by specialty
          </Text>
          <HStack gap={2} wrap="wrap" role="group" aria-labelledby="clinician-filter-label">
            {filters.map(f => (
              <ToggleButton
                key={f.value}
                label={f.label}
                size="md"
                isPressed={filter === f.value}
                onPressedChange={() => setFilter(f.value)}
              />
            ))}
          </HStack>
          <Text type="supporting" role="status" aria-live="polite">
            {countLabel(visible.length)}
            {filter === 'all' ? '' : ` in ${specialtyById(filter).name}`}
          </Text>
        </VStack>
        <Grid columns={{minWidth: 260, max: 4}} gap={4}>
          {visible.map(c => {
            const parts = c.name.split(' ');
            const shortName = parts[0] === 'Dr' ? `Dr ${parts[parts.length - 1]}` : parts[0];
            return (
              <Card key={c.id} padding={5} className={styles.fullHeight}>
                <VStack gap={4} className={styles.fullHeight} justify="between">
                  <VStack gap={3}>
                    <Avatar name={c.name.replace(/^Dr /, '')} alt={`Initials avatar for ${c.name}`} size={60} tooltip={false} />
                    <VStack gap={1}>
                      <Heading level={3}>{c.name}</Heading>
                      <Text color="accent" weight="semibold">
                        {c.title}
                      </Text>
                    </VStack>
                    <Text as="p" color="secondary">
                      {c.bio}
                    </Text>
                    <VStack gap={1}>
                      <Text type="supporting">In clinic: {formatDays(c.days)}</Text>
                      <Text type="supporting">Languages: {c.languages.join(', ')}</Text>
                    </VStack>
                  </VStack>
                  <Button
                    label={`Request with ${shortName}`}
                    variant="secondary"
                    width="100%"
                    onClick={() => onRequest(c)}
                  />
                </VStack>
              </Card>
            );
          })}
        </Grid>
      </VStack>
    </SectionShell>
  );
}
