import { list } from '@keystone-6/core';
import { text, relationship, timestamp } from '@keystone-6/core/fields';

export const UserInvite = list({
  fields: {
    cellPhoneNumberString: text(),
    dateOfBirth: timestamp(),
    email: text({
      isFilterable: true,
      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    firstName: text(),
    lastName: text(),
    middleName: text(),
    // Phone numbers start
    sex: text(),
    // Phone numbers end
    // eslint-disable-next-line sort-keys
    healthCard: relationship({ ref: 'HealthCard.userInvite' }),
    invitedByUser: relationship({ ref: 'User.userInvites' }),
    signedUpUser: relationship({ ref: 'User.signUpInvite' }),
  },
  ui: {
    labelField: 'email',
    listView: {
      initialColumns: ['firstName', 'lastName', 'email', 'id'],
    },
  },
});
