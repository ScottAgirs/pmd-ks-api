import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Language = list({
  fields: {
    label: text({ validation: { isRequired: false } }),
    value: text({ isIndexed: 'unique', validation: { isRequired: false } }),
    // eslint-disable-next-line sort-keys
    doctors: relationship({ many: true, ref: 'Doctor.languages' }),
  },
});
