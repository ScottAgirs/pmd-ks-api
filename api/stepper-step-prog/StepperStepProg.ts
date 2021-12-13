import { checkbox, integer, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const StepperStepProg = list({
  fields: {
    name: text(),
    percentDone: integer({ validation: { isRequired: true } }),
    isCompleted: checkbox(),
    // TODO: stepper
    // patient: relationship({ ref: 'Patient.bookings', many: true }),
    // TODO: stepperStep
    // TODO: user
  },
})