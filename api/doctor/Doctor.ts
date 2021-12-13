import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Doctor = list({
  fields: {
    user: relationship({ ref: 'User.doctor', many: false }),
    // TODO: appointments
    // TODO: isCompleteProfile
    // TODO: isVerified
    languages: relationship({ ref: 'DoctorLanguage.doctors', many: true }),
    // TODO: doctorType
    // TODO: doctorSpecializations
    // TODO: doctorSince
    // TODO: summary
    // TODO: email
    // TODO: patients
    // TODO: calendar
    // TODO: bookings
  },
}) 