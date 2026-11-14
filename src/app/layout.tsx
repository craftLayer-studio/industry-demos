import type {Metadata} from 'next';
import './globals.css';
import {Providers} from './providers';
import {SITE_URL} from '@/lib/paths';

export const metadata: Metadata = {
  // Origin only: relative metadata URLs in this app already include the basePath.
  metadataBase: new URL('https://craftlayer-studio.github.io/'),
  title: {default: 'Industry demos | CraftLayer Studio', template: '%s | CraftLayer Studio concept demo'},
  description:
    'Six fictional concept websites by CraftLayer Studio: gym, restaurant, clinic, SaaS, online academy and advisory firm. Not real businesses.',
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
