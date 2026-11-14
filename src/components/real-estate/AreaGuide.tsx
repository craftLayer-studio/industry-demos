'use client';

import {useState} from 'react';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SectionShell} from './SectionShell';
import {PropertyArt} from './PropertyArt';
import {useEstate} from './EstateProvider';
import {areas, properties, type AreaId, type ListingMode} from './lib/data';
import {DEFAULT_FILTERS} from './lib/listings';
import styles from './ashgrove.module.css';

export function AreaGuide() {
  const [active, setActive] = useState<AreaId>('market-square');
  const {setFilters, goToSection} = useEstate();

  function showHomes(area: AreaId, mode: ListingMode) {
    setFilters({...DEFAULT_FILTERS, mode, area});
    goToSection('listings');
  }

  return (
    <SectionShell
      id="areas"
      eyebrow="Area guide"
      title="Six corners of Wealdbury"
      lead="A short, honest guide to the fictional town’s neighbourhoods: what the streets are like and what kind of homes you will find there.">
      <VStack gap={6}>
        <TabList value={active} onChange={v => setActive(v as AreaId)} role="tablist" hasDivider>
          {areas.map(a => (
            <Tab key={a.id} value={a.id} label={a.name} panelId={`area-panel-${a.id}`} id={`area-tab-${a.id}`} />
          ))}
        </TabList>
        {areas.map(a => {
          const here = properties.filter(p => p.area === a.id);
          const sale = here.filter(p => p.mode === 'buy').length;
          const rent = here.length - sale;
          const art = here[0];
          return (
            <div
              key={a.id}
              id={`area-panel-${a.id}`}
              role="tabpanel"
              aria-labelledby={`area-tab-${a.id}`}
              hidden={active !== a.id}
              tabIndex={0}
              className={styles.areaPanel}>
              <div className={styles.areaArt}>{art ? <PropertyArt property={art} /> : null}</div>
              <VStack gap={4}>
                <VStack gap={2}>
                  <Heading level={3} className={styles.areaTitle}>
                    {a.name}
                  </Heading>
                  <Text type="large" color="secondary" as="p">
                    {a.tagline}
                  </Text>
                </VStack>
                <Text as="p" textWrap="pretty">
                  {a.description}
                </Text>
                <ul className={styles.areaTraits}>
                  {a.character.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                  <li>{a.walkToCentre === 'In the centre' ? 'In the town centre' : `${a.walkToCentre} to the square`}</li>
                </ul>
                <Text type="supporting" color="secondary" as="p">
                  Sample listings here: {sale} for sale, {rent} to rent.
                </Text>
                <HStack gap={3} wrap="wrap">
                  {sale > 0 ? (
                    <Button label={`Homes for sale in ${a.name}`} variant="secondary" onClick={() => showHomes(a.id, 'buy')} />
                  ) : null}
                  {rent > 0 ? (
                    <Button label={`Homes to rent in ${a.name}`} variant="ghost" onClick={() => showHomes(a.id, 'rent')} />
                  ) : null}
                </HStack>
              </VStack>
            </div>
          );
        })}
      </VStack>
    </SectionShell>
  );
}
