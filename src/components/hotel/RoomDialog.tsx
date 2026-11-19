'use client';

import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {RoomArt} from './art';
import {useStay} from './StayProvider';
import {roomById, roomTypeLabels, viewLabels} from './lib/data';
import {WEEKEND_UPLIFT, formatGBP, nightlyRate} from './lib/rates';
import styles from './saltmarsh.module.css';

/** Room detail: a larger drawing, key facts, features and next steps. */
export function RoomDialog({roomId, onClose}: {roomId: string | null; onClose: () => void}) {
  const room = roomId ? roomById(roomId) : undefined;
  return (
    <Dialog
      isOpen={Boolean(room)}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      width={860}
      maxHeight="90dvh"
      padding={0}>
      {room ? <DialogBody id={room.id} onClose={onClose} /> : <span />}
    </Dialog>
  );
}

function DialogBody({id, onClose}: {id: string; onClose: () => void}) {
  const {chooseRoom} = useStay();
  const room = roomById(id)!;
  const weekend = nightlyRate(room, '2027-01-01'); // a Friday: shows the weekend rate

  return (
    <>
      <DialogHeader
        className={styles.dialogHeader}
        title={room.name}
        subtitle={`${roomTypeLabels[room.type]} · ${viewLabels[room.view]} · The Saltmarsh (fictional)`}
        onOpenChange={open => {
          if (!open) onClose();
        }}
      />
      <VStack gap={6} className={styles.dialogBody}>
        <figure className={styles.dialogFigure}>
          <RoomArt room={room} className={styles.dialogArt} />
          <figcaption>Illustrative drawing, not a photograph</figcaption>
        </figure>
        <Text as="p" type="large" textWrap="pretty">
          {room.description}
        </Text>
        <MetadataList columns="multi">
          <MetadataListItem label="Sleeps">{room.sleeps} guests</MetadataListItem>
          <MetadataListItem label="Beds">{room.bed}</MetadataListItem>
          <MetadataListItem label="Size">{room.sizeSqm} m²</MetadataListItem>
          <MetadataListItem label="View">{viewLabels[room.view]}</MetadataListItem>
          <MetadataListItem label="Sunday to Thursday">{formatGBP(room.baseRate)} a night (sample)</MetadataListItem>
          <MetadataListItem label="Friday and Saturday">
            {formatGBP(weekend)} a night (+{Math.round(WEEKEND_UPLIFT * 100)}%, sample)
          </MetadataListItem>
          <MetadataListItem label="Minimum stay">
            {room.minNights > 1 ? `${room.minNights} nights` : '1 night, or 2 with a Saturday'}
          </MetadataListItem>
        </MetadataList>
        <section aria-labelledby="room-dlg-features" className={styles.dialogBlock}>
          <Heading level={3} id="room-dlg-features" className={styles.dialogHeading}>
            In the room
          </Heading>
          <ul className={styles.featureList}>
            {room.features.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      </VStack>
      <HStack gap={3} justify="end" wrap="wrap" className={styles.dialogFooter}>
        <Button label="Close" variant="ghost" onClick={onClose} />
        <Button label="Price my dates" variant="secondary" onClick={() => chooseRoom(room.id, 'rates')} />
        <Button label="Request this room" variant="primary" onClick={() => chooseRoom(room.id, 'book')} />
      </HStack>
    </>
  );
}
