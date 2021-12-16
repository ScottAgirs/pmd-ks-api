import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Booking = list({
  fields: {    
    calendar: relationship({ ref: 'Calendar.bookings' }),
    doctor: relationship({ ref: 'Doctor.bookings' }),
    durationMins: integer({ validation: { isRequired: true } }),
    event: relationship({ ref: 'CalendarEvent.bookings' }),
    isConfirmed: checkbox(),
    name: text(),
    notes: text({ validation: { isRequired: false } }),
    patient: relationship({ ref: 'Patient.bookings' }),
    startsAt: timestamp(),
    endsAt: timestamp(),
  },
})