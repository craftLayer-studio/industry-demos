import type {Metadata} from 'next';
import {Hanken_Grotesk, IBM_Plex_Mono} from 'next/font/google';
import {OstranderTheme} from '@/components/architecture/OstranderTheme';

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-ostrander-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ostrander-mono',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/architecture/';
const DESCRIPTION =
  'Ostrander Studio is a fictional architecture practice, a concept demo by CraftLayer Studio: project archive, design stages, fee guide and brief builder.';

export const metadata: Metadata = {
  title: 'Ostrander Studio',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Ostrander Studio (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function ArchitectureLayout({children}: {children: React.ReactNode}) {
  return <OstranderTheme fontClassName={`${sans.variable} ${mono.variable}`}>{children}</OstranderTheme>;
}
