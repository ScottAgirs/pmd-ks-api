import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const DoctorSubSpecialty = list({
  fields: {
    label: text({ validation: { isRequired: true } }),
    value: text({ isIndexed: "unique", validation: { isRequired: true } }),
    doctors: relationship({ ref: 'Doctor.doctorSubSpecialties', many: true }),
  },
})