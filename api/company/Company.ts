import { relationship, text } from "@keystone-6/core/fields";

import { beforeCreateCompany } from "./hooks/beforeCreateCompany";

const { list } = require("@keystone-6/core");

export const Company = list({
  fields: {
    name: text({
      isIndexed: "unique"
    }),
    slug: text({
      isIndexed: "unique"
    }),
    locations: relationship({ ref: "CompanyLocation.company", many:  true }),
    // registeredBy: relationship({ ref: "User.companies", many:  true }),
  },
  hooks: {
    // @ts-ignore
    resolveInput: async ({ context, inputData, operation, resolvedData }) => {
      if (operation === "update") {
        return resolvedData;
      }

      if (operation === "create") {
        await beforeCreateCompany({ context, inputData, resolvedData });

        return resolvedData;
      }
    },
  },
});
