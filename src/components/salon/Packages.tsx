import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {packageFeatures, spaPackages} from './lib/data';
import {formatDuration, formatPrice} from './lib/format';
import styles from './salon.module.css';

function Included({yes}: {yes: boolean}) {
  return yes ? (
    <>
      <svg viewBox="0 0 20 20" className={styles.tick} aria-hidden="true" focusable="false">
        <path d="M4 10.5l4 4 8-9" />
      </svg>
      <VisuallyHidden>Included</VisuallyHidden>
    </>
  ) : (
    <>
      <span className={styles.dash} aria-hidden="true">
        –
      </span>
      <VisuallyHidden>Not included</VisuallyHidden>
    </>
  );
}

export function Packages() {
  return (
    <SectionShell
      id="packages"
      eyebrow="Spa packages"
      title="Rituals for an afternoon, or a whole day"
      lead="Three sample packages to compare. In a real studio these would be bookable as one appointment; here they are for illustration.">
      <VStack gap={8}>
        <ul className={styles.packageGrid} aria-label="Spa packages">
          {spaPackages.map(p => (
            <li key={p.id}>
              <Card padding={6} className={`${styles.packageCard} ${p.isFeatured ? styles.packageFeatured : ''}`}>
                <VStack gap={3}>
                  {p.isFeatured ? <Text type="label" className={styles.packageFlag}>Suggested for a first visit</Text> : null}
                  <Heading level={3} className={styles.packageName}>
                    {p.name}
                  </Heading>
                  <Text as="p" color="secondary">
                    {p.summary}
                  </Text>
                  <p className={styles.packagePrice}>
                    <span className={styles.packagePriceValue}>{formatPrice(p.price)}</span>
                    <span className={styles.packagePriceNote}>sample price · {formatDuration(p.duration)}</span>
                  </p>
                  <ul className={styles.packageIncludes}>
                    {p.includes.map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <Button href="#book" label="Request an appointment" variant={p.isFeatured ? 'primary' : 'secondary'} />
                </VStack>
              </Card>
            </li>
          ))}
        </ul>
        <section aria-labelledby="compare-heading" className={styles.compare}>
          <Heading level={3} id="compare-heading" className={styles.compareTitle}>
            Compare what each package includes
          </Heading>
          <div className={styles.tableScroll} role="region" aria-label="Package comparison table, scrolls sideways on small screens" tabIndex={0}>
            <Table density="spacious" dividers="rows">
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Included</TableHeaderCell>
                  {spaPackages.map(p => (
                    <TableHeaderCell key={p.id}>{p.name}</TableHeaderCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Time in the studio</TableCell>
                  {spaPackages.map(p => (
                    <TableCell key={p.id}>{formatDuration(p.duration)}</TableCell>
                  ))}
                </TableRow>
                {packageFeatures.map(f => (
                  <TableRow key={f}>
                    <TableCell>{f}</TableCell>
                    {spaPackages.map(p => (
                      <TableCell key={p.id}>
                        <Included yes={p.includes.includes(f)} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Sample price</TableCell>
                  {spaPackages.map(p => (
                    <TableCell key={p.id}>{formatPrice(p.price)}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </VStack>
    </SectionShell>
  );
}
