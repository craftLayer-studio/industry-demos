import type {Metadata} from 'next';
import {Chakra_Petch, Red_Hat_Mono, Red_Hat_Text} from 'next/font/google';
import {TorqueTheme} from '@/components/automotive/TorqueTheme';

const display = Chakra_Petch({subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-tq-display', display: 'swap'});
const body = Red_Hat_Text({subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-tq-body', display: 'swap'});
const mono = Red_Hat_Mono({subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-tq-mono', display: 'swap'});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/automotive/';
const DESCRIPTION =
  'Torque & Co. Motors is a fictional garage, a concept demo by CraftLayer Studio: service menu, sample price estimator, MOT reminders and bookings.';

export const metadata: Metadata = {
  title: 'Torque & Co. Motors',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Torque & Co. Motors (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function AutomotiveLayout({children}: {children: React.ReactNode}) {
  return <TorqueTheme fontClassName={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</TorqueTheme>;
}
