import {describe, expect, it} from 'vitest';
import {contactUrl, templateUrl} from './links';

describe('templateUrl', () => {
  it('maps demo slugs to their scriptly.store product with UTM tags', () => {
    expect(templateUrl('gym')).toBe(
      'https://scriptly.store/products/forge-fitness?utm_source=craftlayer&utm_medium=gallery&utm_campaign=gsap-collection',
    );
    expect(templateUrl('restaurant')).toContain('/products/juniper-kitchen?');
  });

  it('returns undefined for demos that are not sold', () => {
    for (const slug of ['clinic', 'saas', 'academy', 'advisory']) {
      expect(templateUrl(slug)).toBeUndefined();
    }
  });
});

describe('contactUrl', () => {
  it('adds the referring demo', () => {
    expect(contactUrl('gym')).toBe('https://craftlayer-studio.github.io/contact/?ref=gym');
  });
});
