import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

import { beforeCreateCompany } from './hooks/beforeCreateCompany';

export const Company = list({
  fields: {
    name: text({
      isIndexed: 'unique',
    }),
    slug: text({
      isIndexed: 'unique',
    }),
    // eslint-disable-next-line sort-keys
    locations: relationship({ many: true, ref: 'CompanyLocation.company' }),
    // registeredBy: relationship({ ref: "User.companies", many:  true }),
  },
  hooks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolveInput: async ({ context, inputData, operation, resolvedData }) => {
      if (operation === 'update') {
        return resolvedData;
      }

      if (operation === 'create') {
        await beforeCreateCompany({ context, inputData, resolvedData });

        return resolvedData;
      }
      return resolvedData;
    },
  },
});
