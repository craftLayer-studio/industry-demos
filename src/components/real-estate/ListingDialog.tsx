'use client';

import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {FloorPlan, PropertyArt} from './PropertyArt';
import {useEstate} from './EstateProvider';
import {areaById, propertyById} from './lib/data';
import {formatListingPrice, plural} from './lib/format';
import styles from './ashgrove.module.css';

/** Listing detail: elevation drawing, floor plan, key facts and next steps. */
export function ListingDialog({propertyId, onClose}: {propertyId: string | null; onClose: () => void}) {
  const property = propertyId ? propertyById(propertyId) : undefined;
  return (
    <Dialog
      isOpen={Boolean(property)}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      width={920}
      maxHeight="90dvh"
      padding={0}>
      {property ? <DialogBody id={property.id} onClose={onClose} /> : <span />}
    </Dialog>
  );
}

function DialogBody({id, onClose}: {id: string; onClose: () => void}) {
  const {requestViewing, estimateFor} = useEstate();
  const p = propertyById(id)!;
  const area = areaById(p.area);

  return (
    <>
      <DialogHeader
        className={styles.dialogHeader}
        title={p.title}
        subtitle={`${p.street === p.title ? '' : `${p.street}, `}${area.name}, Wealdbury (fictional)`}
        onOpenChange={open => {
          if (!open) onClose();
        }}
      />
      <VStack gap={6} className={styles.dialogBody}>
        <div className={styles.dialogArt}>
          <figure className={styles.dialogFigure}>
            <PropertyArt property={p} label={`Line drawing of the front of ${p.title}`} />
            <figcaption>Front elevation, illustrative drawing</figcaption>
          </figure>
          <figure className={styles.dialogFigure}>
            <FloorPlan property={p} />
            <figcaption>Ground-floor plan, illustrative</figcaption>
          </figure>
        </div>

        <HStack gap={4} vAlign="end" justify="between" wrap="wrap">
          <VStack gap={1}>
            <Text type="supporting" color="secondary">
              {p.mode === 'buy' ? 'Asking price (sample)' : 'Monthly rent (sample)'}
            </Text>
            <p className={styles.dialogPrice}>{formatListingPrice(p.price, p.mode)}</p>
          </VStack>
          <Text type="supporting" color="secondary">
            Added {p.listedDaysAgo === 1 ? 'yesterday' : `${p.listedDaysAgo} days ago`} (demo listing)
          </Text>
        </HStack>

        <Text as="p" type="large" textWrap="pretty">
          {p.summary}
        </Text>

        <MetadataList columns="multi">
          <MetadataListItem label="Type">{p.kind}</MetadataListItem>
          <MetadataListItem label="Bedrooms">{plural(p.beds, 'bedroom')}</MetadataListItem>
          <MetadataListItem label="Bathrooms">{plural(p.baths, 'bathroom')}</MetadataListItem>
          <MetadataListItem label="Reception rooms">{p.receptions}</MetadataListItem>
          <MetadataListItem label="Internal area">{p.sqft.toLocaleString('en-GB')} sq ft</MetadataListItem>
          <MetadataListItem label={p.mode === 'buy' ? 'Tenure' : 'Let type'}>
            {p.mode === 'buy' ? (p.tenure ?? 'Freehold') : 'Assured shorthold tenancy'}
          </MetadataListItem>
        </MetadataList>

        <section aria-labelledby="dlg-features" className={styles.dialogBlock}>
          <Heading level={3} id="dlg-features" className={styles.dialogHeading}>
            What stands out
          </Heading>
          <ul className={styles.featureList}>
            {p.features.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="dlg-area" className={styles.dialogBlock}>
          <Heading level={3} id="dlg-area" className={styles.dialogHeading}>
            About {area.name}
          </Heading>
          <Text as="p" color="secondary">
            {area.tagline}. {area.walkToCentre === 'In the centre' ? 'Right in the town centre.' : `${area.walkToCentre} to the market square.`}
          </Text>
        </section>
      </VStack>
      <HStack gap={3} justify="end" wrap="wrap" className={styles.dialogFooter}>
        <Button label="Close" variant="ghost" onClick={onClose} />
        {p.mode === 'buy' ? (
          <Button label="Estimate repayments" variant="secondary" onClick={() => estimateFor(p.price)} />
        ) : null}
        <Button label="Request a viewing" variant="primary" onClick={() => requestViewing(p.id)} />
      </HStack>
    </>
  );
}
