const graphql = String.raw;

export const typeDefs = graphql`
  type Mutation {
    # Bookings
    createCalendarEventBooking(
      eventId: ID!
      reason: String
      startsAt: DateTime
    ): StepperStepProg
    addPatientToDoctor(
      firstName: String!
      lastName: String!
      email: String!
      cellPhoneNumberString: String!
    ): Patient
    inviteUserByDoctor(
      healthCardNumber: String!
      healthCardVersionCode: String!
      healthCardExpiryDate: DateTime!
      dateOfBirth: DateTime!
      email: String!
      firstName: String!
      lastName: String!
      middleName: String
      cellPhoneNumberString: String!
      sex: String!
    ): UserInvite
    # Stepper
    completeMyStepProg(stepId: ID!): StepperStepProg
  }
`;
