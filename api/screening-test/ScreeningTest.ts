import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const ScreeningTest = list({
  fields: {
    name: text(),
    testedAt: timestamp(),
    // eslint-disable-next-line sort-keys
    patient: relationship({ ref: 'Patient.screeningTests' }),
  },
});
