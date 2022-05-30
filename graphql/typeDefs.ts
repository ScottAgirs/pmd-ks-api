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
    # Stepper
    completeMyStepProg(stepId: ID!): StepperStepProg
  }
`;
