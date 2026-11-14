'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {SectionShell} from './SectionShell';
import {ArrowRight} from './icons';
import {insights} from './lib/data';
import styles from './advisory.module.css';

export function Insights() {
  const [openId, setOpenId] = useState<string | null>(null);
  const article = insights.find(a => a.id === openId) ?? null;

  return (
    <SectionShell
      id="insights"
      eyebrow="Insights"
      title="Short notes on running a tidy finance function"
      lead="General reading written for this demo. It is not tax, legal or financial advice.">
      <ul className={styles.insightGrid} role="list">
        {insights.map(a => (
          <li key={a.id}>
            <ClickableCard
              label={`Read “${a.title}”`}
              onClick={() => setOpenId(a.id)}
              padding={6}
              className={styles.insightCard}
              aria-haspopup="dialog">
              <VStack gap={3}>
                <Text as="p" className={styles.role}>
                  {a.category} · <span className={styles.tnum}>{a.minutes}</span> min read
                </Text>
                <Text as="p" className={styles.insightTitle}>
                  {a.title}
                </Text>
                <Text as="p" color="secondary">
                  {a.dek}
                </Text>
                <span className={styles.readMore} aria-hidden="true">
                  Read the note <ArrowRight />
                </span>
              </VStack>
            </ClickableCard>
          </li>
        ))}
      </ul>

      <Dialog isOpen={article !== null} onOpenChange={open => !open && setOpenId(null)} width={680} maxHeight="85dvh">
        {article ? (
          <>
            <DialogHeader
              title={article.title}
              subtitle={`${article.category} · ${article.minutes} min read`}
              onOpenChange={open => !open && setOpenId(null)}
            />
            <VStack gap={4} className={styles.articleBody}>
              <Text as="p" type="large" color="secondary" className={styles.lead}>
                {article.dek}
              </Text>
              {article.body.map(p => (
                <Text as="p" key={p.slice(0, 24)}>
                  {p}
                </Text>
              ))}
              <Text as="p" type="supporting" className={styles.illustrative}>
                General information written for a fictional concept demo. It is not advice for your circumstances.
              </Text>
            </VStack>
          </>
        ) : (
          <span />
        )}
      </Dialog>
    </SectionShell>
  );
}
