
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { afterCreateUser } from './afterCreateUser';
import { beforeCreateUser } from './beforeCreateUser';

export const User = list({
  hooks: {
    afterOperation: async ({ context, item, operation }) => {
      if (operation === 'create') {
        afterCreateUser({ context, item })
      }
    },
    beforeOperation: async ({ context, item, operation }) => {
      if (operation === 'create') {
        beforeCreateUser({ context, item })
      }
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
    calendar: relationship({ ref: 'Calendar.user' }),
    country: text(),
    addressLine1: text(),
    addressLine2: text(),
    administrativeArea: text(),
    locality: text(),
    postalCode: text(),
    thoroughfare: text(),
    premise: text(),
    dateOfBirth: timestamp(),
    doctor: relationship({ ref: 'Doctor.user' }),
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    middleName: text(),
    password: password({ validation: { isRequired: true } }),
    prompts: relationship({ ref: 'Prompt.user', many: true }),
    patient: relationship({ ref: 'Patient.user' }),
    sex: text(),
    stepperProgs: relationship({ ref: 'StepperProg.user', many: true }),
    stepperStepProgs: relationship({ ref: 'StepperStepProg.user', many: true }),
    username: text({ validation: { isRequired: true } }),
  },
  ui: {
    labelField: 'email',
    listView: {
      initialColumns: ['firstName', 'lastName', 'email', "id"],
    },
  },
})