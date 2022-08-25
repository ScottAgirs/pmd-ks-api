import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const HealthCondition = list({
  fields: {
    diagnosedAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    name: text(),
    relation: text(),
    // eslint-disable-next-line sort-keys
    patient: relationship({ ref: 'Patient.healthConditions' }),
  },
});
