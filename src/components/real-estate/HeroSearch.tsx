'use client';

import {useMemo} from 'react';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {areas, properties, type AreaId, type ListingMode} from './lib/data';
import {bedOptions, priceSteps, searchProperties, withMode, withPriceBound} from './lib/listings';
import {formatShortPrice} from './lib/format';
import {useEstate} from './EstateProvider';
import styles from './ashgrove.module.css';

const areaOptions = [{value: 'all', label: 'Anywhere'}, ...areas.map(a => ({value: a.id, label: a.name}))];

const bedSelectOptions = bedOptions.map(n => ({value: String(n), label: n === 0 ? 'Any' : `${n}+ beds`}));

/** Hero search bar. Every change filters the listings below immediately. */
export function HeroSearch() {
  const {filters, setFilters, sort, goToSection} = useEstate();
  const steps = priceSteps[filters.mode];
  const suffix = filters.mode === 'rent' ? ' pcm' : '';
  const count = useMemo(() => searchProperties(properties, filters, sort).length, [filters, sort]);

  const minOptions = [
    {value: '0', label: 'No min'},
    ...steps.map(v => ({
      value: String(v),
      label: `${formatShortPrice(v)}${suffix}`,
      disabled: filters.maxPrice > 0 && v > filters.maxPrice,
    })),
  ];
  const maxOptions = [
    {value: '0', label: 'No max'},
    ...steps.map(v => ({
      value: String(v),
      label: `${formatShortPrice(v)}${suffix}`,
      disabled: filters.minPrice > 0 && v < filters.minPrice,
    })),
  ];

  return (
    <form
      role="search"
      aria-label="Search sample listings"
      className={styles.searchBar}
      onSubmit={e => {
        e.preventDefault();
        goToSection('listings');
      }}>
      <div className={styles.searchMode}>
        <SegmentedControl
          label="Buy or rent"
          value={filters.mode}
          onChange={v => setFilters(f => withMode(f, v as ListingMode))}
          layout="fill">
          <SegmentedControlItem value="buy" label="Buy" />
          <SegmentedControlItem value="rent" label="Rent" />
        </SegmentedControl>
      </div>
      <div className={styles.searchFields}>
        <Selector
          label="Area"
          options={areaOptions}
          value={filters.area}
          onChange={v => setFilters(f => ({...f, area: (v ?? 'all') as AreaId | 'all'}))}
          width="100%"
        />
        <Selector
          label={filters.mode === 'rent' ? 'Min rent' : 'Min price'}
          options={minOptions}
          value={String(filters.minPrice)}
          onChange={v => setFilters(f => withPriceBound(f, 'min', Number(v ?? 0)))}
          width="100%"
        />
        <Selector
          label={filters.mode === 'rent' ? 'Max rent' : 'Max price'}
          options={maxOptions}
          value={String(filters.maxPrice)}
          onChange={v => setFilters(f => withPriceBound(f, 'max', Number(v ?? 0)))}
          width="100%"
        />
        <Selector
          label="Bedrooms"
          options={bedSelectOptions}
          value={String(filters.minBeds)}
          onChange={v => setFilters(f => ({...f, minBeds: Number(v ?? 0)}))}
          width="100%"
        />
        <div className={styles.searchSubmit}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            label={count === 0 ? 'No matches yet' : `Show ${count} ${count === 1 ? 'home' : 'homes'}`}
            width="100%"
          />
        </div>
      </div>
      <Text type="supporting" color="secondary" as="p" className={styles.searchNote}>
        Nine fictional sample listings. Prices are illustrative.
      </Text>
    </form>
  );
}
