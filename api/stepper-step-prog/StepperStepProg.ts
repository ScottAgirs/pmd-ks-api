import { checkbox, integer, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperStepProg = list({
  fields: {
    name: text(),
    percentDone: integer({ validation: { isRequired: true } }),
    isCompleted: checkbox(),
    stepper: relationship({ ref: 'Stepper.stepperStepProgs', many: false }),
    stepperStep: relationship({ ref: 'StepperStep.stepperStepProg', many: false }),
    stepperProg: relationship({ ref: 'StepperProg.stepperStepProgs', many: false }),
    // TODO: user
  },
})