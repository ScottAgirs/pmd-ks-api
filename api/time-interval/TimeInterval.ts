import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const TimeInterval = list({
  fields: {
    from: text(),
    to: text(),
    // eslint-disable-next-line sort-keys
    recurringSlot: relationship({ ref: 'RecurringSlot.timeIntervals' }),
  },
});
