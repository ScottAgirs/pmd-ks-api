import { relationship, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Appointment = list({
  fields: {
    doctor: relationship({ ref: 'Doctor.appointments' }),
    patient: relationship({ ref: 'Patient.appointments' }),
    scheduledStartsAt: timestamp(),
    scheduledEndsAt: timestamp(),
    startedAt: timestamp(),
    endedAt: timestamp(),
  },
}) 