import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Stepper = list({
  fields: {
    title: text(),
    name: text(),
    slug: text(),
    description: text(),
    eyebrow: text(),
    prompt: relationship({ ref: 'Prompt.stepper', many: false }),
    // TODO: stepperSteps
    // TODO: stepperProgs
    // TODO: stepperStepProgs
  },
})