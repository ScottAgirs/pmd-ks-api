import { relationship } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Prescription = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.prescription' }),
    doctor: relationship({ ref: 'Doctor.prescriptions' }),
    medications: relationship({ many: true, ref: 'Medication.prescription' }),
    patient: relationship({ ref: 'Patient.prescriptions' }),
    prescriptionItems: relationship({
      many: true,
      ref: 'PrescriptionItem.prescription',
    }),
  },
});
