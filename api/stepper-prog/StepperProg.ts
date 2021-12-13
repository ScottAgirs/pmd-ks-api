import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperProg = list({
  fields: {
    name: text(),
    isCompleted: checkbox(),
    stepper: relationship({ ref: 'Stepper.stepperProgs', many: false }),
    stepperStepProgs: relationship({ ref: 'StepperStepProg.stepperProg', many: true }),
    user: relationship({ ref: 'User.stepperProgs', many: false }),
  },
})