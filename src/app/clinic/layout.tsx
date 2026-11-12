import type {Metadata} from 'next';
import {Plus_Jakarta_Sans, Source_Sans_3} from 'next/font/google';
import {ClinicTheme} from '@/components/clinic/ClinicTheme';

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-northstar-heading',
  display: 'swap',
});

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-northstar-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/clinic/';
const DESCRIPTION =
  'Northstar Clinic is a fictional clinic by CraftLayer Studio: specialties, clinicians, FAQs and a multi-step appointment request. Nothing is booked or sent.';

export const metadata: Metadata = {
  title: 'Northstar Clinic',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Northstar Clinic (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function ClinicLayout({children}: {children: React.ReactNode}) {
  return <ClinicTheme fontClassName={`${heading.variable} ${body.variable}`}>{children}</ClinicTheme>;
}
