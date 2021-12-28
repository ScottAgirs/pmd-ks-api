import { integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const AppointmentVital = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.vitalsData' }),
    // TODO: See if performance would be affected 
    // if appointmentVitals would be linked/accessible via patient.appointment.vitalsData instead,
    // that way eliminating the need to replicate explicitly the connection to Patient here.
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