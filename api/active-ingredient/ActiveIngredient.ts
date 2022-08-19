import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const ActiveIngredient = list({
  fields: {
    drugCode: text({ isIndexed: true }),
    ingredientName: text({ isIndexed: 'unique' }),
    strengthUnit: text(),
    strengthValue: text(),
    // eslint-disable-next-line sort-keys
    medication: relationship({ ref: 'Medication.activeIngredients' }),
  },
});
