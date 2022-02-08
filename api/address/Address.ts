import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Address = list({
  fields: {
    country: text(),
    addressLine1: text(),
    addressLine2: text(),
    administrativeArea: text(),
    locality: text(),
    postalCode: text(),
    thoroughfare: text(),
    premise: text(),
    doctor: relationship({ ref: "Doctor.clinicAddress" }),
  },
}) 