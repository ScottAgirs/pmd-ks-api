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
    stepperSteps: relationship({ ref: 'StepperStep.stepper', many: true }),
    // // TODO: stepperProgs
    // stepperProgs: relationship({ ref: 'StepperProgs.stepper', many: true }),
    // // TODO: stepperStepProgs
    // stepperStepProgs: relationship({ ref: 'Stepper.stepper', many: true }),
  },
})