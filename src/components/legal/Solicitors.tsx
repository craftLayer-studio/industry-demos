import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {solicitors} from './lib/data';
import styles from './legal.module.css';

/** Engraved oval cameo with the solicitor's initials. Decorative. */
function Cameo({initials}: {initials: string}) {
  return (
    <svg className={styles.cameo} viewBox="0 0 120 150" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="75" rx="56" ry="71" className={styles.cameoOuter} />
      <ellipse cx="60" cy="75" rx="48" ry="63" className={styles.cameoInner} />
      <path d="M36 112 H84" className={styles.cameoLine} />
      <path d="M36 38 H84" className={styles.cameoLine} />
      <text x="60" y="86" textAnchor="middle" className={styles.cameoText}>
        {initials}
      </text>
    </svg>
  );
}

export function Solicitors() {
  return (
    <SectionShell
      id="solicitors"
      tone="raised"
      eyebrow="IV. Solicitors"
      title="The people who would handle your matter"
      lead="Fictional characters created for this concept. No real people, qualifications or experience are represented.">
      <ul className={styles.teamGrid} role="list">
        {solicitors.map(p => (
          <li key={p.id} className={styles.person}>
            <Cameo initials={p.initials} />
            <Heading level={3} className={styles.personName}>
              {p.name}
            </Heading>
            <Text as="p" className={styles.smallCaps}>
              {p.role}
            </Text>
            <Text as="p" color="secondary">
              {p.note}
            </Text>
            <ul className={styles.focusList} aria-label={`${p.name} focuses on`}>
              {p.focus.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
