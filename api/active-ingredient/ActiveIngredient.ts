import { float, integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const ActiveIngredient = list({
  fields: {
    brandName: text({ isIndexed: true }),
    drugCode: integer({ isIndexed: true }),
    strengthCount: float(),
    strengthUnit: text(),
    // eslint-disable-next-line sort-keys
    medication: relationship({
      many: true,
      ref: 'Medication.activeIngredients',
    }),
  },
});
