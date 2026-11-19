'use client';

import {Collapsible, CollapsibleGroup} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {Section} from './Section';
import styles from './torque.module.css';

const FAQS = [
  {
    q: 'Is Torque & Co. Motors a real garage?',
    a: 'No. It is a fictional garage designed by CraftLayer Studio to show how an independent garage website could work. No vehicles are serviced, tested or booked in.',
  },
  {
    q: 'Does the registration lookup check my car?',
    a: 'No. There is no DVLA or any other lookup. The characters you type are used, inside your browser, to pick one of seven sample vehicle profiles so the estimator has something to show. Your registration is never sent anywhere.',
  },
  {
    q: 'How accurate are the prices?',
    a: 'They are illustrative only. The labour rate, parts allowances and the MOT fee are invented sample figures. A real garage would price from your actual vehicle and confirm before starting work.',
  },
  {
    q: 'What is the difference between an interim, full and major service?',
    a: 'As a rule of thumb, an interim service is an oil and filter change with safety checks, roughly every six months. A full service adds more filters and a wider inspection, roughly yearly. A major service adds parts like spark plugs and fluids on a longer interval. Always follow your manufacturer schedule.',
  },
  {
    q: 'Can you look after hybrid and electric cars?',
    a: 'In this concept, yes: the menu includes an EV and hybrid health check covering the high-voltage battery state of health report, cooling, charging port and brakes, which wear differently with regenerative braking.',
  },
  {
    q: 'Will a service affect my manufacturer warranty?',
    a: 'In the UK, block exemption rules generally let you use an independent garage without affecting the warranty, as long as the work follows the manufacturer schedule and uses suitable parts. Check your own warranty terms.',
  },
];

export function Faq() {
  return (
    <Section id="faq" code="FAQ-05" kicker="FAQ" title="Straight answers">
      <div className={styles.faqCard}>
        <CollapsibleGroup type="multiple" hasDividers density="spacious">
          {FAQS.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
              defaultIsOpen={false}
              trigger={
                <Text type="large" weight="semibold">
                  {f.q}
                </Text>
              }>
              <p className={styles.bodyText}>{f.a}</p>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </div>
    </Section>
  );
}
