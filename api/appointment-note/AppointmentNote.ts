import { integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const AppointmentNote = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.notes' }),
    createdAt: timestamp({
      defaultValue: {
        kind: "now"
      }
    }),
    patient: relationship({ ref: 'Patient.appointmentNotes' }),
    summary: text(),
    title: text(),
  },
}) 