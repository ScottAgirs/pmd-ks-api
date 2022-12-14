import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const BillingPremium = list({
  fields: {
    amount: text({ isIndexed: true }),
    code: text({ isIndexed: true }),
    description: text({ isIndexed: true }),
    feeCode: text({ isIndexed: true }),
    // eslint-disable-next-line sort-keys
    appointmentBillingItems: relationship({
      many: true,
      ref: 'AppointmentBillingItem.premium',
    }),
  },
});
