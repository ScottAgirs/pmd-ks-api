import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Booking = list({
  fields: {
    name: text(),
    isConfirmed: checkbox(),
    durationMins: integer({ validation: { isRequired: true } }),
    startsAt: timestamp(),
    notes: text({ validation: { isRequired: false } }),
    patient: relationship({ ref: 'Patient.bookings', many: true }),
    event: relationship({ ref: 'CalendarEvent.bookings', many: true }),
    // TODO: doctor
    // TODO: calendar
  },
})