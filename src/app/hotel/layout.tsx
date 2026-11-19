import type {Metadata} from 'next';
import {Gilda_Display, Mulish} from 'next/font/google';
import {SaltmarshTheme} from '@/components/hotel/SaltmarshTheme';

const heading = Gilda_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-saltmarsh-heading',
  display: 'swap',
});

const body = Mulish({
  subsets: ['latin'],
  variable: '--font-saltmarsh-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/hotel/';
const DESCRIPTION =
  'The Saltmarsh is a fictional coastal hotel, a concept demo by CraftLayer Studio: room filters, sample rates, availability, dining, spa and a stay request.';

export const metadata: Metadata = {
  title: 'The Saltmarsh',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'The Saltmarsh (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function HotelLayout({children}: {children: React.ReactNode}) {
  return <SaltmarshTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</SaltmarshTheme>;
}
