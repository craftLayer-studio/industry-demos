import type {Metadata} from 'next';
import './globals.css';
import {Providers} from './providers';

export const metadata: Metadata = {
  // Origin only: relative metadata URLs in this app already include the basePath.
  metadataBase: new URL('https://craftlayer-studio.github.io/'),
  title: {default: 'Industry demos | CraftLayer Studio', template: '%s | CraftLayer Studio concept demo'},
  description:
    'Ten fictional concept websites by CraftLayer Studio, from gym and clinic to estate agency, salon, food network and coffee roaster. Not real businesses.',
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
