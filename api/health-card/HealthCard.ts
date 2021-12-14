import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const HealthCard = list({
  fields: {
    country: relationship({ ref: 'Country.healthCards', many: false }),
    dateOfBirth: timestamp({ validation: { isRequired: true } }),
    expiryDate: timestamp({ validation: { isRequired: true } }),
    insurancePolicyNumber: text({ validation: { isRequired: true } }),
    isVerified: checkbox(),
    nameOnCard: text({ validation: { isRequired: true } }),
    patient: relationship({ ref: 'Patient.healthCards', many: false }),
    versionCode: text({ validation: { isRequired: true } }),
  },
}) 