import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const TimeInterval = list({
  fields: {
    from: text(),
    to: text(),
    recurringSlot: relationship({ ref: 'RecurringSlot.timeIntervals' }),
  },
})