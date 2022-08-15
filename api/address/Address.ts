import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Address = list({
  fields: {
    addressLine1: text(),
    addressLine2: text(),
    administrativeArea: text(),
    country: text(),
    locality: text(),
    postalCode: text(),
    premise: text(),
    thoroughfare: text(),
    // eslint-disable-next-line sort-keys
    event: relationship({ ref: 'CalendarEvent.address' }),
    pharmacyLocation: relationship({ ref: 'PharmacyLocation.address' }),
    user: relationship({ ref: 'User.address' }),
  },
});
