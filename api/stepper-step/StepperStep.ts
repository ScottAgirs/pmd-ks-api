import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperStep = list({
  fields: {
    title: text(),
    description: text(),
    component: text(),
    slug: text(),
    isFinal: checkbox(),
    order: integer({ validation: { isRequired: true } }),
    stepper: relationship({ ref: 'Stepper.stepperSteps', many: false }),
    stepperStepProg: relationship({ ref: 'StepperStepProg.stepperStep', many: false }),
  },
})