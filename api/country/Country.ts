import {
  checkbox,
  integer,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Country = list({
  fields: {
    administrativeAreas: relationship({
      ref: "AdministrativeArea.country",
      many: true,
    }),
    isActive: checkbox(),
    label: text({ validation: { isRequired: true } }),
    value: text({ validation: { isRequired: true } }),
  },
});
