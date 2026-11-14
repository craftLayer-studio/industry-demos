import type {Metadata} from 'next';
import {Inter_Tight, Libre_Caslon_Text} from 'next/font/google';
import {HaldenTheme} from '@/components/advisory/HaldenTheme';

const heading = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-halden-heading',
  display: 'swap',
});

const body = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-halden-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/advisory/';
const DESCRIPTION =
  'Halden & Rowe is a fictional accounting and advisory firm, a concept demo by CraftLayer Studio: fee estimator, team and a consultation request.';

export const metadata: Metadata = {
  title: 'Halden & Rowe',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Halden & Rowe (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function AdvisoryLayout({children}: {children: React.ReactNode}) {
  return <HaldenTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</HaldenTheme>;
}
