import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Patient = list({
  fields: {
    bookings: relationship({ ref: 'Booking.patient', many: true }),
    name: text(),
    isCompleteProfile: checkbox(),
    user: relationship({ ref: 'User.patient', many: false }),
    // @TODO: healthCards
    // healthCards: relationship({ ref: 'HealthCard.patient', many: true }),
    visitedDoctors: relationship({ ref: 'Doctor.patients', many: true }),
    savedDoctors: relationship({ ref: 'Doctor.savedByPatients', many: true }),
    // @TODO: emergencyContacts
    // emergencyContacts: relationship({ ref: 'HealthCard.patient', many: true }),
    // @TODO: appointments
    // appointments: relationship({ ref: 'HealthCard.patient', many: true }),
    // @TODO: bookings
    // bookings: relationship({ ref: 'HealthCard.patient', many: true }),
  },
})