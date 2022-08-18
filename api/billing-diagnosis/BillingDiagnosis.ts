import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const BillingDiagnosis = list({
  fields: {
    code: text({ isIndexed: true }),
    description: text({ isIndexed: true }),
    // eslint-disable-next-line sort-keys
    appointmentBillingItems: relationship({
      many: true,
      ref: 'AppointmentBillingItem.diagnosis',
    }),
  },
});
