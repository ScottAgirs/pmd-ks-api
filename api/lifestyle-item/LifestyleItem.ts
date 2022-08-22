import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const LifestyleItem = list({
  fields: {
    activity: text(),
    frequency: text(),
    item: text(),
    patient: relationship({ ref: 'Patient.lifestyleItems' }),
  },
});
