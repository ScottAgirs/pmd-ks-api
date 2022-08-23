import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AllergyItem = list({
  fields: {
    name: text(),
    onsetDate: timestamp(),
    reaction: text(),
    // eslint-disable-next-line sort-keys
    patient: relationship({ ref: 'Patient.allergies' }),
  },
});
