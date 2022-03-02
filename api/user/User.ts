
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  checkbox,
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
    // Address start
    country: text(),
    addressLine1: text(),
    addressLine2: text(),
    administrativeArea: text(),
    locality: text(),
    postalCode: text(),
    thoroughfare: text(),
    premise: text(),
    // Address end
    contracts: relationship({ ref: 'Contract.signedBy', many: true }),
    dateOfBirth: timestamp(),
    doctor: relationship({ ref: 'Doctor.user' }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    middleName: text(),
    isDummy: checkbox(),
    password: password({ validation: { isRequired: true } }),
    // Phone numbers start
    cellPhoneNumberString: text(),
    homePhoneNumberString: text(),
    // Phone numbers end
    prompts: relationship({ ref: 'Prompt.user', many: true }),
    patient: relationship({ ref: 'Patient.user' }),
    photoSrcString: text(),
    sex: text(),
    stepperProgs: relationship({ ref: 'StepperProg.user', many: true }),
    stepperStepProgs: relationship({ ref: 'StepperStepProg.user', many: true }),
    username: text({ isIndexed: 'unique', validation: { isRequired: true} }),
  },
  ui: {
    labelField: 'email',
    listView: {
      initialColumns: ['firstName', 'lastName', 'email', "id"],
    },
  },
})