import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CalendarEvent = list({
  fields: {
    description: text({ validation: { isRequired: true } }),
    title: text({ validation: { isRequired: true } }),
    isConfirmationRequired: checkbox(),
    calendar: relationship({ ref: 'Calendar.events', many: false }),
    bookings: relationship({ ref: 'Booking.event', many: true }),
    calendarEventType: relationship({ ref: 'CalendarEventType.events', many: false }),
  },
})