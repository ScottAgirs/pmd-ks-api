import {
  checkbox,
  integer,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Language = list({
  fields: {
    label: text({ validation: { isRequired: false } }),
    value: text({ validation: { isRequired: false }, isIndexed: "unique" }),
    doctors: relationship({ ref: "Doctor.languages", many: true }),
  },
});
