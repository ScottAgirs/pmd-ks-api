import { relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Prompt = list({
  fields: {
    stepper: relationship({ ref: 'Stepper.prompt' }),
    user: relationship({ ref: 'User.prompts' }),
    name: text(),
    promptType: text(),
    promptValue: text(),
    slug: text(),
  },
})