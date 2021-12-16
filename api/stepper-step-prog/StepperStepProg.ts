import { checkbox, integer, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperStepProg = list({
  fields: {
    name: text(),
    percentDone: integer(),
    isCompleted: checkbox(),
    stepper: relationship({ ref: 'Stepper.stepperStepProgs' }),
    stepperStep: relationship({ ref: 'StepperStep.stepperStepProg' }),
    stepperProg: relationship({ ref: 'StepperProg.stepperStepProgs' }),
    user: relationship({ ref: 'User.stepperStepProgs' }),
  },
})