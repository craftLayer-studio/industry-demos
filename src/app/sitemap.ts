import type {MetadataRoute} from 'next';
import {demos} from '@/lib/demos';
import {SITE_URL} from '@/lib/paths';

// Required for `output: 'export'`: prerender at build time.
export const dynamic = 'force-static';

const lastModified = new Date();

/** Absolute URLs must include the /industry-demos base path. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 0.6},
    ...demos.map(demo => ({
      url: `${SITE_URL}${demo.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
