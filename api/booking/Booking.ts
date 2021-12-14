import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Booking = list({
  fields: {    
    calendar: relationship({ ref: 'Calendar.bookings', many: false }),
    doctor: relationship({ ref: 'Doctor.bookings', many: false }),
    durationMins: integer({ validation: { isRequired: true } }),
    event: relationship({ ref: 'CalendarEvent.bookings', many: false }),
    isConfirmed: checkbox(),
    name: text(),
    notes: text({ validation: { isRequired: false } }),
    patient: relationship({ ref: 'Patient.bookings', many: false }),
    startsAt: timestamp(),
  },
})