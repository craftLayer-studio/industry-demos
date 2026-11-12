import type {MetadataRoute} from 'next';
import {SITE_URL} from '@/lib/paths';

// Required for `output: 'export'`: prerender at build time.
export const dynamic = 'force-static';

/**
 * Served at /industry-demos/robots.txt. Crawlers only read robots.txt at the
 * domain root, so this file is informational: the org site's root robots.txt
 * (craftlayer-studio.github.io/robots.txt) governs and lists this sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{userAgent: '*', allow: '/'}],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
