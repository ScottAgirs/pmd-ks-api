import { relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const EmergencyContact = list({
  fields: {
    email: text({ validation: { isRequired: true } }),
    relation: text({ validation: { isRequired: true } }),
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),
    cellPhoneNumberString: text({ validation: { isRequired: true } }),
    homePhoneNumberString: text({ validation: { isRequired: true } }),
    patient: relationship({ ref: 'Patient.emergencyContacts', many: false }),
  },
}) 