'use client';

import {useMemo, useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Heading} from '@astryxdesign/core/Heading';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {BagArt, BeanArt} from './art';
import {Section} from './Section';
import {RoastScale} from './RoastScale';
import {useShop} from './ShopContext';
import {
  COFFEES,
  DEFAULT_FILTERS,
  FAMILY_LABELS,
  PROCESS_LABELS,
  ROAST_LABELS,
  SORT_OPTIONS,
  filterAndSort,
  formatMoney,
  isFiltered,
  type Filters,
  type NoteFamily,
  type Process,
  type Roast,
  type SortKey,
} from './lib/catalog';
import styles from './coffee.module.css';

const PROCESS_OPTIONS = [
  {value: 'all', label: 'Any process'},
  ...(Object.keys(PROCESS_LABELS) as Process[]).map(p => ({value: p, label: PROCESS_LABELS[p]})),
];
const FAMILIES = Object.keys(FAMILY_LABELS) as NoteFamily[];

export function Shop() {
  const {openProduct} = useShop();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>('featured');
  const results = useMemo(() => filterAndSort(COFFEES, filters, sort), [filters, sort]);
  const filtered = isFiltered(filters);

  const toggleFamily = (family: NoteFamily, checked: boolean) =>
    setFilters(f => ({
      ...f,
      families: checked ? [...f.families, family] : f.families.filter(x => x !== family),
    }));

  const clear = () => setFilters(DEFAULT_FILTERS);

  return (
    <Section
      id="shop"
      eyebrow="01 · The shop"
      title="This season's coffees"
      lead="Filter by roast, process or the flavours you like. Open any bag for tasting notes, sizes and grind options. Prices are illustrative samples.">
      <div className={styles.shopLayout}>
        <div className={styles.filterPanel} role="group" aria-labelledby="filter-heading">
          <Heading level={3} id="filter-heading" className={styles.filterTitle}>
            Filter and sort
          </Heading>
          <div className={styles.filterBlock}>
            <p className={styles.filterLabel} id="roast-label">
              Roast level
            </p>
            <SegmentedControl
              label="Roast level"
              value={filters.roast}
              onChange={v => setFilters(f => ({...f, roast: v as Roast | 'all'}))}
              size="sm">
              <SegmentedControlItem value="all" label="All" />
              {(Object.keys(ROAST_LABELS) as Roast[]).map(r => (
                <SegmentedControlItem key={r} value={r} label={ROAST_LABELS[r]} />
              ))}
            </SegmentedControl>
          </div>
          <div className={styles.filterBlock}>
            <Selector
              label="Process"
              options={PROCESS_OPTIONS}
              value={filters.process}
              onChange={v => setFilters(f => ({...f, process: (v ?? 'all') as Process | 'all'}))}
              width="100%"
              size="sm"
            />
          </div>
          <fieldset className={`${styles.filterBlock} ${styles.fieldset}`}>
            <legend className={styles.filterLabel}>Tasting notes</legend>
            <div className={styles.checkGrid}>
              {FAMILIES.map(fam => (
                <CheckboxInput
                  key={fam}
                  label={FAMILY_LABELS[fam]}
                  value={filters.families.includes(fam)}
                  onChange={checked => toggleFamily(fam, checked)}
                  size="sm"
                />
              ))}
            </div>
          </fieldset>
          <div className={styles.filterBlock}>
            <Selector
              label="Sort by"
              options={SORT_OPTIONS}
              value={sort}
              onChange={v => setSort((v ?? 'featured') as SortKey)}
              width="100%"
              size="sm"
            />
          </div>
          {filtered ? <Button label="Clear filters" variant="ghost" size="sm" onClick={clear} /> : null}
        </div>

        <div className={styles.shopResults}>
          <p className={styles.resultCount} role="status" aria-live="polite">
            {results.length === 1 ? '1 coffee' : `${results.length} coffees`}
            {filtered ? ' match your filters' : ' on the list'}
          </p>
          {results.length === 0 ? (
            <div className={styles.emptyWrap}>
              <EmptyState
                title="No coffees match those filters"
                description="Try a different roast level, any process, or fewer tasting notes."
                icon={<BeanArt className={styles.emptyBean} />}
                headingLevel={3}
                actions={<Button label="Clear filters" variant="primary" onClick={clear} />}
              />
            </div>
          ) : (
            <ul className={styles.productGrid}>
              {results.map(c => (
                <li key={c.id}>
                  <ClickableCard
                    label={`${c.name}, ${c.origin}. ${c.notes.join(', ')}. From ${formatMoney(c.price)}. View details`}
                    onClick={() => openProduct(c.id)}
                    padding={0}
                    className={styles.productCard}>
                    <span className={styles.productArt} style={{['--bag-tint' as string]: c.palette[0]}}>
                      <BagArt coffee={c} className={styles.productBag} />
                      {c.isDecaf ? <span className={styles.decafTag}>Decaf</span> : null}
                    </span>
                    <span className={styles.productBody}>
                      <span className={styles.productHead}>
                        <Heading level={3} className={styles.productName}>
                          {c.name}
                        </Heading>
                        <span className={styles.productPrice}>{formatMoney(c.price)}</span>
                      </span>
                      <span className={styles.productMeta}>
                        {c.origin} · {c.region} · {PROCESS_LABELS[c.process]}
                      </span>
                      <span className={styles.notesLine}>{c.notes.join(' / ')}</span>
                      <RoastScale value={c.roastScale} label={ROAST_LABELS[c.roast]} compact />
                    </span>
                  </ClickableCard>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
