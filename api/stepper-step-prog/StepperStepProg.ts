import { checkbox, integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const StepperStepProg = list({
  fields: {
    isCompleted: checkbox(),
    name: text(),
    percentDone: integer(),
    stepper: relationship({ ref: 'Stepper.stepperStepProgs' }),
    stepperProg: relationship({ ref: 'StepperProg.stepperStepProgs' }),
    stepperStep: relationship({ ref: 'StepperStep.stepperStepProg' }),
    user: relationship({ ref: 'User.stepperStepProgs' }),
  },
});
