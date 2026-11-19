import type {Room, RoomType} from './data';

export type RoomFilters = {
  type: RoomType | 'all';
  seaViewOnly: boolean;
  /** Party size from the stay search. Rooms that sleep fewer are hidden. */
  guests: number;
};

export const DEFAULT_ROOM_FILTERS: Omit<RoomFilters, 'guests'> = {type: 'all', seaViewOnly: false};

export function filterRooms(list: Room[], f: RoomFilters): Room[] {
  return list.filter(
    r => (f.type === 'all' || r.type === f.type) && (!f.seaViewOnly || r.view === 'sea') && r.sleeps >= f.guests,
  );
}

export function roomResultSummary(count: number, total: number): string {
  if (count === 0) return 'No sample rooms match these filters.';
  if (count === total) return `Showing all ${total} sample rooms.`;
  return `Showing ${count} of ${total} sample rooms.`;
}
