import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Pharmacy = list({
  fields: {
    companyName: text({ isIndexed: "unique" }),
    // Relationships
    locations: relationship({ ref: "PharmacyLocation.pharmacy", many: true }),
  },
});
