import { relationship, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Vaccination = list({
  fields: {
    expirationDate: timestamp(),
    immunizedAt: timestamp(),
    medication: relationship({ ref: 'Medication.vaccinations' }),
    // eslint-disable-next-line sort-keys
    doctor: relationship({ ref: 'Doctor.vaccinations' }),
    patient: relationship({ ref: 'Patient.vaccinations' }),
  },
});
