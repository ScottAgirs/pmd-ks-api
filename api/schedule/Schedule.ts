import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Schedule = list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text(),
    calendar: relationship({ ref: 'Calendar.schedules', many: false }),
    events: relationship({ ref: 'CalendarEvent.schedule', many: true }),
    defaultOn: relationship({ ref: 'Calendar.defaultSchedule', many: false }),
    recurringSlots: relationship({ ref: 'RecurringSlot.schedule', many: true }),
  },
}) 