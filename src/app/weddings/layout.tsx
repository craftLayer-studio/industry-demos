import type {Metadata} from 'next';
import {DM_Serif_Display, Work_Sans} from 'next/font/google';
import {HollinTheme} from '@/components/weddings/HollinTheme';

const heading = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-hollin-heading',
  display: 'swap',
});

const body = Work_Sans({
  subsets: ['latin'],
  variable: '--font-hollin-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/weddings/';
const DESCRIPTION =
  'Hollin Barn is a fictional countryside wedding venue, a concept demo by CraftLayer Studio: spaces, a sample package builder, dates and a viewing request.';

export const metadata: Metadata = {
  title: 'Hollin Barn',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Hollin Barn (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function WeddingsLayout({children}: {children: React.ReactNode}) {
  return <HollinTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</HollinTheme>;
}
