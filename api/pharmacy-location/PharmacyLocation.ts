import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const PharmacyLocation = list({
  fields: {
    accreditationNumber: text({
      isIndexed: 'unique',
    }),
    faxString: text(),
    phoneString: text(),
    status: text(),
    // Relationships
    // eslint-disable-next-line sort-keys
    address: relationship({ ref: 'Address.pharmacyLocation' }),
    patients: relationship({ many: true, ref: 'Patient.pharmacyLocations' }),
    pharmacy: relationship({ ref: 'Pharmacy.locations' }),
  },
});
