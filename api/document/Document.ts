import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Document = list({
  fields: {
    addedAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    title: text(),
    // eslint-disable-next-line sort-keys
    doctor: relationship({ ref: 'Doctor.documents' }),
    patient: relationship({ ref: 'Patient.documents' }),
  },
});
