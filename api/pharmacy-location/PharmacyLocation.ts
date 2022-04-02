import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const PharmacyLocation = list({
  fields: {
    accreditationNumber: text({
      isIndexed: "unique",
    }),
    // Relationships
    address: relationship({ ref: "Address.pharmacyLocation" }),
    pharmacy: relationship({ ref: "Pharmacy.locations" }),
    patients: relationship({ ref: "Patient.pharmacyLocations", many: true }),
  },
});
