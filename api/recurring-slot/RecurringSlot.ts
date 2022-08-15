import { checkbox, integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const RecurringSlot = list({
  fields: {
    interval: text(),
    intervalCount: integer(),
    isActive: checkbox(),
    wday: text(),
    // eslint-disable-next-line sort-keys
    schedule: relationship({ ref: 'Schedule.recurringSlots' }),
    timeIntervals: relationship({
      many: true,
      ref: 'TimeInterval.recurringSlot',
    }),
  },
});
