import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const RecurringSlot = list({
  fields: {
    wday: text(),
    isActive: checkbox(),
    interval: text(),
    intervalCount: integer(),
    schedule: relationship({ ref: 'Schedule.recurringSlots' }),
    timeIntervals: relationship({ ref: 'TimeInterval.recurringSlot', many: true }),
  },
})