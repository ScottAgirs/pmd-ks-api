import { integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const AppointmentVital = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.vitalsData' }),
    // TODO: See if performance would be affected
    // if appointmentVitals would be linked/accessible via patient.appointment.vitalsData instead,
    // that way eliminating the need to replicate explicitly the connection to Patient here.
    bloodPressure: text(),
    cm: integer(),
    headCm: integer(),
    heartRate: integer(),
    kg: integer(),
    meters: integer(),
    oxygenSaturation: integer(),
    resp: integer(),
    temperature: integer(),
    // eslint-disable-next-line sort-keys
    patient: relationship({ ref: 'Patient.appointmentVitals' }),
  },
});
