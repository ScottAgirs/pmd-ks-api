import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Calendar = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    bookings: relationship({ many: true, ref: 'Booking.calendar' }),
    defaultSchedule: relationship({ ref: 'Schedule.defaultOn' }),
    doctor: relationship({ ref: 'Doctor.calendar' }),
    events: relationship({ many: true, ref: 'CalendarEvent.calendar' }),
    schedules: relationship({ many: true, ref: 'Schedule.calendar' }),
  },
});
