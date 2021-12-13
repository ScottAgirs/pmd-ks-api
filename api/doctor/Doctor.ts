import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Doctor = list({
  fields: {
    user: relationship({ ref: 'User.doctor', many: false }),
    // TODO: appointments
    // appointments: relationship({ ref: 'User.doctor', many: false }),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    languages: relationship({ ref: 'DoctorLanguage.doctors', many: true }),
    // TODO: doctorType
    // TODO: doctorSpecializations
    // TODO: doctorSince
    summary: text(),
    email: text({
      isIndexed: 'unique',
      isFilterable: true,
    }),
    // TODO: patients
    // TODO: calendar
    // TODO: bookings
  },
}) 