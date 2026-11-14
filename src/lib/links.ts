/**
 * Outbound links from the demos: the animated template editions sold on
 * scriptly.store, and the studio contact page for custom work.
 */

/** Demo slug to scriptly.store product slug, for pages whose animated edition is on sale. */
export const TEMPLATE_PRODUCTS: Readonly<Record<string, string>> = {
  gym: 'forge-fitness',
  restaurant: 'juniper-kitchen',
};

const TEMPLATE_UTM = 'utm_source=craftlayer&utm_medium=gallery&utm_campaign=gsap-collection';

export const CONTACT_URL = 'https://craftlayer-studio.github.io/contact/';

/** scriptly.store product URL for a demo page, or undefined when that template is not sold. */
export function templateUrl(slug: string): string | undefined {
  const product = TEMPLATE_PRODUCTS[slug];
  return product ? `https://scriptly.store/products/${product}?${TEMPLATE_UTM}` : undefined;
}

/** Studio contact page, tagged with the page the visitor came from. */
export function contactUrl(ref?: string): string {
  return ref ? `${CONTACT_URL}?ref=${encodeURIComponent(ref)}` : CONTACT_URL;
}
