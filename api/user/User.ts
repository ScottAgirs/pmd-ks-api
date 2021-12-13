
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { afterCreateUser } from './afterCreateUser';

export const User = list({
  hooks: {
    afterOperation: async ({ context, item, operation }) => {
      if (operation === 'create') afterCreateUser({ context, item })
    }
  },
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    prompts: relationship({ ref: 'Prompt.user', many: true }),
    patient: relationship({ ref: 'Patient.user', many: false }),
  },
  ui: {
    listView: {
      initialColumns: ['firstName', 'lastName', 'email', "id"],
    },
  },
})