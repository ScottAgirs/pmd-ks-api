import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const PrescriptionItem = list({
  fields: {
    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    instructions: text(),
    luCode: text(),
    refills: text(),
    // eslint-disable-next-line sort-keys
    medication: relationship({ ref: 'Medication.prescriptionItems' }),
    prescription: relationship({ ref: 'Prescription.prescriptionItems' }),
  },
});
