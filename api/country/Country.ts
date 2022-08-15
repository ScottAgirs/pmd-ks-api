import { checkbox, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Country = list({
  fields: {
    administrativeAreas: relationship({
      many: true,
      ref: 'AdministrativeArea.country',
    }),
    isActive: checkbox(),
    label: text({ validation: { isRequired: true } }),
    value: text({ validation: { isRequired: true } }),
  },
});
