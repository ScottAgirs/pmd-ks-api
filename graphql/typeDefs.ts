const graphql = String.raw;

export const typeDefs =  graphql`
  type Mutation {
    completeMyStepProg(stepId: ID!): StepperStepProg
  }
`
