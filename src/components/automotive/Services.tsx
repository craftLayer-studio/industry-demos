'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {ServiceGlyph} from './art';
import {Section} from './Section';
import {DEFAULT_INPUT, estimate, formatRange, serviceById, type ServiceId} from './lib/estimate';
import styles from './torque.module.css';

type MenuItem = {
  value: ServiceId;
  tab: string;
  title: string;
  summary: string;
  checks: string[];
  interval: string;
};

export const MENU: MenuItem[] = [
  {
    value: 'interim',
    tab: 'Interim',
    title: 'Interim service',
    summary: 'A between-services top-up for higher-mileage drivers: fresh oil and filter plus the safety checks that matter most.',
    checks: ['Engine oil and oil filter', 'Tyres, pressures and tread depth', 'Lights, wipers and washers', 'Fluid levels topped up'],
    interval: 'Every 6 months or 6,000 miles (rule of thumb)',
  },
  {
    value: 'full',
    tab: 'Full',
    title: 'Full service',
    summary: 'The yearly once-over. Everything in the interim, plus air filter, a wider underside inspection and a road test.',
    checks: ['Everything in the interim service', 'Air filter replaced', 'Suspension, steering and exhaust inspected', 'Brake measurements recorded', 'Road test and report'],
    interval: 'Every 12 months or 12,000 miles (rule of thumb)',
  },
  {
    value: 'major',
    tab: 'Major',
    title: 'Major service',
    summary: 'The long-interval service that catches wear parts: plugs, cabin filter and fluids that a yearly service leaves alone.',
    checks: ['Everything in the full service', 'Spark plugs (petrol) or fuel filter (diesel)', 'Cabin pollen filter', 'Brake fluid moisture test and change', 'Coolant strength check'],
    interval: 'Every 24 months or 24,000 miles (rule of thumb)',
  },
  {
    value: 'mot',
    tab: 'MOT',
    title: 'MOT test',
    summary: 'The annual roadworthiness test for cars over three years old. If something fails, you get a clear list and a price before any repair.',
    checks: ['Lights, signals and horn', 'Brakes, steering and suspension', 'Tyres, wheels and seatbelts', 'Emissions and exhaust', 'Body, structure and visibility'],
    interval: 'Yearly, from the third anniversary of registration',
  },
  {
    value: 'brakes',
    tab: 'Brakes',
    title: 'Brake pads and discs',
    summary: 'Measured, not guessed. We would show you the disc and pad readings before recommending anything.',
    checks: ['Pad and disc thickness measured', 'Calipers cleaned and slide pins greased', 'New pads and discs fitted where needed', 'Brake test and road test'],
    interval: 'When measured wear says so',
  },
  {
    value: 'aircon',
    tab: 'Air-con',
    title: 'Air-con regas and check',
    summary: 'Cold air back for summer and a clear windscreen for winter. The system is evacuated, leak-tested and recharged to spec.',
    checks: ['System evacuated and vacuum tested', 'Refrigerant recharged by weight', 'UV dye added for leak tracing', 'Vent temperature recorded'],
    interval: 'Every 2 years or when it stops blowing cold',
  },
  {
    value: 'ev',
    tab: 'EV health',
    title: 'EV and hybrid health check',
    summary: 'For hybrid and electric cars: battery state of health, cooling, charging and the parts that wear differently on an electrified car.',
    checks: ['High-voltage battery state of health report', 'Battery cooling and coolant check', 'Charge port and cable inspection', 'Brakes checked for corrosion from light use', '12 V battery test'],
    interval: 'Yearly, or before buying a used EV',
  },
];

function fromPrice(service: ServiceId) {
  const fuel = service === 'ev' ? 'hybrid' : DEFAULT_INPUT.fuel;
  return formatRange(estimate({...DEFAULT_INPUT, service, fuel}));
}

export function Services({onEstimate}: {onEstimate: (service: ServiceId) => void}) {
  const [active, setActive] = useState<string>(MENU[0].value);
  return (
    <Section
      id="services"
      code="SVC-01"
      kicker="Service menu"
      tone="raised"
      title="Seven jobs, each with a clear checklist"
      lead="Pick a service to see what is included. Intervals are general rules of thumb; prices are sample figures for a family petrol car.">
      <div className={styles.tabsWrap}>
        <TabList value={active} onChange={setActive} role="tablist" hasDivider size="lg">
          {MENU.map(s => (
            <Tab key={s.value} value={s.value} label={s.tab} panelId={`svc-panel-${s.value}`} id={`svc-tab-${s.value}`} />
          ))}
        </TabList>
      </div>
      {MENU.map(s => (
        <div
          key={s.value}
          id={`svc-panel-${s.value}`}
          role="tabpanel"
          aria-labelledby={`svc-tab-${s.value}`}
          hidden={s.value !== active}
          tabIndex={0}
          className={styles.servicePanel}>
          <div className={styles.serviceAside}>
            <ServiceGlyph kind={s.value} className={styles.serviceGlyph} />
            <dl className={styles.serviceSpec}>
              <div>
                <dt>From (sample)</dt>
                <dd className={styles.mono}>{fromPrice(s.value)}</dd>
              </div>
              <div>
                <dt>Time on the ramp</dt>
                <dd className={styles.mono}>~{serviceById(s.value).hours} h (illustrative)</dd>
              </div>
              <div>
                <dt>Interval</dt>
                <dd>{s.interval}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.serviceBody}>
            <Heading level={3} className={styles.serviceTitle}>
              {s.title}
            </Heading>
            <p className={styles.bodyText}>{s.summary}</p>
            <h4 className={styles.miniHeading}>Included</h4>
            <ul className={styles.checks}>
              {s.checks.map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className={styles.inlineActions}>
              <Button label="Estimate this service" variant="primary" onClick={() => onEstimate(s.value)} />
              <Button label="Request a booking" href="#booking" />
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}
