'use client';

import {useSyncExternalStore} from 'react';
import {localToday} from './lib/dates';

const noopSubscribe = () => () => {};

/** The viewer's local date. Null during static rendering, known after hydration. */
export function useToday(): string | null {
  return useSyncExternalStore(noopSubscribe, () => localToday(), () => null);
}
