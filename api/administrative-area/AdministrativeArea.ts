import { checkbox, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AdministrativeArea = list({
  fields: {
    isActive: checkbox(),
    label: text({ validation: { isRequired: true } }),
    value: text({ validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    country: relationship({ ref: 'Country.administrativeAreas' }),
  },
});
