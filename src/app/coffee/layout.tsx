import type {Metadata} from 'next';
import {Bricolage_Grotesque, DM_Mono, Gloock} from 'next/font/google';
import {BrightwaterTheme} from '@/components/coffee/BrightwaterTheme';

const display = Gloock({subsets: ['latin'], weight: '400', variable: '--font-bw-display', display: 'swap'});
const body = Bricolage_Grotesque({subsets: ['latin'], variable: '--font-bw-body', display: 'swap'});
const mono = DM_Mono({subsets: ['latin'], weight: ['400', '500'], variable: '--font-bw-mono', display: 'swap'});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/coffee/';
const DESCRIPTION =
  'Brightwater Coffee is a fictional small-batch roaster, a concept demo by CraftLayer Studio: coffee shop, cart, subscriptions and brew guides.';

export const metadata: Metadata = {
  title: 'Brightwater Coffee',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Brightwater Coffee (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function CoffeeLayout({children}: {children: React.ReactNode}) {
  return (
    <BrightwaterTheme fontClassName={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</BrightwaterTheme>
  );
}
