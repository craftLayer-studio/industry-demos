'use client';

import {useEffect, useMemo, useRef, useState, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Selector} from '@astryxdesign/core/Selector';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {SectionShell} from './SectionShell';
import {
  DAY_LABELS,
  DAYS,
  DEFAULT_FILTER,
  describeShift,
  EMPTY_VOLUNTEER,
  filterShifts,
  roleById,
  ROLES,
  SHIFTS,
  toggleDay,
  validateVolunteer,
  type RoleId,
  type ShiftFilter,
  type VolunteerDraft,
  type VolunteerErrors,
} from './lib/shifts';
import {countErrors} from './lib/validation';
import styles from './nonprofit.module.css';

const ROLE_OPTIONS = [{value: 'all', label: 'Any role'}, ...ROLES.map(r => ({value: r.id, label: r.label}))];

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Volunteer() {
  const [filter, setFilter] = useState<ShiftFilter>(DEFAULT_FILTER);
  const [draft, setDraft] = useState<VolunteerDraft>(EMPTY_VOLUNTEER);
  const [errors, setErrors] = useState<VolunteerErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState<{name: string; shiftId: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const visible = useMemo(() => filterShifts(SHIFTS, filter), [filter]);
  const selected = SHIFTS.find(s => s.id === draft.shiftId);

  function update<K extends keyof VolunteerDraft>(key: K, value: VolunteerDraft[K]) {
    setDraft(d => ({...d, [key]: value}));
    if (key in errors) setErrors(e => ({...e, [key]: undefined}));
  }

  useEffect(() => {
    if (attempt === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-shift-error]')?.focus();
  }, [attempt]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateVolunteer(draft);
    setErrors(found);
    if (countErrors(found) > 0) {
      setAttempt(a => a + 1);
      return;
    }
    setDone({name: draft.name.trim(), shiftId: draft.shiftId});
  }

  function restart() {
    setDraft(EMPTY_VOLUNTEER);
    setErrors({});
    setDone(null);
  }

  const errorCount = countErrors(errors);
  const doneShift = done ? SHIFTS.find(s => s.id === done.shiftId) : undefined;

  return (
    <SectionShell
      id="volunteer"
      tone="cream"
      eyebrow="Volunteer"
      title="Grab an apron, pick a shift"
      lead="Filter the sample weekly rota, choose a shift and add your details. Nothing is booked: this is a demonstration.">
      {done && doneShift ? (
        <div className={styles.formPanel}>
          <VStack gap={4} role="status">
            <Heading level={3} ref={doneRef} tabIndex={-1} className={styles.cardTitle}>
              See you at the table, {done.name}
            </Heading>
            <p className={styles.demoDone}>Demo only: no shift was booked and nothing was sent.</p>
            <Text as="p" color="secondary">
              You picked {roleById(doneShift.role).label.toLowerCase()} at {doneShift.site},{' '}
              {describeShift(doneShift)}. On a real site you would now get a confirmation email and a short briefing.
            </Text>
            <HStack>
              <Button label="Pick another shift" onClick={restart} />
            </HStack>
          </VStack>
        </div>
      ) : (
        <form ref={formRef} noValidate onSubmit={onSubmit} aria-label="Volunteer shift sign-up" className={styles.volGrid}>
          <VStack gap={5} className={styles.filterPanel}>
            <Heading level={3} className={styles.smallTitle}>
              Filter shifts
            </Heading>
            <Selector
              label="Role"
              options={ROLE_OPTIONS}
              value={filter.role}
              onChange={v => setFilter(f => ({...f, role: (v ?? 'all') as RoleId | 'all'}))}
              width="100%"
            />
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Days</legend>
              <Text as="p" type="supporting" color="secondary" className={styles.legendHint}>
                Leave all unticked to see every day.
              </Text>
              <div className={styles.dayGrid}>
                {DAYS.map(day => (
                  <CheckboxInput
                    key={day}
                    label={DAY_LABELS[day]}
                    value={filter.days.includes(day)}
                    onChange={on => setFilter(f => ({...f, days: toggleDay(f.days, day, on)}))}
                  />
                ))}
              </div>
            </fieldset>
            <CheckboxInput
              label="Hide full shifts"
              value={filter.hideFull}
              onChange={on => setFilter(f => ({...f, hideFull: on}))}
            />
            <Button
              label="Clear filters"
              variant="ghost"
              onClick={() => setFilter(DEFAULT_FILTER)}
              isDisabled={filter === DEFAULT_FILTER}
            />
          </VStack>

          <VStack gap={6}>
            <p className={styles.resultCount} role="status">
              {visible.length === 1 ? '1 shift matches' : `${visible.length} shifts match`}
            </p>
            {errors.shiftId ? (
              <p className={styles.inlineError} data-shift-error tabIndex={-1}>
                {errors.shiftId}
              </p>
            ) : null}
            {visible.length === 0 ? (
              <EmptyState
                title="No shifts match"
                description="Try another role or day. Breakfast clubs only run on school days."
                actions={<Button label="Clear filters" onClick={() => setFilter(DEFAULT_FILTER)} />}
              />
            ) : (
              <div className={styles.shiftList}>
                <RadioList
                  label="Available shifts"
                  isLabelHidden
                  value={draft.shiftId}
                  onChange={v => update('shiftId', v)}>
                  {visible.map(s => {
                    const role = roleById(s.role);
                    return (
                      <RadioListItem
                        key={s.id}
                        value={s.id}
                        isDisabled={s.spotsLeft === 0}
                        aria-label={`${role.label}, ${describeShift(s)}, ${s.site}${s.spotsLeft === 0 ? ', full' : ''}`}
                        label={role.label}
                        description={`${describeShift(s)} · ${s.site}`}
                        endContent={
                          s.spotsLeft === 0 ? (
                            <Badge label="Full" variant="neutral" />
                          ) : (
                            <Badge
                              label={s.spotsLeft === 1 ? '1 place' : `${s.spotsLeft} places`}
                              variant="success"
                            />
                          )
                        }
                      />
                    );
                  })}
                </RadioList>
              </div>
            )}

            <VStack gap={5} className={styles.formPanel}>
              <Heading level={3} className={styles.smallTitle}>
                Your details
              </Heading>
              <Text as="p" color="secondary">
                {selected ? `Selected: ${roleById(selected.role).label}, ${describeShift(selected)}.` : 'No shift selected yet.'}
              </Text>
              {errorCount > 0 ? (
                <Banner
                  status="error"
                  role="alert"
                  title={errorCount === 1 ? 'One answer needs attention.' : `${errorCount} answers need attention.`}
                />
              ) : null}
              <FormLayout defaultOptionality="required">
                <TextInput
                  label="Your name"
                  value={draft.name}
                  onChange={v => update('name', v)}
                  autoComplete="name"
                  status={errorStatus(errors.name)}
                />
                <TextInput
                  label="Email"
                  type="email"
                  description="Use a made-up address such as you@example.com."
                  value={draft.email}
                  onChange={v => update('email', v)}
                  autoComplete="email"
                  status={errorStatus(errors.email)}
                />
                <CheckboxInput
                  label="This is my first shift"
                  value={draft.isFirstTime}
                  onChange={v => update('isFirstTime', v)}
                />
                <CheckboxInput
                  label="I am 16 or over"
                  value={draft.agreed}
                  onChange={v => update('agreed', v)}
                  status={errorStatus(errors.agreed)}
                />
              </FormLayout>
              <HStack>
                <Button type="submit" variant="primary" label="Sign up for this shift (demo)" />
              </HStack>
            </VStack>
          </VStack>
        </form>
      )}
    </SectionShell>
  );
}
