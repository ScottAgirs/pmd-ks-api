import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AppointmentBilling = list({
  fields: {
    status: text(),
    // eslint-disable-next-line sort-keys
    appointment: relationship({ ref: 'Appointment.billing' }),
    billingItems: relationship({
      many: true,
      ref: 'AppointmentBillingItem.billing',
    }),
    // clinic: relationship({ ref: 'Clinic.billing' }),
    doctor: relationship({ ref: 'Doctor.billings' }),
  },
});
