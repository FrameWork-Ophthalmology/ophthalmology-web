import { EventInput } from '@fullcalendar/core';

let eventGuid =2;
const today = new Date();
const june6th2025 = new Date(2025, 5, 6); // Month is 0-indexed (January is 0)

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: today, 
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), //Add 1 day for end date, making it all day
    allDay: true //Crucial for all-day events
  },
  {
    id: createEventId(),
    title: 'Operation 1 In Clinique Test 1',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 3, 0, 0)
  },
  {
    id: createEventId(),
    title: 'Operation 2 4566 In Clinique Test 2',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 4, 0, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0)
  },
  {
    id: createEventId(),
    title: 'Operation 323455 64gg test In Clinique Test 3',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0)
  },
  {
    id: createEventId(),
    title: 'Operation 4 tesfg designation ar In Clinique Test 6',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0, 0)
  },
  {
    id: createEventId(),
    title: 'Operation 5 In Clinique Test 4',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0)
  },
  {
    id: createEventId(),
    title: 'Operation 1 In Clinique Test 2',
    start: new Date(june6th2025.getFullYear(), june6th2025.getMonth(), june6th2025.getDate(), 13, 0, 0),
    end: new Date(june6th2025.getFullYear(), june6th2025.getMonth(), june6th2025.getDate(), 16, 0, 0)
  }
];

export function createEventId() {
  return String(eventGuid++);
}