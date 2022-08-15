import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const DoctorSpecialty = list({
  fields: {
    label: text({ validation: { isRequired: true } }),
    value: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    doctors: relationship({ many: true, ref: 'Doctor.doctorSpecialty' }),
  },
});
