import {
  checkbox,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { list } from '@keystone-6/core';

export const Appointment = list({
  fields: {
    endedAt: timestamp(),
    isSigned: checkbox(),
    isSignedOn: timestamp({
      defaultValue: {
        kind: 'now',
      },
    }),
    reason: text(),
    scheduledEndsAt: timestamp(),
    scheduledStartsAt: timestamp(),
    startedAt: timestamp(),
    summary: document({
      dividers: true,
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
    }),
    summaryString: text(),
    // eslint-disable-next-line sort-keys
    billing: relationship({ ref: 'AppointmentBilling.appointment' }),
    booking: relationship({ ref: 'Booking.appointment' }),
    doctor: relationship({ ref: 'Doctor.appointments' }),
    event: relationship({ ref: 'CalendarEvent.appointments' }),
    forms: relationship({ many: true, ref: 'Form.appointment' }),
    notes: relationship({ many: true, ref: 'AppointmentNote.appointment' }),
    patient: relationship({ ref: 'Patient.appointments' }),
    prescription: relationship({ ref: 'Prescription.appointment' }),
    vitalsData: relationship({ ref: 'AppointmentVital.appointment' }),
  },
});
