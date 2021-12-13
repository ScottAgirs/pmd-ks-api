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
    doctorSince: timestamp({ validation: { isRequired: true } }),
    summary: text(),
    email: text({
      isIndexed: 'unique',
      isFilterable: true,
    }),
    patients: relationship({ ref: 'Patient.visitedDoctors', many: true }),
    savedByPatients: relationship({ ref: 'Patient.savedDoctors', many: true }),
    // TODO: calendar
    // TODO: bookings
  },
}) 