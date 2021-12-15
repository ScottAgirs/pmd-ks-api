import { graphQLSchemaExtension } from "@keystone-6/core";

import { completeMyStepProg } from "../api/stepper-step-prog/resolvers/completeMyStepProg";

import { typeDefs } from "./typeDefs";


export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs,
  resolvers: {
    Mutation: {
      completeMyStepProg,
    }
  }
})