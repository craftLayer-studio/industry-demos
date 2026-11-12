import type {Metadata} from 'next';
import {Cormorant_Garamond, Instrument_Sans} from 'next/font/google';
import {JuniperTheme} from '@/components/restaurant/JuniperTheme';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-juniper-display',
  display: 'swap',
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-juniper-sans',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/restaurant/';
const DESCRIPTION =
  'Juniper Kitchen is a fictional restaurant by CraftLayer Studio: filterable menu, mock pickup order and validated reservations. Nothing is booked or paid.';

export const metadata: Metadata = {
  title: 'Juniper Kitchen',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Juniper Kitchen | Concept demo',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function RestaurantLayout({children}: {children: React.ReactNode}) {
  return <JuniperTheme className={`${display.variable} ${sans.variable}`}>{children}</JuniperTheme>;
}
