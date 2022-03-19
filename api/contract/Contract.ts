import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

const { list } = require("@keystone-6/core");

export const Contract = list({
  fields: {
    signedBy: relationship({ ref: "User.contracts", many: true }),
    isActive: checkbox(),
    body: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    name: text(),
    slug: text({
      isIndexed: "unique",
    }),
    effectiveFrom: timestamp(),
    lastUpdated: timestamp(),
  },
});
