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
    prescriptionItems: relationship({
      many: true,
      ref: 'PrescriptionItem.medication',
    }),
  },
});
