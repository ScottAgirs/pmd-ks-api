import { relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Prescription = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.prescription' }),
    doctor: relationship({ ref: 'Doctor.prescriptions' }),
    medications: relationship({ ref: 'Medication.prescription', many: true }),
    patient: relationship({ ref: 'Patient.prescriptions' }),
    prescriptionItems: relationship({ ref: 'PrescriptionItem.prescription', many: true }),
  },
})