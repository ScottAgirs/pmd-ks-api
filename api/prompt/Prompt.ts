import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Prompt = list({
  fields: {
    name: text(),
    promptType: text(),
    promptValue: text(),
    slug: text(),
    stepper: relationship({ ref: 'Stepper.prompt' }),
    user: relationship({ ref: 'User.prompts' }),
  },
});
