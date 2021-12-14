import { relationship, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Appointment = list({
  fields: {
    doctor: relationship({ ref: 'Doctor.appointments', many: false }),
    // patient: relationship({ ref: 'Patient.appointments', many: false }),
    scheduledStartsAt: timestamp(),
    scheduledEndsAt: timestamp(),
    startedAt: timestamp(),
    endedAt: timestamp(),
  },
}) 