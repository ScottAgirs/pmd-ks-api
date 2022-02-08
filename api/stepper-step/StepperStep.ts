import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperStep = list({
  fields: {
    component: text(),
    description: text(),
    isFinal: checkbox(),
    label: text(),
    order: integer({ validation: { isRequired: true } }),
    slug: text(),
    stepper: relationship({ ref: 'Stepper.stepperSteps' }),
    stepperStepProg: relationship({ ref: 'StepperStepProg.stepperStep' }),
    title: text(),
  },
})