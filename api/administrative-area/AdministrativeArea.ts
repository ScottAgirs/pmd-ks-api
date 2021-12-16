import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const AdministrativeArea = list({
  fields: {
    country: relationship({ ref: 'Country.administrativeAreas' }),
    isActive: checkbox(),
    label: text({ validation: { isRequired: true } }),
    value: text({ validation: { isRequired: true } }),
  },
}) 