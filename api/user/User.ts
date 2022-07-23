import { list } from "@keystone-6/core";
import {
  text,
  relationship,
  timestamp,
  checkbox,
} from "@keystone-6/core/fields";
import { afterCreateUser } from "./afterCreateUser";

export const User = list({
  hooks: {
    afterOperation: async ({ context, item, operation }) => {
      if (operation === "create") {
        afterCreateUser({ context, item });
      }
    },
  },
  fields: {
    subjectId: text({
      isIndexed: "unique",
    }),
    contracts: relationship({ ref: "Contract.signedBy", many: true }),
    dateOfBirth: timestamp(),
    doctor: relationship({ ref: "Doctor.user" }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    firstName: text(),
    isAdmin: checkbox(),
    isDummy: checkbox(),
    isOnboarded: checkbox(),
    isOnboardedDoctor: checkbox(),
    lastName: text(),
    middleName: text(),
    // password: password({ validation: { isRequired: true } }),
    // Phone numbers start
    cellPhoneNumberString: text(),
    homePhoneNumberString: text(),
    photoSrc: text(),
    sex: text(),
    username: text({ isIndexed: "unique", validation: { isRequired: true } }),
    // Phone numbers end
    address: relationship({ ref: "Address.user" }),
    signUpInvite: relationship({ ref: "UserInvite.signedUpUser" }),
    companies: relationship({ ref: "Company.registeredBy", many: true }),
    locations: relationship({ ref: "CompanyLocation.registeredBy", many: true }),
    prompts: relationship({ ref: "Prompt.user", many: true }),
    profilePhoto: relationship({ ref: "ProfilePhoto.user" }),
    patient: relationship({ ref: "Patient.user" }),
    stepperProgs: relationship({ ref: "StepperProg.user", many: true }),
    stepperStepProgs: relationship({ ref: "StepperStepProg.user", many: true }),
    userInvites: relationship({ ref: "UserInvite.invitedByUser", many: true }),
  },
  ui: {
    labelField: "email",
    listView: {
      initialColumns: ["firstName", "lastName", "email", "id"],
    },
  },
});
