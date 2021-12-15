import { graphQLSchemaExtension } from "@keystone-6/core";

import { completeMyStepProg } from "../api/stepper-step-prog/resolvers/completeMyStepProg";
import { createCalendarEventBooking } from "../api/booking/resolvers/createCalendarEventBooking";

import { typeDefs } from "./typeDefs";


export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs,
  resolvers: {
    Mutation: {
      // Bookings
      createCalendarEventBooking,
      // Stepper
      completeMyStepProg,
    }
  }
})