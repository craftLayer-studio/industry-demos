'use client';

import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Slider} from '@astryxdesign/core/Slider';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {SectionShell} from './SectionShell';
import {formatLongDate} from './lib/dates';
import {
  EVENING_CAPACITY,
  MAX_DAY_GUESTS,
  MAX_EVENING_EXTRA,
  MIN_DAY_GUESTS,
  PEAK_SATURDAY_MIN_CHARGED,
  addOns,
  dayTypes,
  formatGBP,
  issueMessage,
  quotePackage,
  seasons,
  type AddOnId,
  type DayType,
  type PackageInput,
  type Season,
} from './lib/pricing';
import styles from './hollin.module.css';

type Props = {
  pkg: PackageInput;
  pricedDate: string | null;
  onChange: (next: Partial<PackageInput>) => void;
  onClearDate: () => void;
};

export function PackageBuilder({pkg, pricedDate, onChange, onClearDate}: Props) {
  const quote = quotePackage(pkg);
  const season = seasons.find(s => s.value === pkg.season)!;
  const eveningError = quote.issues.find(i => i.code === 'evening-high' || i.code === 'evening-capacity');
  const dayError = quote.issues.find(i => i.code === 'day-guests-low' || i.code === 'day-guests-high' || i.code === 'not-integer');

  return (
    <SectionShell
      id="packages"
      tone="paper"
      eyebrow="Package builder"
      title="Shape a sample package"
      lead="Pick a season, a day and your guest numbers to see how a venue like this might price a wedding. All prices are illustrative sample figures for this demo, not a quote.">
      <div className={styles.builderGrid}>
        <Card padding={6} className={styles.builderCard}>
          <VStack gap={8}>
            <VStack gap={3}>
              <Text as="p" weight="semibold">
                Season
              </Text>
              <SegmentedControl label="Season" value={pkg.season} onChange={v => onChange({season: v as Season})} layout="fill" size="sm">
                {seasons.map(s => (
                  <SegmentedControlItem key={s.value} value={s.value} label={s.label} />
                ))}
              </SegmentedControl>
              <Text type="supporting" color="secondary" as="p">
                {season.label} runs {season.months}.
              </Text>
            </VStack>

            <VStack gap={3}>
              <Text as="p" weight="semibold">
                Day of the week
              </Text>
              <SegmentedControl label="Day of the week" value={pkg.dayType} onChange={v => onChange({dayType: v as DayType})} layout="fill" size="sm">
                {dayTypes.map(d => (
                  <SegmentedControlItem key={d.value} value={d.value} label={d.label} />
                ))}
              </SegmentedControl>
              <Text type="supporting" color="secondary" as="p">
                Midweek (Monday to Thursday) and Friday or Sunday dates carry a lower sample venue fee.
                {pkg.season === 'peak' && pkg.dayType === 'saturday'
                  ? ` Peak Saturdays charge for at least ${PEAK_SATURDAY_MIN_CHARGED} day guests.`
                  : ''}
              </Text>
            </VStack>

            <div className={styles.guestGrid}>
              <Slider
                label="Day guests"
                description={`Seated for the wedding breakfast, ${MIN_DAY_GUESTS} to ${MAX_DAY_GUESTS}.`}
                value={pkg.dayGuests}
                min={MIN_DAY_GUESTS}
                max={MAX_DAY_GUESTS}
                step={1}
                valueDisplay="text"
                onChange={(v: number) => onChange({dayGuests: v})}
                status={dayError ? {type: 'error', message: issueMessage(dayError)} : undefined}
                width="100%"
              />
              <NumberInput
                label="Evening-only guests"
                description={`Up to ${MAX_EVENING_EXTRA}; ${EVENING_CAPACITY} in the Hayloft in total.`}
                value={pkg.eveningGuests}
                min={0}
                max={MAX_EVENING_EXTRA}
                isIntegerOnly
                hasNumberSteppers
                onChange={v => onChange({eveningGuests: v})}
                status={eveningError ? {type: 'error', message: issueMessage(eveningError)} : undefined}
                statusVariant="detached"
                width="100%"
              />
            </div>

            <CheckboxList
              label="Add-ons"
              description="Optional extras, priced as illustrative samples."
              value={pkg.addOns}
              onChange={v => onChange({addOns: v as AddOnId[]})}
              hasDividers
              containerClassName={styles.addOnList}>
              {addOns.map(a => (
                <CheckboxListItem
                  key={a.id}
                  value={a.id}
                  label={a.label}
                  description={a.description}
                  endContent={
                    <Text type="supporting" weight="semibold" hasTabularNumbers className={styles.addOnPrice}>
                      {a.per === 'day-guest' ? `${formatGBP(a.price)} pp` : formatGBP(a.price)}
                    </Text>
                  }
                />
              ))}
            </CheckboxList>
          </VStack>
        </Card>

        <aside className={styles.summaryWrap} aria-labelledby="builder-summary-heading">
          <Card padding={6} className={styles.summaryCard}>
            <VStack gap={5}>
              <HStack gap={2} justify="between" vAlign="center" wrap="wrap">
                <Heading level={3} id="builder-summary-heading" tabIndex={-1} className={styles.cardHeading}>
                  Your sample estimate
                </Heading>
                <Badge label="Illustrative" variant="warning" />
              </HStack>
              {pricedDate ? (
                <HStack gap={2} vAlign="center" wrap="wrap" className={styles.pricedDate}>
                  <Text type="supporting">
                    Priced for <strong>{formatLongDate(pricedDate)}</strong>
                  </Text>
                  <Button label="Clear date" variant="ghost" size="sm" onClick={onClearDate} />
                </HStack>
              ) : null}
              {quote.ok ? (
                <table className={styles.quoteTable}>
                  <caption className={styles.srOnly}>Sample estimate line items</caption>
                  <thead className={styles.srOnly}>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Sample price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.lines.map(l => (
                      <tr key={l.id}>
                        <th scope="row">
                          <span className={styles.lineLabel}>{l.label}</span>
                          <span className={styles.lineDetail}>{l.detail}</span>
                        </th>
                        <td>{formatGBP(l.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <div className={styles.totalBlock} aria-live="polite" aria-atomic="true">
                {quote.ok ? (
                  <>
                    <p className={styles.totalLabel}>Sample total</p>
                    <p className={styles.totalValue}>{formatGBP(quote.total)}</p>
                    <p className={styles.totalNote}>
                      About {formatGBP(quote.perGuest)} per guest across {pkg.dayGuests + pkg.eveningGuests} guests.
                    </p>
                  </>
                ) : (
                  <p className={styles.totalNote}>Adjust the guest numbers to see a sample total: {quote.issues.map(issueMessage).join(' ')}</p>
                )}
              </div>
              <Text type="supporting" color="secondary" as="p" textWrap="pretty">
                Illustrative figures for a fictional venue. Not a quote, and nothing is held or reserved.
              </Text>
              <Button href="#viewing" label="Discuss it at a viewing" variant="primary" width="100%" />
            </VStack>
          </Card>
        </aside>
      </div>
    </SectionShell>
  );
}
