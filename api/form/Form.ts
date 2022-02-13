import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Form = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.forms' }),
    formType: relationship({ ref: 'FormType.forms' }),
    name: text({ validation: { isRequired: true } }),
    doctor: relationship({ ref: 'Doctor.forms' }),
    patient: relationship({ ref: 'Patient.forms' }),
    slug: text({ validation: { isRequired: true } }),
  },
}) 