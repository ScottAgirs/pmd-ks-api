import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const EmergencyContact = list({
  fields: {
    // Maybe add a relationship to the patient?
    cellPhoneNumberString: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: false } }),
    firstName: text({ validation: { isRequired: true } }),
    homePhoneNumberString: text(),
    lastName: text({ validation: { isRequired: true } }),
    relation: text(),
    // eslint-disable-next-line sort-keys
    patient: relationship({ ref: 'Patient.emergencyContacts' }),
  },
});
