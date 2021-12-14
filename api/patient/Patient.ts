import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Patient = list({
  fields: {
    appointments: relationship({ ref: 'Appointment.patient', many: true }),
    bookings: relationship({ ref: 'Booking.patient', many: true }),
    healthCards: relationship({ ref: 'HealthCard.patient', many: true }),
    isCompleteProfile: checkbox(),
    name: text(),
    savedDoctors: relationship({ ref: 'Doctor.savedByPatients', many: true }),
    user: relationship({ ref: 'User.patient', many: false }),
    visitedDoctors: relationship({ ref: 'Doctor.patients', many: true }),
    emergencyContacts: relationship({ ref: 'EmergencyContact.patient', many: true }),
  },
})