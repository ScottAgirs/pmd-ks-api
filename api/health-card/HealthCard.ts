import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const HealthCard = list({
  fields: {
    dateOfBirth: timestamp({ validation: { isRequired: true } }),
    expiryDate: timestamp({ validation: { isRequired: true } }),
    insurancePolicyNumber: text({ validation: { isRequired: true } }),
    nameOnCard: text({ validation: { isRequired: true } }),
    versionCode: text({ validation: { isRequired: true } }),
    patient: relationship({ ref: "Patient.healthCards" }),
    userInvite: relationship({ ref: "UserInvite.healthCard" }),
  },
});
