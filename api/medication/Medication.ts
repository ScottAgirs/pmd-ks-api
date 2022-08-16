import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Medication = list({
  fields: {
    brandName: text({ isIndexed: true }),
    drugCode: text({ isIndexed: 'unique' }),
    drugIdentificationNumber: text({ isIndexed: 'unique' }),
    // eslint-disable-next-line sort-keys
    activeIngredients: relationship({
      many: true,
      ref: 'ActiveIngredient.medication',
    }),
    patients: relationship({ many: true, ref: 'Patient.medications' }),
    prescription: relationship({ ref: 'Prescription.medications' }),
    prescriptionItem: relationship({ ref: 'PrescriptionItem.medication' }),
  },
});
