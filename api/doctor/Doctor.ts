import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Doctor = list({
  fields: {
    user: relationship({ ref: 'User.doctor', many: false }),
    appointments: relationship({ ref: 'Appointment.doctor', many: false }),
    bookings: relationship({ ref: 'Booking.doctor', many: true }),
    calendar: relationship({ ref: 'Calendar.doctor', many: false }),
    // TODO: doctorSpecializations
    doctorSince: timestamp({ validation: { isRequired: true } }),
    doctorSpecialty: relationship({ ref: 'DoctorSpecialty.doctors', many: false }),
    doctorType: relationship({ ref: 'DoctorType.doctors', many: false }),
    email: text({
      isIndexed: 'unique',
      isFilterable: true,
    }),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    languages: relationship({ ref: 'DoctorLanguage.doctors', many: true }),
    summary: text(),
    patients: relationship({ ref: 'Patient.visitedDoctors', many: true }),
    savedByPatients: relationship({ ref: 'Patient.savedDoctors', many: true }),
  },
}) 