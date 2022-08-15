import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

import { beforeCreateCompanyLocation } from './hooks/beforeCreateCompanyLocation';

export const CompanyLocation = list({
  fields: {
    facilityMasterNumber: text({
      isIndexed: 'unique',
    }),
    locationType: text(),
    name: text(),
    serviceLocationIndicator: text({
      isIndexed: 'unique',
    }),
    slug: text(),
    // eslint-disable-next-line sort-keys
    company: relationship({ ref: 'Company.locations' }),
    // registeredBy: relationship({ ref: "User.locations", many:  true }),
  },
  hooks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolveInput: async ({ context, inputData, operation, resolvedData }) => {
      if (operation === 'update') {
        return resolvedData;
      }

      if (operation === 'create') {
        await beforeCreateCompanyLocation({ context, inputData, resolvedData });

        return resolvedData;
      }

      return resolvedData;
    },
  },
});
