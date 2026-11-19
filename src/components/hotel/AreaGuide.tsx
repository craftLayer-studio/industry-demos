'use client';

import {useState} from 'react';
import {SectionShell} from './SectionShell';
import {AreaMap} from './art';
import {places} from './lib/data';
import styles from './saltmarsh.module.css';

export function AreaGuide() {
  const [active, setActive] = useState<string | undefined>(undefined);
  return (
    <SectionShell
      id="area"
      tone="sand"
      eyebrow="The area"
      title="Around Wrenmouth, on foot"
      lead="Wrenmouth and its estuary are fictional. The map and walking times are illustrative, drawn for this concept.">
      <div className={styles.areaGrid}>
        <div className={styles.mapWrap}>
          <AreaMap activeId={active} />
        </div>
        <ol className={styles.placeList}>
          {places.map((p, i) => (
            <li
              key={p.id}
              className={p.id === active ? styles.placeActive : undefined}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(undefined)}>
              <span className={styles.placeNumber} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className={styles.placeName}>{p.name}</h3>
                <p className={styles.placeMeta}>
                  {p.kind} · {p.distance}
                </p>
                <p className={styles.placeBlurb}>{p.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
