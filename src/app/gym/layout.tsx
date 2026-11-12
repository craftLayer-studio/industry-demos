import type {Metadata} from 'next';
import {Anton, Archivo, JetBrains_Mono} from 'next/font/google';
import {ForgeTheme} from '@/components/gym/ForgeTheme';

const display = Anton({subsets: ['latin'], weight: '400', variable: '--font-forge-display', display: 'swap'});
const body = Archivo({subsets: ['latin'], variable: '--font-forge-body', display: 'swap', axes: ['wdth']});
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-forge-mono', display: 'swap'});

const description =
  'Forge Fitness is a fictional gym by CraftLayer Studio: programmes, coaches, membership pricing, a filterable timetable and trial booking. Nothing is booked.';

export const metadata: Metadata = {
  title: 'Forge Fitness',
  description,
  alternates: {canonical: 'https://craftlayer-studio.github.io/industry-demos/gym/'},
  openGraph: {
    title: 'Forge Fitness (concept demo)',
    description,
    url: 'https://craftlayer-studio.github.io/industry-demos/gym/',
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function GymLayout({children}: {children: React.ReactNode}) {
  return <ForgeTheme fontClassName={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</ForgeTheme>;
}
