import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Patient = list({
  fields: {
    isCompleteProfile: checkbox(),
    name: text(),
    appointments: relationship({ ref: "Appointment.patient", many: true }),
    appointmentVitals: relationship({
      ref: "AppointmentVital.patient",
      many: true,
    }),
    appointmentNotes: relationship({
      ref: "AppointmentNote.patient",
      many: true,
    }),
    appointmentRequests: relationship({ ref: "AppointmentRequest.patient", many: true }),
    bookings: relationship({ ref: "Booking.patient", many: true }),
    caredByDoctors: relationship({
      ref: "Doctor.caringForPatients",
      many: true,
    }),
    emergencyContacts: relationship({
      ref: "EmergencyContact.patient",
      many: true,
    }),
    forms: relationship({ ref: "Form.patient", many: true }),
    healthCards: relationship({ ref: "HealthCard.patient", many: true }),
    medications: relationship({ ref: "Medication.patient", many: true }),
    pharmacyLocations: relationship({
      ref: "PharmacyLocation.patients",
      many: true,
    }),
    prescriptions: relationship({ ref: "Prescription.patient", many: true }),
    savedDoctors: relationship({ ref: "Doctor.savedByPatients", many: true }),
    user: relationship({ ref: "User.patient" }),
    visitedDoctors: relationship({ ref: "Doctor.patients", many: true }),
  },
});
