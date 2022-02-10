import { relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const AppointmentBillingItem = list({
  fields: {
    billing: relationship({ ref: 'AppointmentBilling.billingItems' }),
    feeCode: text(),
    diagnosisCode: text(),
    units: text(),
  },
}) 