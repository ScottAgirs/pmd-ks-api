
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';

export const User = list({
  hooks: {
    afterOperation: async ({ context, item, operation }) => {
      console.log('afterOperation: :: operation', operation);
      const { query } = context
      console.log('afterOperation: :: item', item);
      
      if (operation === 'create') {
        if (!item) throw new Error('Failed to create User item.')
        console.log(`New user created. First Name: ${item?.firstName}, Email: ${item?.email}`);
        
        const createdPrompt = await query.Prompt.createOne({ data: {
          name: "Automated prompt",
          user: {
            connect: {
              id: item.id
            }
          },
        }})
        
        console.log('afterOperation: :: createdPrompt', createdPrompt);
      }
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