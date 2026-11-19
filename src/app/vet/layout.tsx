import type {Metadata} from 'next';
import {Fredoka, Nunito} from 'next/font/google';
import {VetTheme} from '@/components/vet/VetTheme';

const heading = Fredoka({
  subsets: ['latin'],
  variable: '--font-meadowlark-heading',
  display: 'swap',
});

const body = Nunito({
  subsets: ['latin'],
  variable: '--font-meadowlark-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/vet/';
const DESCRIPTION =
  'Meadowlark Vets is a fictional vet practice concept demo by CraftLayer Studio: services by pet, a sample health plan calculator and hours.';

export const metadata: Metadata = {
  title: 'Meadowlark Vets',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Meadowlark Vets (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function VetLayout({children}: {children: React.ReactNode}) {
  return <VetTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</VetTheme>;
}
