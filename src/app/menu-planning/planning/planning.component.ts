import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; 
import { INITIAL_EVENTS } from './INITIAL_EVENTS';
// import { locales } from '@fullcalendar/core'; //Import the locales plugin
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls:[  './planning.component.css', '.../../../src/assets/css/StyleApplication.css'],
})
export class PlanningComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,  
    // businessHours: {  startTime: '06:00', endTime: '22:00' }, // display business hours
    dayMaxEvents: true,
    locale: 'en-GB', // Specify the locale here for consistent formatting
    dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric'  }, // Use built-in format for day header
    firstDay: 6,
    businessHours: this.getBusinessHours(),
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  getBusinessHours(): CalendarOptions['businessHours'] {
    // All days except Friday (day 5) are considered business hours
    return { daysOfWeek: [0, 1, 2, 3, 4, 6] ,startTime: '06:00', endTime: '23:00' }; // 6am to 10pm
  }
  
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }
 
  
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      // businessHours: this.getBusinessHourss(),
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }

    console.log("Clicked ")
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Open Details Of event '${clickInfo.event.title}'`)) {
      // clickInfo.event.remove();
    }

    console.log("Open Details Of event '${clickInfo.event.title}" , clickInfo.event.startStr);
    console.log("event Clicked Open Details");
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

}
