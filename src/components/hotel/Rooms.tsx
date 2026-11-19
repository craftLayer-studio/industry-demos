'use client';

import {useMemo} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Switch} from '@astryxdesign/core/Switch';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {SectionShell} from './SectionShell';
import {RoomArt} from './art';
import {RoomDialog} from './RoomDialog';
import {useStay} from './StayProvider';
import {roomTypeLabels, rooms, viewLabels, type Room, type RoomType} from './lib/data';
import {filterRooms, roomResultSummary} from './lib/rooms';
import {formatGBP, roomStayStatus, type RoomStayStatus} from './lib/rates';
import styles from './saltmarsh.module.css';

const statusText: Record<RoomStayStatus, string> = {
  'no-dates': '',
  available: 'Free for your dates',
  unavailable: 'Some nights taken',
  'too-small': 'Too small for your party',
  'min-stay': 'Needs a longer stay',
  invalid: 'Check your dates',
};

export function Rooms() {
  const {stay, filters, setFilters, openRoomId, openRoom, closeRoom} = useStay();
  const results = useMemo(() => filterRooms(rooms, {...filters, guests: stay.guests}), [filters, stay.guests]);
  const hiddenBySize = rooms.filter(r => r.sleeps < stay.guests).length;

  function clear() {
    setFilters({type: 'all', seaViewOnly: false});
  }

  return (
    <SectionShell
      id="rooms"
      eyebrow="Rooms and suites"
      title="Six rooms, each with its own view of the water"
      lead="Every room is a fictional sample drawn by hand in place of photographs. Open one for the details, then price your dates.">
      <VStack gap={6}>
        <div className={styles.filterBar}>
          <div className={styles.filterType}>
            <SegmentedControl label="Room type" value={filters.type} onChange={v => setFilters({type: v as RoomType | 'all'})}>
              <SegmentedControlItem value="all" label="All" />
              <SegmentedControlItem value="room" label="Rooms" />
              <SegmentedControlItem value="suite" label="Suites" />
              <SegmentedControlItem value="cottage" label="Cottage" />
            </SegmentedControl>
          </div>
          <Switch label="Sea view only" value={filters.seaViewOnly} onChange={v => setFilters({seaViewOnly: v})} />
          <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">
            {roomResultSummary(results.length, rooms.length)}
            {hiddenBySize > 0 ? ` ${hiddenBySize} too small for ${stay.guests} guests ${hiddenBySize === 1 ? 'is' : 'are'} hidden.` : ''}
          </p>
        </div>

        {results.length === 0 ? (
          <Card padding={8} className={styles.emptyCard}>
            <EmptyState
              title="No sample rooms match"
              description="Try another room type, turn off sea view only or reduce the number of guests."
              actions={<Button label="Clear filters" variant="primary" onClick={clear} />}
            />
          </Card>
        ) : (
          <ul className={styles.roomGrid} aria-label="Sample rooms">
            {results.map(r => (
              <li key={r.id}>
                <RoomCard room={r} onOpen={() => openRoom(r.id)} />
              </li>
            ))}
          </ul>
        )}
      </VStack>
      <RoomDialog roomId={openRoomId} onClose={closeRoom} />
    </SectionShell>
  );
}

function RoomCard({room, onOpen}: {room: Room; onOpen: () => void}) {
  const {stay} = useStay();
  const s = roomStayStatus(room, stay.checkIn, stay.checkOut, stay.guests);
  const statusLabel = statusText[s.status];
  return (
    <ClickableCard
      label={`${room.name}, ${roomTypeLabels[room.type]}, ${viewLabels[room.view]}, from ${formatGBP(room.baseRate)} a night (sample)${statusLabel ? `, ${statusLabel}` : ''}. Open details`}
      onClick={onOpen}
      padding={0}
      className={styles.roomCard}>
      <div className={styles.roomArtWrap}>
        <RoomArt room={room} />
        <span className={styles.roomTag}>{viewLabels[room.view]}</span>
      </div>
      <VStack gap={3} className={styles.roomBody}>
        <VStack gap={1}>
          <Text type="supporting" className={styles.roomType}>
            {roomTypeLabels[room.type]} · sleeps {room.sleeps}
          </Text>
          <Heading level={3} className={styles.roomTitle}>
            {room.name}
          </Heading>
          <Text as="p" color="secondary" textWrap="pretty">
            {room.summary}
          </Text>
        </VStack>
        <HStack gap={3} justify="between" vAlign="end" wrap="wrap" className={styles.roomFoot}>
          <p className={styles.roomPrice}>
            <span className={styles.roomFrom}>from</span> {formatGBP(room.baseRate)}
            <span className={styles.roomPer}> / night, sample</span>
          </p>
          {s.status === 'no-dates' ? null : (
            <span className={`${styles.stayStatus} ${s.status === 'available' ? styles.stayOk : styles.stayWarn}`}>
              {s.status === 'available' ? `${statusLabel}: ${formatGBP(s.total)}` : statusLabel}
            </span>
          )}
        </HStack>
      </VStack>
    </ClickableCard>
  );
}
