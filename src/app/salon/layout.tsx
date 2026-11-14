import type {Metadata} from 'next';
import {Bodoni_Moda, Jost} from 'next/font/google';
import {SalonTheme} from '@/components/salon/SalonTheme';

const display = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-fernlight-display',
  display: 'swap',
  style: ['normal', 'italic'],
});

const body = Jost({
  subsets: ['latin'],
  variable: '--font-fernlight-body',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/salon/';
const DESCRIPTION =
  'Fernlight Salon & Spa is a fictional concept demo by CraftLayer Studio: services, specialists, gift cards and an appointment request. Nothing is booked.';

export const metadata: Metadata = {
  title: 'Fernlight Salon & Spa',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Fernlight Salon & Spa (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function SalonLayout({children}: {children: React.ReactNode}) {
  return <SalonTheme fontClassName={`${display.variable} ${body.variable}`}>{children}</SalonTheme>;
}
