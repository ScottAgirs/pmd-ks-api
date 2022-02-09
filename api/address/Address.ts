import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Address = list({
  fields: {
    addressLine1: text(),
    addressLine2: text(),
    administrativeArea: text(),
    country: text(),
    locality: text(),
    postalCode: text(),
    premise: text(),
    thoroughfare: text(),
    doctorClinic: relationship({ ref: "Doctor.clinicAddress" }),
  },
}) 