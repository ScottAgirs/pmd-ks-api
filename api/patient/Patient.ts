import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Patient = list({
  fields: {
    name: text(),
    isConfirmed: checkbox(),
    patient: relationship({ ref: 'User.patient', many: false }),
  },
})