import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Form = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    appointment: relationship({ ref: 'Appointment.forms' }),
    doctor: relationship({ ref: 'Doctor.forms' }),
    formType: relationship({ ref: 'FormType.forms' }),
    patient: relationship({ ref: 'Patient.forms' }),
  },
});
