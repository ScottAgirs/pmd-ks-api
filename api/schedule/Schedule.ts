import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Schedule = list({
  fields: {
    // TODO: Link to bookings
    // bookings: relationship({ ref: 'Booking.schedule', many: true }),
    calendar: relationship({ ref: 'Calendar.schedules' }),
    description: text(),
    defaultOn: relationship({ ref: 'Calendar.defaultSchedule' }),
    recurringSlots: relationship({ ref: 'RecurringSlot.schedule', many: true }),
    tz: text(),
    title: text({ validation: { isRequired: true } }),
  },
}) 