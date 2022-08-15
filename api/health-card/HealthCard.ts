import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const HealthCard = list({
  fields: {
    dateOfBirth: timestamp({ validation: { isRequired: true } }),
    expiryDate: timestamp({ validation: { isRequired: true } }),
    insurancePolicyNumber: text({ validation: { isRequired: true } }),
    insuranceProvider: text(),
    nameOnCard: text({ validation: { isRequired: true } }),
    versionCode: text({ validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    patient: relationship({ ref: 'Patient.healthCards' }),
    userInvite: relationship({ ref: 'UserInvite.healthCard' }),
  },
});
