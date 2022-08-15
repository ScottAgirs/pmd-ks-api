import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const FormType = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    forms: relationship({ many: true, ref: 'Form.formType' }),
  },
});
