import { relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Prompt = list({
  fields: {
    name: text(),
    publishDate: timestamp(),
    stepper: relationship({ ref: 'Stepper.prompt', many: false }),
    user: relationship({
      ref: 'User.prompts',
      ui: {
        displayMode: 'cards',
        cardFields: ['firstName', 'lastName', 'email'],
        inlineEdit: { fields: ['firstName', 'lastName', 'email'] },
        linkToItem: true,
        inlineCreate: { fields: ['firstName', 'lastName', 'email'] },
      },
    }),
  },
})