import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AppointmentBillingItem = list({
  fields: {
    diagnosisCode: text(),
    feeCode: text(),
    units: text(),
    // eslint-disable-next-line sort-keys
    billing: relationship({ ref: 'AppointmentBilling.billingItems' }),
  },
});
