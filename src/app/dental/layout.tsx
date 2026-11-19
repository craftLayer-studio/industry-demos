import type {Metadata} from 'next';
import {Outfit, Nunito_Sans} from 'next/font/google';
import {DentalTheme} from '@/components/dental/DentalTheme';

const heading = Outfit({
  subsets: ['latin'],
  variable: '--font-arbour-heading',
  display: 'swap',
});

const body = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-arbour-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/dental/';
const DESCRIPTION =
  'Arbour Dental is a fictional dental practice concept demo by CraftLayer Studio: sample treatment prices, a payment estimator and a consultation form.';

export const metadata: Metadata = {
  title: 'Arbour Dental',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Arbour Dental (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function DentalLayout({children}: {children: React.ReactNode}) {
  return <DentalTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</DentalTheme>;
}
