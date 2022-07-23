import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CompanyLocation = list({
  fields: {
    name: text(),
    slug: text(),
    facilityMasterNumber: text({
      isIndexed: "unique"
    }),
    locationType: text(),
    serviceLocationIndicator: text({
      isIndexed: "unique"
    }),
    address: relationship({ ref: "Address.companyLocation" }),
    company: relationship({ ref: "Company.companyLocations"  }),
    registeredBy: relationship({ ref: "User.locations", many:  true }),
  },
});