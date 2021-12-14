import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CalendarEvent = list({
  fields: {
    description: text({ validation: { isRequired: true } }),
    title: text({ validation: { isRequired: true } }),
    isConfirmationRequired: checkbox(),
    // // TODO: calendar
    // calendar: relationship({ ref: 'Calendar.calendarEvents', many: false }),
    // // TODO: bookings
    // bookings: relationship({ ref: 'Booking.calendarEvent', many: false }),
    // // TODO: schedule
    // patient: relationship({ ref: 'Patient.bookings', many: false }),
    calendarEventType: relationship({ ref: 'CalendarEventType.events', many: false }),
  },
})