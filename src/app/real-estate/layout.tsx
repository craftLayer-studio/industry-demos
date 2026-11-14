import type {Metadata} from 'next';
import {Albert_Sans, Gloock} from 'next/font/google';
import {AshgroveTheme} from '@/components/real-estate/AshgroveTheme';

const heading = Gloock({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ashgrove-heading',
  display: 'swap',
});

const body = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-ashgrove-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/real-estate/';
const DESCRIPTION =
  'Ashgrove Property is a fictional estate agency, a concept demo by CraftLayer Studio: filterable listings, floor plans, a repayment estimator and viewings.';

export const metadata: Metadata = {
  title: 'Ashgrove Property',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Ashgrove Property (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function RealEstateLayout({children}: {children: React.ReactNode}) {
  return <AshgroveTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</AshgroveTheme>;
}
