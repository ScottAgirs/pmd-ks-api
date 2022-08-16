import { checkbox, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Patient = list({
  fields: {
    isCompleteProfile: checkbox(),
    name: text(),
    // eslint-disable-next-line sort-keys
    appointmentNotes: relationship({
      many: true,
      ref: 'AppointmentNote.patient',
    }),
    appointmentRequests: relationship({
      many: true,
      ref: 'AppointmentRequest.patient',
    }),
    appointmentVitals: relationship({
      many: true,
      ref: 'AppointmentVital.patient',
    }),
    appointments: relationship({ many: true, ref: 'Appointment.patient' }),
    bookings: relationship({ many: true, ref: 'Booking.patient' }),
    caredByDoctors: relationship({
      many: true,
      ref: 'Doctor.caringForPatients',
    }),
    emergencyContacts: relationship({
      many: true,
      ref: 'EmergencyContact.patient',
    }),
    forms: relationship({ many: true, ref: 'Form.patient' }),
    healthCards: relationship({ many: true, ref: 'HealthCard.patient' }),
    medications: relationship({ many: true, ref: 'Medication.patients' }),
    pharmacyLocations: relationship({
      many: true,
      ref: 'PharmacyLocation.patients',
    }),
    prescriptions: relationship({ many: true, ref: 'Prescription.patient' }),
    savedDoctors: relationship({ many: true, ref: 'Doctor.savedByPatients' }),
    user: relationship({ ref: 'User.patient' }),
    visitedDoctors: relationship({ many: true, ref: 'Doctor.patients' }),
  },
});
