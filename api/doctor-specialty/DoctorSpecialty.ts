import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const DoctorSpecialty = list({
  fields: {
    label: text({ validation: { isRequired: true } }),
    value: text({ validation: { isRequired: true } }),
    doctors: relationship({ ref: 'Doctor.doctorSpecialty', many: true }),
  },
})