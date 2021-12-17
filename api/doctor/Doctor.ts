import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Doctor = list({
  fields: {
    user: relationship({ ref: 'User.doctor' }),
    appointments: relationship({ ref: 'Appointment.doctor' }),
    bookings: relationship({ ref: 'Booking.doctor', many: true }),
    calendarEvents: relationship({ ref: 'CalendarEvent.doctor', many: true }),
    // TODO: doctorSpecializations
    doctorSince: timestamp({ validation: { isRequired: true } }),
    doctorSpecialty: relationship({ ref: 'DoctorSpecialty.doctors' }),
    doctorSubSpecialties: relationship({ ref: 'DoctorSubSpecialty.doctors', many: true }),
    doctorType: relationship({ ref: 'DoctorType.doctors' }),
    email: text(),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    languages: relationship({ ref: 'DoctorLanguage.doctors', many: true }),
    summary: text(),
    patients: relationship({ ref: 'Patient.visitedDoctors', many: true }),
    savedByPatients: relationship({ ref: 'Patient.savedDoctors', many: true }),
  },
}) 