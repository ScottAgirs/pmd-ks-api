import {
  checkbox,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { list } from '@keystone-6/core';

export const Contract = list({
  fields: {
    body: document({
      dividers: true,
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
    }),
    effectiveFrom: timestamp(),
    isActive: checkbox(),
    lastUpdated: timestamp(),
    name: text(),
    slug: text({
      isIndexed: 'unique',
    }),
    // eslint-disable-next-line sort-keys
    signedBy: relationship({ many: true, ref: 'User.contracts' }),
  },
});
