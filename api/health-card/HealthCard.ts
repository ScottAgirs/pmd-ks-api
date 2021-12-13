import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const HealthCard = list({
  fields: {
    patient: relationship({ ref: 'Patient.healthCards', many: false }),
    isVerified: checkbox(),
    expiryDate: timestamp({ validation: { isRequired: true } }),
    nameOnCard: text({ validation: { isRequired: true } }),
    insurancePolicyNumber: text({ validation: { isRequired: true } }),
    dateOfBirth: timestamp({ validation: { isRequired: true } }),
    // // TODO: Country
    // country: relationship({ ref: 'Patient.visitedDoctors', many: true }),
    versionCode: text({ validation: { isRequired: true } }),
  },
}) 