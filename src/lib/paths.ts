/**
 * next/link and next/image handle basePath automatically. Plain <img src>,
 * CSS url() and <a href> to static files do not: wrap those with asset().
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}

export const STUDIO_URL = 'https://craftlayer-studio.github.io/';
export const REPO_URL = 'https://github.com/craftLayer-studio/industry-demos';
export const SITE_URL = 'https://craftlayer-studio.github.io/industry-demos';
