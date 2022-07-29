import { relationship, text } from "@keystone-6/core/fields";
import { beforeCreateCompanyLocation } from "./hooks/beforeCreateCompanyLocation";

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
    company: relationship({ ref: "Company.locations"  }),
    // registeredBy: relationship({ ref: "User.locations", many:  true }),
  },
  hooks: {
    // @ts-ignore
    resolveInput: async ({ context, inputData, operation, resolvedData }) => {
      if (operation === "update") {
        return resolvedData;
      }

      if (operation === "create") {
        await beforeCreateCompanyLocation({ context, inputData, resolvedData });

        return resolvedData;
      }
    },
  },
});