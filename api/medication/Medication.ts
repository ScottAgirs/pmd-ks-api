import { integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Medication = list({
  fields: {
    brandName: text({ isIndexed: true }),
    companyName: text({ isIndexed: true }),
    drugCode: integer({ isIndexed: true }),
    drugIdentificationNumber: integer({ isIndexed: 'unique' }),
    // eslint-disable-next-line sort-keys
    activeIngredients: relationship({
      many: true,
      ref: 'ActiveIngredient.medication',
    }),
    patient: relationship({ ref: 'Patient.medications' }),
    prescription: relationship({ ref: 'Prescription.medications' }),
    prescriptionItem: relationship({ ref: 'PrescriptionItem.medication' }),
  },
});
