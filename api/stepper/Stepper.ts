import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Stepper = list({
  fields: {
    description: text(),
    eyebrow: text(),
    name: text(),
    slug: text({
      isIndexed: 'unique',
    }),
    stepsOrderBySlugs: text(),
    title: text(),
    // eslint-disable-next-line sort-keys
    prompt: relationship({ ref: 'Prompt.stepper' }),
    stepperProgs: relationship({ many: true, ref: 'StepperProg.stepper' }),
    stepperStepProgs: relationship({
      many: true,
      ref: 'StepperStepProg.stepper',
    }),
    stepperSteps: relationship({ many: true, ref: 'StepperStep.stepper' }),
  },
});
