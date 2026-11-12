import type {Metadata} from 'next';
import Link from 'next/link';
import {demos} from '@/lib/demos';
import {REPO_URL, SITE_URL, STUDIO_URL} from '@/lib/paths';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: {absolute: 'Industry concept demos | CraftLayer Studio'},
  description:
    'Three fictional concept websites by CraftLayer Studio: Forge Fitness (gym), Juniper Kitchen (restaurant) and Northstar Clinic (healthcare). Not real businesses.',
  alternates: {canonical: `${SITE_URL}/`},
  openGraph: {
    title: 'Industry concept demos | CraftLayer Studio',
    description: 'Three fictional, fully working concept websites for fitness, hospitality and healthcare.',
    url: `${SITE_URL}/`,
    siteName: 'CraftLayer Studio',
    type: 'website',
    images: [{url: '/industry-demos/og.png', width: 1200, height: 630, alt: 'CraftLayer Studio industry concept demos'}],
  },
};

const accents: Record<string, string> = {
  gym: styles.gym,
  restaurant: styles.restaurant,
  clinic: styles.clinic,
};

export default function DemosIndex() {
  return (
    <main id="main" className={styles.main}>
      <header className={styles.header}>
        <a href={STUDIO_URL} className={styles.studio}>
          CraftLayer Studio
        </a>
        <a href={REPO_URL} className={styles.source}>
          Source on GitHub
        </a>
      </header>

      <section className={styles.intro} aria-labelledby="title">
        <p className={styles.eyebrow}>Concept demonstrations</p>
        <h1 id="title" className={styles.title}>
          Three industries. Three distinct brands. One engineering standard.
        </h1>
        <p className={styles.lede}>
          These are fictional businesses designed and built by CraftLayer Studio to show how we approach real
          industry websites: working filters, validated booking flows and accessible interfaces. They are not
          clients, and no bookings, orders or personal data are processed.
        </p>
      </section>

      <ul className={styles.grid}>
        {demos.map((d, i) => (
          <li key={d.slug} className={`${styles.card} ${accents[d.slug]}`}>
            <span className={styles.index}>0{i + 1}</span>
            <span className={styles.badge}>Concept demo</span>
            <h2 className={styles.name}>
              <Link href={d.href} className={styles.link}>
                {d.name}
              </Link>
            </h2>
            <p className={styles.industry}>{d.industry}</p>
            <p className={styles.summary}>{d.summary}</p>
            <span className={styles.cta} aria-hidden="true">
              Open demo →
            </span>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <p>
          Built with Next.js, React, TypeScript and Meta&apos;s Astryx design system. Statically exported to GitHub
          Pages.
        </p>
        <p>
          <a href={STUDIO_URL}>craftlayer-studio.github.io</a> · <a href={REPO_URL}>github.com/craftLayer-studio/industry-demos</a>
        </p>
      </footer>
    </main>
  );
}
