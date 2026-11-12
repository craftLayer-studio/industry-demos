'use client';

import {useMemo, useRef, useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {ToggleButton, ToggleButtonGroup} from '@astryxdesign/core/ToggleButton';
import {Token} from '@astryxdesign/core/Token';
import {VStack} from '@astryxdesign/core/VStack';
import {useCart} from './CartContext';
import {MinusIcon, PlusIcon} from './icons';
import {quantityOf} from './lib/cart';
import {
  CATEGORIES,
  DIETS,
  EMPTY_FILTER,
  MENU,
  filterMenu,
  formatPrice,
  isFiltered,
  type Category,
  type Diet,
  type Dish,
  type MenuFilter,
} from './lib/menu';
import styles from './restaurant.module.css';

const DIET_COLOR: Record<Diet, 'green' | 'teal' | 'orange'> = {
  vegetarian: 'green',
  vegan: 'teal',
  'gluten-free': 'orange',
};

function DishCard({dish}: {dish: Dish}) {
  const {cart, dispatch} = useCart();
  const quantity = quantityOf(cart, dish.id);
  const addRef = useRef<HTMLButtonElement>(null);

  const decrement = () => {
    if (quantity === 1) addRef.current?.focus();
    dispatch({type: 'decrement', id: dish.id});
  };

  return (
    <Card className={styles.dishCard} padding={5}>
      <VStack gap={3} className={styles.dishInner}>
        <HStack gap={3} align="start" className={styles.dishHead}>
          <Heading level={4} className={styles.dishName}>
            {dish.name}
          </Heading>
          <span className={styles.dishLeader} aria-hidden="true" />
          <Text className={styles.dishPrice} hasTabularNumbers>
            {formatPrice(dish.price)}
          </Text>
        </HStack>
        <Text as="p" color="secondary" className={styles.dishDesc}>
          {dish.description}
        </Text>
        {dish.note ? <Text className={styles.dishNote}>{dish.note}</Text> : null}
        <HStack gap={3} align="center" justify="between" wrap="wrap" className={styles.dishFoot}>
          <HStack gap={1} wrap="wrap" className={styles.dishTags}>
            {DIETS.filter((d) => dish.diets.includes(d.value)).map((d) => (
              <Token key={d.value} size="sm" color={DIET_COLOR[d.value]} label={d.label} />
            ))}
          </HStack>
          <HStack gap={2} align="center">
            {quantity > 0 ? (
              <>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<Icon icon={MinusIcon} />}
                  label={`Remove one ${dish.name}`}
                  onClick={decrement}
                />
                <span className={styles.qty} aria-live="polite">
                  {quantity} in order
                </span>
              </>
            ) : null}
            <Button
              ref={addRef}
              size="sm"
              variant={quantity > 0 ? 'secondary' : 'primary'}
              icon={<Icon icon={PlusIcon} />}
              label={`Add ${dish.name} to order`}
              onClick={() => dispatch({type: 'add', item: {id: dish.id, name: dish.name, price: dish.price}})}>
              Add
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
}

function DishGrid({dishes}: {dishes: Dish[]}) {
  return (
    <ul className={styles.dishGrid}>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <DishCard dish={dish} />
        </li>
      ))}
    </ul>
  );
}

export function MenuSection() {
  const [filter, setFilter] = useState<MenuFilter>(EMPTY_FILTER);
  const results = useMemo(() => filterMenu(MENU, filter), [filter]);
  const update = (patch: Partial<MenuFilter>) => setFilter((f) => ({...f, ...patch}));

  const groups =
    filter.category === 'all'
      ? CATEGORIES.map((c) => ({...c, dishes: results.filter((d) => d.category === c.value)})).filter(
          (g) => g.dishes.length > 0,
        )
      : [];

  return (
    <section className={styles.menuSection} id="menu" aria-labelledby="menu-title">
      <VStack className={styles.container} gap={6}>
        <HStack justify="between" align="end" wrap="wrap" gap={4}>
          <VStack gap={2} className={styles.menuIntro}>
            <Text type="label" className={styles.eyebrow}>
              Menu &amp; pickup
            </Text>
            <Heading level={2} id="menu-title" className={styles.sectionTitle}>
              Tonight&rsquo;s menu
            </Heading>
            <Text as="p" color="secondary" className={styles.sectionLede}>
              Add dishes to a pickup order, then choose a collection time. This is a demo: nothing is charged or
              sent to a kitchen.
            </Text>
          </VStack>
        </HStack>

        <VStack gap={4} className={styles.filters}>
          <TabList
            value={filter.category}
            onChange={(value) => update({category: value as Category | 'all'})}
            role="tablist"
            hasDivider>
            <Tab value="all" label="All" panelId="menu-panel" />
            {CATEGORIES.map((c) => (
              <Tab key={c.value} value={c.value} label={c.label} panelId="menu-panel" />
            ))}
          </TabList>
          <HStack gap={4} align="end" wrap="wrap" justify="between">
            <ToggleButtonGroup
              label="Dietary filters"
              type="multiple"
              size="sm"
              value={filter.diets}
              onChange={(value) => update({diets: (Array.isArray(value) ? value : []) as Diet[]})}>
              {DIETS.map((d) => (
                <ToggleButton key={d.value} value={d.value} label={d.label} />
              ))}
            </ToggleButtonGroup>
            <TextInput
              type="search"
              label="Search dishes"
              isLabelHidden
              placeholder="Search dishes or ingredients"
              value={filter.query}
              onChange={(value) => update({query: value})}
              hasClear
              size="sm"
              containerClassName={styles.search}
            />
          </HStack>
          <HStack justify="between" align="center" wrap="wrap" gap={2}>
            <p className={styles.resultCount} role="status" aria-live="polite">
              {results.length === 1 ? '1 dish' : `${results.length} dishes`}
              {isFiltered(filter) ? ' match your filters' : ' on the menu'}
            </p>
            {isFiltered(filter) ? (
              <Button size="sm" variant="ghost" label="Clear filters" onClick={() => setFilter(EMPTY_FILTER)} />
            ) : null}
          </HStack>
        </VStack>

        <section id="menu-panel" role="tabpanel" aria-label="Dishes" className={styles.menuPanel}>
          {results.length === 0 ? (
            <EmptyState
              title="No dishes match"
              description="Try another category, fewer dietary filters or a different search."
              headingLevel={3}
              actions={<Button label="Clear filters" onClick={() => setFilter(EMPTY_FILTER)} />}
            />
          ) : filter.category === 'all' ? (
            <VStack gap={8}>
              {groups.map((g) => (
                <VStack key={g.value} gap={4}>
                  <Heading level={3} className={styles.groupTitle}>
                    {g.label}
                  </Heading>
                  <DishGrid dishes={g.dishes} />
                </VStack>
              ))}
            </VStack>
          ) : (
            <DishGrid dishes={results} />
          )}
        </section>
        <Text type="supporting">
          Dietary tags are a guide. Dishes are prepared in a kitchen that handles nuts, gluten, dairy and fish; please
          mention allergies in your booking.
        </Text>
      </VStack>
    </section>
  );
}
