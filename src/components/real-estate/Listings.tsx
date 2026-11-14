'use client';

import {useMemo} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Selector} from '@astryxdesign/core/Selector';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {SectionShell} from './SectionShell';
import {PropertyArt} from './PropertyArt';
import {ListingDialog} from './ListingDialog';
import {useEstate} from './EstateProvider';
import {areaById, properties, type Property} from './lib/data';
import {DEFAULT_FILTERS, activeFilterCount, resultSummary, searchProperties, sortOptions, type SortKey} from './lib/listings';
import {formatListingPrice, formatShortPrice} from './lib/format';
import {AreaIcon, BathIcon, BedIcon, HouseSearchIcon} from './icons';
import styles from './ashgrove.module.css';

export function Listings() {
  const {filters, setFilters, sort, setSort, openId, openProperty, closeProperty} = useEstate();
  const results = useMemo(() => searchProperties(properties, filters, sort), [filters, sort]);
  const active = activeFilterCount(filters);

  function clearFilters() {
    setFilters(f => ({...DEFAULT_FILTERS, mode: f.mode}));
  }

  const chips: string[] = [];
  if (filters.area !== 'all') chips.push(areaById(filters.area).name);
  if (filters.minPrice > 0) chips.push(`From ${formatShortPrice(filters.minPrice)}`);
  if (filters.maxPrice > 0) chips.push(`Up to ${formatShortPrice(filters.maxPrice)}`);
  if (filters.minBeds > 0) chips.push(`${filters.minBeds}+ beds`);

  return (
    <SectionShell
      id="listings"
      eyebrow={filters.mode === 'buy' ? 'For sale' : 'To rent'}
      title={filters.mode === 'buy' ? 'Homes for sale in and around Wealdbury' : 'Homes to rent in and around Wealdbury'}
      lead="Every listing here is a fictional sample with an original drawing in place of photographs. Open one for the floor plan, key facts and a viewing request.">
      <VStack gap={6}>
        <HStack gap={4} vAlign="end" justify="between" wrap="wrap" className={styles.resultBar}>
          <VStack gap={2}>
            <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">
              {resultSummary(results.length, filters.mode)}
              {active > 0 ? ` ${active} ${active === 1 ? 'filter' : 'filters'} applied.` : ''}
            </p>
            {chips.length > 0 ? (
              <HStack gap={2} wrap="wrap" vAlign="center">
                <ul className={styles.chips} aria-label="Active filters">
                  {chips.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Button label="Clear filters" variant="ghost" size="sm" onClick={clearFilters} />
              </HStack>
            ) : null}
          </VStack>
          <div className={styles.sortField}>
            <Selector
              label="Sort by"
              options={sortOptions}
              value={sort}
              onChange={v => setSort(v as SortKey)}
              width="100%"
            />
          </div>
        </HStack>

        {results.length === 0 ? (
          <Card padding={8} className={styles.emptyCard}>
            <EmptyState
              title="No sample homes match this search"
              description="Try another area, widen the price range or lower the number of bedrooms."
              icon={<HouseSearchIcon className={styles.emptyIcon} />}
              actions={<Button label="Clear filters" variant="primary" onClick={clearFilters} />}
            />
          </Card>
        ) : (
          <ul className={styles.listingGrid} aria-label="Sample listings">
            {results.map(p => (
              <li key={p.id}>
                <ListingCard property={p} onOpen={() => openProperty(p.id)} />
              </li>
            ))}
          </ul>
        )}
      </VStack>
      <ListingDialog propertyId={openId} onClose={closeProperty} />
    </SectionShell>
  );
}

function ListingCard({property: p, onOpen}: {property: Property; onOpen: () => void}) {
  const area = areaById(p.area);
  const isNew = p.listedDaysAgo <= 3;
  return (
    <ClickableCard
      label={`${p.title}, ${area.name}: ${formatListingPrice(p.price, p.mode)}, ${p.beds} bedrooms. Open details`}
      onClick={onOpen}
      padding={0}
      className={styles.listingCard}>
      <div className={styles.listingArt}>
        <PropertyArt property={p} />
        <span className={styles.listingTag}>{p.mode === 'buy' ? 'For sale' : 'To rent'}</span>
        {isNew ? <span className={`${styles.listingTag} ${styles.listingTagNew}`}>Just added</span> : null}
      </div>
      <VStack gap={3} className={styles.listingBody}>
        <VStack gap={1}>
          <p className={styles.listingPrice}>
            {formatListingPrice(p.price, p.mode)}
            <span className={styles.sampleNote}> sample</span>
          </p>
          <Heading level={3} className={styles.listingTitle}>
            {p.title}
          </Heading>
          <Text type="supporting" color="secondary">
            {p.street === p.title ? '' : `${p.street}, `}
            {area.name} · {p.kind}
          </Text>
        </VStack>
        <ul className={styles.listingFacts} aria-label="Key facts">
          <li>
            <BedIcon />
            {p.beds} bed
          </li>
          <li>
            <BathIcon />
            {p.baths} bath
          </li>
          <li>
            <AreaIcon />
            {p.sqft.toLocaleString('en-GB')} sq ft
          </li>
        </ul>
      </VStack>
    </ClickableCard>
  );
}
