import { integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AppointmentBillingItem = list({
  fields: {
    units: integer(),
    // eslint-disable-next-line sort-keys
    billing: relationship({ ref: 'AppointmentBilling.billingItems' }),
    claim: relationship({ ref: 'BillingClaim.appointmentBillingItems' }),
    diagnosis: relationship({
      ref: 'BillingDiagnosis.appointmentBillingItems',
    }),
    premium: relationship({
      ref: 'BillingPremium.appointmentBillingItems',
    }),
  },
});
