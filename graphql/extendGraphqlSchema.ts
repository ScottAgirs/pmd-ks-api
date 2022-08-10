import { graphQLSchemaExtension } from "@keystone-6/core";

import { inviteUserByDoctor } from "../api/patient/resolvers/inviteUserByDoctor";
import { acceptInvite } from "../api/user-invite/services/accept-invite";
import { addPatientToDoctor } from "../api/patient/resolvers/addPatientToDoctor";
import { completeMyStepProg } from "../api/stepper-step-prog/resolvers/completeMyStepProg";
import { createCalendarEventBooking } from "../api/booking/resolvers/createCalendarEventBooking";
import { createWalkInAppointment } from "../api/appointment/resolvers/createWalkInAppointment";

import { typeDefs } from "./typeDefs";

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs,
  resolvers: {
    Mutation: {
      // Bookings
      addPatientToDoctor,
      inviteUserByDoctor,
      createCalendarEventBooking,
      createWalkInAppointment,
      // Stepper
      completeMyStepProg,
      // User Invites
      acceptInvite,
    },
  },
});
