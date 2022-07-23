import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Address = list({
  fields: {
    addressLine1: text(),
    addressLine2: text(),
    administrativeArea: text(),
    country: text(),
    facilityMasterNumber: text({
      isIndexed: "unique"
    }),
    locality: text(),
    postalCode: text(),
    premise: text(),
    serviceLocationIndicator: text({
      isIndexed: "unique"
    }),
    thoroughfare: text(),
    calendarEvents: relationship({ ref: "CalendarEvent.address", many: true }),
    companyLocation: relationship({ ref: "CompanyLocation.address" }),
    pharmacyLocation: relationship({ ref: "PharmacyLocation.address" }),
    user: relationship({ ref: "User.address" }),
  },
});
