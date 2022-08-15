import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const PrescriptionItem = list({
  fields: {
    instructions: text(),
    luCode: text(),
    refills: text(),
    // eslint-disable-next-line sort-keys
    medication: relationship({ ref: 'Medication.prescriptionItem' }),
    prescription: relationship({ ref: 'Prescription.prescriptionItems' }),
  },
});
