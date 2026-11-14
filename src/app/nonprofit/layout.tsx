import type {Metadata} from 'next';
import {Bricolage_Grotesque, Figtree} from 'next/font/google';
import {CommonTableTheme} from '@/components/nonprofit/CommonTableTheme';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-ct-display',
  display: 'swap',
});

const body = Figtree({
  subsets: ['latin'],
  variable: '--font-ct-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/nonprofit/';
const DESCRIPTION =
  'Common Table is a fictional community food network, a concept demo by CraftLayer Studio: donations, volunteer shifts, events and pantry hours.';

export const metadata: Metadata = {
  title: 'Common Table',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Common Table (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function NonprofitLayout({children}: {children: React.ReactNode}) {
  return <CommonTableTheme fontClassName={`${display.variable} ${body.variable}`}>{children}</CommonTableTheme>;
}
