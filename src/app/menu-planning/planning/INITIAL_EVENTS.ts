import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const TODAY_STR2 = ('2025-06-06'); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Operation 1 In Clinique Test 1',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Operation 2 In Clinique Test 1',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
  ,
  {
    id: createEventId(),
    title: 'Operation 1 In Clinique Test 1',
    start: TODAY_STR2 + 'T13:00:00',
    end: TODAY_STR2 + 'T16:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}