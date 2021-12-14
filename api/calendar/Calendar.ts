import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Calendar = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    events: relationship({ ref: 'CalendarEvent.calendar', many: true }),
    bookings: relationship({ ref: 'Booking.calendar', many: true }),
    doctor: relationship({ ref: 'Doctor.calendar', many: false }),
    // TODO: schedules
    // TODO: defaultSchedule
  },
}) 