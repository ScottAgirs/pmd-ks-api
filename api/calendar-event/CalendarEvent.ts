import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CalendarEvent = list({
  fields: {
    bookings: relationship({ ref: 'Booking.event', many: true }),
    calendar: relationship({ ref: 'Calendar.events' }),
    eventType: relationship({ ref: 'CalendarEventType.events' }),
    description: text({ validation: { isRequired: true } }),
    durationMins: integer({ validation: { isRequired: true } }),
    isConfirmationRequired: checkbox(),
    schedule: relationship({ ref: 'Schedule.events' }),
    title: text({ validation: { isRequired: true } }),
  },
})