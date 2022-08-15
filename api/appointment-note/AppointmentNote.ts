import { relationship, text, timestamp } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AppointmentNote = list({
  fields: {
    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    // eslint-disable-next-line sort-keys
    appointment: relationship({ ref: 'Appointment.notes' }),
    patient: relationship({ ref: 'Patient.appointmentNotes' }),
    summary: text(),
    title: text(),
  },
});
