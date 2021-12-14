
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { afterCreateUser } from './afterCreateUser';

export const User = list({
  hooks: {
    afterOperation: async ({ context, item, operation }) => {
      if (operation === 'create') afterCreateUser({ context, item })
    }
  },
  fields: {
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    cellPhoneNumberString: text(),
    homePhoneNumberString: text(),
    country: text(),
    administrativeArea: text(),
    locality: text(),
    postalCode: text(),
    thoroughfare: text(),
    premise: text(),
    dateOfBirth: timestamp(),
    doctor: relationship({ ref: 'Doctor.user', many: false }),
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    password: password({ validation: { isRequired: true } }),
    prompts: relationship({ ref: 'Prompt.user', many: true }),
    patient: relationship({ ref: 'Patient.user', many: false }),
    sex: text(),
    stepperProgs: relationship({ ref: 'StepperProg.user', many: true }),
    stepperStepProgs: relationship({ ref: 'StepperStepProg.user', many: true }),
  },
  ui: {
    listView: {
      initialColumns: ['firstName', 'lastName', 'email', "id"],
    },
  },
})