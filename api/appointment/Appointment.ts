import { relationship, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Appointment = list({
  fields: {
    booking: relationship({ ref: 'Booking.appointment' }),
    doctor: relationship({ ref: 'Doctor.appointments' }),
    notes: relationship({ ref: 'AppointmentNote.appointment', many: true }),
    patient: relationship({ ref: 'Patient.appointments' }),
    vitalsData: relationship({ ref: 'AppointmentVital.appointment' }),
    scheduledStartsAt: timestamp(),
    scheduledEndsAt: timestamp(),
    startedAt: timestamp(),
    endedAt: timestamp(),
  },
}) 