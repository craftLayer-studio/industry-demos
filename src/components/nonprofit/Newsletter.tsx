'use client';

import {useState, type FormEvent} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {LetterArt} from './illustrations';
import {validateNewsletter} from './lib/validation';
import styles from './nonprofit.module.css';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateNewsletter(email).email;
    setError(found);
    if (!found) setDone(true);
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className={styles.newsletter}>
      <div className={`${styles.container} ${styles.newsGrid}`}>
        <LetterArt className={styles.letterArt} />
        <VStack gap={3}>
          <Heading level={2} id="newsletter-heading" color="inherit" className={styles.newsTitle}>
            News from the table, once a month
          </Heading>
          <Text as="p" color="inherit">
            Recipes, volunteer calls and pantry updates. A sample sign-up: no list exists and nothing is sent.
          </Text>
        </VStack>
        <form noValidate onSubmit={onSubmit} aria-label="Newsletter sign-up" className={styles.newsForm}>
          <VStack gap={3}>
            <HStack gap={2} vAlign="end" wrap="wrap">
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={v => {
                  setEmail(v);
                  setError(undefined);
                  setDone(false);
                }}
                autoComplete="email"
                placeholder="you@example.com"
                status={error ? {type: 'error', message: error} : undefined}
                statusVariant="detached"
                containerClassName={styles.newsInput}
              />
              <Button type="submit" variant="primary" label="Sign up (demo)" />
            </HStack>
            <p role="status" className={styles.newsStatus}>
              {done ? 'Demo only: you have not been subscribed and nothing was sent.' : ''}
            </p>
          </VStack>
        </form>
      </div>
    </section>
  );
}
