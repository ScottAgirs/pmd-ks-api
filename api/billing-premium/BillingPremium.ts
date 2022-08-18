import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const BillingPremium = list({
  fields: {
    code: text({ isIndexed: true }),
    name: text({ isIndexed: true }),
    // eslint-disable-next-line sort-keys
    appointmentBillingItems: relationship({
      many: true,
      ref: 'AppointmentBillingItem.premium',
    }),
  },
});
