import type {Metadata} from 'next';
import './globals.css';
import {Providers} from './providers';
import {SITE_URL} from '@/lib/paths';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + '/'),
  title: {default: 'Industry demos | CraftLayer Studio', template: '%s | CraftLayer Studio concept demo'},
  description:
    'Three fictional concept websites built by CraftLayer Studio: a gym, a restaurant and a clinic. Not real businesses.',
  robots: {index: true, follow: true},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
