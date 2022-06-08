import { list } from "@keystone-6/core";
import { text, relationship, timestamp } from "@keystone-6/core/fields";

export const UserInvite = list({
  fields: {
    dateOfBirth: timestamp(),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    firstName: text(),
    lastName: text(),
    middleName: text(),
    // Phone numbers start
    cellPhoneNumberString: text(),
    sex: text(),
    // Phone numbers end
    invitedByDoctor: relationship({ ref: "Doctor.userInvites" }),
    invitedByUser: relationship({ ref: "User.userInvites" }),
    healthCard: relationship({ ref: "HealthCard.userInvite" }),
  },
  ui: {
    labelField: "email",
    listView: {
      initialColumns: ["firstName", "lastName", "email", "id"],
    },
  },
});
