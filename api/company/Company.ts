import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Company = list({
  fields: {
    name: text({
      isIndexed: "unique"
    }),
    slug: text({
      isIndexed: "unique"
    }),
    companyLocations: relationship({ ref: "CompanyLocation.company", many:  true }),
    registeredBy: relationship({ ref: "User.companies", many:  true }),
  },
});
