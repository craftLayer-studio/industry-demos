'use client';

import {useState, type FormEvent} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CutawayArt} from './art';
import {formatPlate, plateError, sampleVehicleFor, PLATE_MAX} from './lib/plate';
import {ENGINE_BANDS, LABOUR_RATE, SERVICES, engineApplies} from './lib/estimate';
import type {LoadedVehicle} from './Workshop';
import styles from './torque.module.css';

export function Hero({loaded, onLookup}: {loaded: LoadedVehicle | null; onLookup: (v: LoadedVehicle) => void}) {
  const [plate, setPlate] = useState('');
  const [error, setError] = useState<string | undefined>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = plateError(plate);
    setError(err);
    const sample = sampleVehicleFor(plate);
    if (err || !sample) return;
    onLookup({plate: formatPlate(plate), sample});
  };

  const engineLabel = loaded && engineApplies(loaded.sample.fuel)
    ? `, ${ENGINE_BANDS.find(b => b.value === loaded.sample.engine)?.label}`
    : '';

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>
            <span className={styles.liveDot} aria-hidden="true" />
            Independent garage · Servicing · MOT · Repairs · EV and hybrid
          </p>
          <Heading level={1} id="hero-heading" textWrap="balance" className={styles.heroTitle}>
            Workshop-grade care, <span className={styles.heroAccent}>priced before</span> we lift a spanner.
          </Heading>
          <p className={styles.heroLead}>
            Servicing, MOTs, brakes, air-con and EV health checks from one straight-talking workshop. Enter a
            registration to load a sample vehicle into the price estimator.
          </p>

          <form className={styles.lookup} onSubmit={onSubmit} noValidate aria-labelledby="lookup-title" aria-describedby="lookup-note">
            <p id="lookup-title" className={styles.lookupTitle}>
              Registration quick start
            </p>
            <div className={styles.lookupRow}>
              <div className={styles.plateWrap}>
                <span className={styles.plateBand} aria-hidden="true">
                  UK
                </span>
                <TextInput
                  label="Vehicle registration"
                  isLabelHidden
                  value={plate}
                  onChange={v => {
                    setPlate(v.toUpperCase().slice(0, PLATE_MAX + 2));
                    if (error) setError(plateError(v));
                  }}
                  placeholder="AB12 CDE"
                  autoComplete="off"
                  autoCapitalize="characters"
                  hasAutoCorrect={false}
                  hasSpellCheck={false}
                  status={error ? {type: 'error', message: error} : undefined}
                  statusVariant="detached"
                  size="lg"
                  width="100%"
                  controlClassName={styles.plateControl}
                  containerClassName={styles.plateField}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" label="Load sample vehicle" className={styles.lookupBtn} />
            </div>
            <p id="lookup-note" className={styles.finePrint}>
              No DVLA lookup: this demo never checks or sends your registration. It picks a sample vehicle class from the
              characters, in your browser.
            </p>
            <p className={styles.lookupResult} role="status" aria-live="polite">
              {loaded ? (
                <>
                  <span className={styles.mono}>{loaded.plate}</span> → sample vehicle: <strong>{loaded.sample.label}{engineLabel}</strong>.{' '}
                  <a href="#estimate" className={styles.inlineLink}>
                    See it in the estimator
                  </a>
                </>
              ) : null}
            </p>
          </form>
        </div>

        <div className={styles.heroArtWrap}>
          <div className={styles.heroArtFrame}>
            <span className={styles.frameTag} aria-hidden="true">
              FIG. 01 · SERVICE POINTS
            </span>
            <CutawayArt className={styles.heroArt} />
          </div>
          <dl className={styles.readouts}>
            <div>
              <dt>Labour rate</dt>
              <dd>
                £{LABOUR_RATE}
                <small>/h sample</small>
              </dd>
            </div>
            <div>
              <dt>On the menu</dt>
              <dd>
                {SERVICES.length}
                <small> services</small>
              </dd>
            </div>
            <div>
              <dt>Workshop</dt>
              <dd>
                08–18<small> Mon–Sat</small>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
