import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Pharmacy = list({
  fields: {
    companyName: text({ isIndexed: 'unique' }),
    // Relationships
    locations: relationship({ many: true, ref: 'PharmacyLocation.pharmacy' }),
  },
});
