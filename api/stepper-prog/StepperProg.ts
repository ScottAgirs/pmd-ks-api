import { checkbox, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const StepperProg = list({
  fields: {
    isCompleted: checkbox(),
    name: text(),
    stepper: relationship({ ref: 'Stepper.stepperProgs' }),
    stepperStepProgs: relationship({
      many: true,
      ref: 'StepperStepProg.stepperProg',
    }),
    user: relationship({ ref: 'User.stepperProgs' }),
  },
});
