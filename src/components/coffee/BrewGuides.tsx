'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {EspressoArt, ImmersionArt, PourOverArt} from './art';
import {Section} from './Section';
import {COFFEE_LIMITS, GUIDES, RATIO_LIMITS, WATER_LIMITS, clamp, coffeeFor, waterFor, type Method} from './lib/brew';
import styles from './coffee.module.css';

const ART: Record<Method, () => React.JSX.Element> = {
  'pour-over': PourOverArt,
  immersion: ImmersionArt,
  espresso: EspressoArt,
};

type Mode = 'coffee' | 'water';

function RatioCalculator({method}: {method: Method}) {
  const guide = GUIDES.find(g => g.method === method)!;
  const [mode, setMode] = useState<Mode>('coffee');
  const [ratio, setRatio] = useState(guide.ratio);
  const [coffee, setCoffee] = useState(guide.defaultCoffee);
  const [water, setWater] = useState(waterFor(guide.defaultCoffee, guide.ratio));
  const isEspresso = method === 'espresso';
  const liquid = isEspresso ? 'Liquid yield' : 'Water';

  const result = mode === 'coffee' ? waterFor(coffee, ratio) : coffeeFor(water, ratio);

  const reset = () => {
    setRatio(guide.ratio);
    setCoffee(guide.defaultCoffee);
    setWater(waterFor(guide.defaultCoffee, guide.ratio));
  };

  return (
    <div className={styles.calc} role="group" aria-labelledby={`calc-${method}`}>
      <div className={styles.calcHead}>
        <h4 id={`calc-${method}`} className={styles.calcTitle}>
          Ratio calculator
        </h4>
        <SegmentedControl label="Calculate from" value={mode} onChange={v => setMode(v as Mode)} size="sm">
          <SegmentedControlItem value="coffee" label="From coffee" />
          <SegmentedControlItem value="water" label={isEspresso ? 'From yield' : 'From water'} />
        </SegmentedControl>
      </div>
      <div className={styles.calcInputs}>
        {mode === 'coffee' ? (
          <NumberInput
            label="Coffee"
            value={coffee}
            onChange={v => setCoffee(clamp(v, COFFEE_LIMITS))}
            min={COFFEE_LIMITS.min}
            max={COFFEE_LIMITS.max}
            step={0.5}
            units="g"
            hasNumberSteppers
            isWheelEnabled={false}
            width="100%"
          />
        ) : (
          <NumberInput
            label={liquid}
            value={water}
            onChange={v => setWater(clamp(v, WATER_LIMITS))}
            min={WATER_LIMITS.min}
            max={WATER_LIMITS.max}
            step={10}
            units="g"
            hasNumberSteppers
            isWheelEnabled={false}
            width="100%"
          />
        )}
        <NumberInput
          label="Ratio (1 : x)"
          value={ratio}
          onChange={v => setRatio(clamp(v, RATIO_LIMITS))}
          min={RATIO_LIMITS.min}
          max={RATIO_LIMITS.max}
          step={0.5}
          hasNumberSteppers
          isWheelEnabled={false}
          width="100%"
        />
      </div>
      <output className={styles.calcResult} aria-live="polite">
        <span className={styles.calcResultLabel}>{mode === 'coffee' ? liquid : 'Coffee'}</span>
        <span className={styles.calcResultValue}>
          {result} <span>g</span>
        </span>
        <span className={styles.calcResultNote}>
          {mode === 'coffee' ? `${coffee} g coffee at 1:${ratio}` : `${water} g ${liquid.toLowerCase()} at 1:${ratio}`}
          {` · suggested 1:${guide.ratio}`}
          {isEspresso ? '' : ' · 1 g of water is about 1 ml'}
        </span>
      </output>
      <Button label="Reset to suggested" size="sm" variant="ghost" onClick={reset} />
    </div>
  );
}

export function BrewGuides() {
  const [method, setMethod] = useState<Method>('pour-over');
  return (
    <Section
      id="brew"
      eyebrow="03 · Brew guides"
      title="Brew it your way"
      lead="Three starting points, written for home kit. Use the calculator to scale any recipe up or down.">
      <TabList value={method} onChange={v => setMethod(v as Method)} role="tablist" hasDivider>
        {GUIDES.map(g => (
          <Tab key={g.method} value={g.method} label={g.label} panelId={`panel-${g.method}`} id={`tab-${g.method}`} />
        ))}
      </TabList>
      {GUIDES.map(g => {
        const Art = ART[g.method];
        return (
          <div
            key={g.method}
            id={`panel-${g.method}`}
            role="tabpanel"
            aria-labelledby={`tab-${g.method}`}
            hidden={method !== g.method}
            tabIndex={0}
            className={styles.brewPanel}>
            <div className={styles.brewIntro}>
              <Art />
              <div>
                <h3 className={styles.brewTitle}>{g.label}</h3>
                <p className={styles.bodyText}>{g.summary}</p>
                <dl className={styles.brewSpecs}>
                  <div>
                    <dt>Ratio</dt>
                    <dd>1:{g.ratio}</dd>
                  </div>
                  <div>
                    <dt>Grind</dt>
                    <dd>{g.grind}</dd>
                  </div>
                  <div>
                    <dt>Water</dt>
                    <dd>{g.temperature}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{g.time}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className={styles.brewBody}>
              <ol className={styles.steps}>
                {g.steps.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              {method === g.method ? <RatioCalculator key={g.method} method={g.method} /> : null}
            </div>
          </div>
        );
      })}
    </Section>
  );
}
