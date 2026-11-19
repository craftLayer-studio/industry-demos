import type {Metadata} from 'next';
import {Barlow, Barlow_Condensed, IBM_Plex_Mono} from 'next/font/google';
import {KeystoneTheme} from '@/components/builders/KeystoneTheme';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-ks-display',
  display: 'swap',
});
const body = Barlow({subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-ks-body', display: 'swap'});
const mono = IBM_Plex_Mono({subsets: ['latin'], weight: ['500', '600'], variable: '--font-ks-mono', display: 'swap'});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/builders/';
const DESCRIPTION =
  'Keystone Build Co. is a fictional builder, a concept demo by CraftLayer Studio: services, a sample extension cost estimator and survey requests.';

export const metadata: Metadata = {
  title: 'Keystone Build Co.',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Keystone Build Co. (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function BuildersLayout({children}: {children: React.ReactNode}) {
  return <KeystoneTheme fontClassName={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</KeystoneTheme>;
}
