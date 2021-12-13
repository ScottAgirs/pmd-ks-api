import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperProg = list({
  fields: {
    name: text(),
    isCompleted: checkbox(),
    // TODO: user
    stepper: relationship({ ref: 'Stepper.stepperProgs', many: false }),
    // TODO: stepperStepProgs
  },
})