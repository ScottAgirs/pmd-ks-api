import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const PrescriptionItem = list({
  fields: {
    medication: relationship({ ref: 'Medication.prescriptionItem' }),
    prescription: relationship({ ref: 'Prescription.prescriptionItems' }),
    instructions: text(),
    luCode: text(),
    refills: text(),
  },
})