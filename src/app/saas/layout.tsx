import type {Metadata} from 'next';
import {JetBrains_Mono, Manrope, Sora} from 'next/font/google';
import {PulsegridTheme} from '@/components/saas/PulsegridTheme';

const heading = Sora({subsets: ['latin'], variable: '--font-pulsegrid-heading', display: 'swap'});
const body = Manrope({subsets: ['latin'], variable: '--font-pulsegrid-body', display: 'swap'});
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-pulsegrid-mono', display: 'swap'});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/saas/';
const DESCRIPTION =
  'Pulsegrid is a fictional product-analytics SaaS, a concept demo by CraftLayer Studio: feature tour, sample dashboard, pricing calculator and waitlist.';

export const metadata: Metadata = {
  title: 'Pulsegrid',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Pulsegrid (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function SaasLayout({children}: {children: React.ReactNode}) {
  return (
    <PulsegridTheme fontClassName={`${heading.variable} ${body.variable} ${mono.variable}`}>{children}</PulsegridTheme>
  );
}
