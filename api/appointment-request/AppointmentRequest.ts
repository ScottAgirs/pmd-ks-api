import { relationship, text, timestamp } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

import { beforeCreateAppointmentRequest } from './hooks/beforeCreateAppointmentRequest';

export const AppointmentRequest = list({
  fields: {
    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    reason: text(),
    // eslint-disable-next-line sort-keys
    doctor: relationship({ ref: 'Doctor.appointmentRequests' }),
    event: relationship({ ref: 'CalendarEvent.appointmentRequests' }),
    patient: relationship({ ref: 'Patient.appointmentRequests' }),
  },
  hooks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolveInput: async ({ context, inputData, operation, resolvedData }) => {
      if (operation === 'update') {
        return resolvedData;
      }

      if (operation === 'create') {
        await beforeCreateAppointmentRequest({
          context,
          inputData,
          resolvedData,
        });

        return resolvedData;
      }

      return resolvedData;
    },
  },
});
