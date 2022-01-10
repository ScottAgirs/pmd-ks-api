const graphql = String.raw;

export const typeDefs =  graphql`
  type Mutation {
    # Bookings
    createCalendarEventBooking(eventId: ID!, reason: String, startsAt: DateTime): StepperStepProg
    # Stepper
    completeMyStepProg(stepId: ID!): StepperStepProg
  }
`
