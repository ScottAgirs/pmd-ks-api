import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const DoctorType = list({
  fields: {
    label: text({ validation: { isRequired: true } }),
    value: text({ validation: { isRequired: true } }),
    doctors: relationship({ ref: 'Doctor.doctorType', many: true }),
  },
})