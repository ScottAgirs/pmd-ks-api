import { integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const AppointmentVital = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.vitals' }),
    patient: relationship({ ref: 'Patient.appointmentVitals', many: true }),
    feet: integer(),
    inches: integer(),
    lbs: integer(),

    oxygenSaturation: integer(),
    heartRate: integer(),
    temperature: integer(),
    bloodPressure: text(),
    resp: integer(),
  },
}) 