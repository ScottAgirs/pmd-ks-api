import { integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const BillingClaim = list({
  fields: {
    amount: integer(),
    description: text({ isIndexed: true }),
    feeCode: text({ isIndexed: true }),
    // eslint-disable-next-line sort-keys
    appointmentBillingItems: relationship({
      many: true,
      ref: 'AppointmentBillingItem.claim',
    }),
  },
});
