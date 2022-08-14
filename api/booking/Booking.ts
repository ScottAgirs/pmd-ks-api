import {
  checkbox,
  integer,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Booking = list({
  fields: {
    durationMins: integer({ validation: { isRequired: true } }),
    endsAt: timestamp(),
    isConfirmed: checkbox(),
    name: text(),
    startsAt: timestamp(),
    tzTarget: text(),
    // eslint-disable-next-line sort-keys
    appointment: relationship({ ref: 'Appointment.booking' }),
    calendar: relationship({ ref: 'Calendar.bookings' }),
    doctor: relationship({ ref: 'Doctor.bookings' }),
    event: relationship({ ref: 'CalendarEvent.bookings' }),
    patient: relationship({ ref: 'Patient.bookings' }),
  },
});
