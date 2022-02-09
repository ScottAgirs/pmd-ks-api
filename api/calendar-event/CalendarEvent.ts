import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CalendarEvent = list({
  fields: {
    bookings: relationship({ ref: 'Booking.event', many: true }),
    calendar: relationship({ ref: 'Calendar.events' }),
    description: text(),
    doctor: relationship({ ref: 'Doctor.calendarEvents' }),
    durationMins: integer({ validation: { isRequired: true } }),
    eventType: relationship({ ref: 'CalendarEventType.events' }),
    isActive: checkbox(),
    isConfirmationRequired: checkbox(),
    title: text({ validation: { isRequired: true } }),
  },
})