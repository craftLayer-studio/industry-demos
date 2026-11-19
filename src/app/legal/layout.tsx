import type {Metadata} from 'next';
import {Hanken_Grotesk, Playfair_Display} from 'next/font/google';
import {MarloweTheme} from '@/components/legal/MarloweTheme';

const heading = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-marlowe-heading',
  display: 'swap',
});

const body = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-marlowe-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/legal/';
const DESCRIPTION =
  'Marlowe & Pike is a fictional firm of solicitors, a concept demo by CraftLayer Studio: practice areas, fee estimator and enquiry form.';

export const metadata: Metadata = {
  title: 'Marlowe & Pike',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Marlowe & Pike (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function LegalLayout({children}: {children: React.ReactNode}) {
  return <MarloweTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</MarloweTheme>;
}
