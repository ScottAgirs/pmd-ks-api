import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  timestamp,
  checkbox,
} from '@keystone-6/core/fields';
import { afterCreateUser } from './afterCreateUser';

export const User = list({
  fields: {
    subjectId: text({
      isIndexed: 'unique',
    }),
    // eslint-disable-next-line sort-keys
    cellPhoneNumberString: text(),
    contracts: relationship({ many: true, ref: 'Contract.signedBy' }),
    dateOfBirth: timestamp(),
    doctor: relationship({ ref: 'Doctor.user' }),
    email: text({
      isFilterable: true,
      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    firstName: text(),
    homePhoneNumberString: text(),
    isAdmin: checkbox(),
    isDummy: checkbox(),
    isOnboarded: checkbox(),
    isOnboardedDoctor: checkbox(),
    lastName: text(),
    middleName: text(),
    photoSrc: text(),
    sex: text(),
    username: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    address: relationship({ ref: 'Address.user' }),
    patient: relationship({ ref: 'Patient.user' }),
    profilePhoto: relationship({ ref: 'ProfilePhoto.user' }),
    prompts: relationship({ many: true, ref: 'Prompt.user' }),
    signUpInvite: relationship({ ref: 'UserInvite.signedUpUser' }),
    stepperProgs: relationship({ many: true, ref: 'StepperProg.user' }),
    stepperStepProgs: relationship({ many: true, ref: 'StepperStepProg.user' }),
    userInvites: relationship({ many: true, ref: 'UserInvite.invitedByUser' }),
  },
  hooks: {
    afterOperation: async ({ context, item, operation }) => {
      if (operation === 'create') {
        afterCreateUser({ context, item });
      }
    },
  },
  ui: {
    labelField: 'email',
    listView: {
      initialColumns: ['firstName', 'lastName', 'email', 'id'],
    },
  },
});
