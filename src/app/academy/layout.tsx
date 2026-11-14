import type {Metadata} from 'next';
import {DM_Sans, Fraunces} from 'next/font/google';
import {AcademyTheme} from '@/components/academy/AcademyTheme';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-quillmark-display',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-quillmark-body',
  display: 'swap',
});

const CANONICAL = 'https://craftlayer-studio.github.io/industry-demos/academy/';
const DESCRIPTION =
  'Quillmark Academy is a fictional concept demo by CraftLayer Studio: a searchable course catalogue, cohort calendar and enrolment enquiry. Nothing is sent.';

export const metadata: Metadata = {
  title: 'Quillmark Academy',
  description: DESCRIPTION,
  alternates: {canonical: CANONICAL},
  openGraph: {
    title: 'Quillmark Academy (concept demo)',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

export default function AcademyLayout({children}: {children: React.ReactNode}) {
  return <AcademyTheme fontClassName={`${display.variable} ${body.variable}`}>{children}</AcademyTheme>;
}
