'use client';

import {VStack} from '@astryxdesign/core/VStack';
import {GalleryArt, type GalleryScene} from './Art';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

const tiles: {scene: GalleryScene; title: string; caption: string; alt: string}[] = [
  {scene: 'platform', title: 'The Platform', caption: 'Eight lifting platforms with calibrated plates.', alt: 'Illustration of a lifting platform seen from above, with a loaded barbell'},
  {scene: 'ring', title: 'Ring Room', caption: 'A full-size ring and twelve heavy bags.', alt: 'Illustration of a boxing ring with three ropes, one highlighted'},
  {scene: 'sled', title: 'Sled Lane', caption: 'A 25 metre turf lane for pushes and drags.', alt: 'Illustration of a turf lane in perspective with a sled at the 25 metre mark'},
  {scene: 'rig', title: 'The Rig', caption: 'Racks for squats, pull-ups and everything between.', alt: 'Illustration of a steel squat rig with a racked barbell'},
  {scene: 'loft', title: 'Recovery Loft', caption: 'Quiet mezzanine for mobility and cool-downs.', alt: 'Abstract illustration of calm wave lines for the recovery loft'},
];

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className={styles.section} tabIndex={-1}>
      <VStack gap={8} className={styles.wrap}>
        <SectionIntro index="06" eyebrow="The Works" id="gallery-title" title="Inside the Anvil Works">
          A converted foundry hall with zones for every programme. Drawn, not photographed: this building exists only
          in the demo.
        </SectionIntro>
        <ul className={styles.galleryGrid}>
          {tiles.map((t, i) => (
            <li key={t.scene} className={`${styles.galleryItem} ${styles[`galleryItem${i}`]}`}>
              <figure className={styles.galleryFigure}>
                <GalleryArt scene={t.scene} label={t.alt} />
                <figcaption className={styles.galleryCaption}>
                  <strong className={styles.galleryTitle}>{t.title}</strong>
                  <span>{t.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </VStack>
    </section>
  );
}
