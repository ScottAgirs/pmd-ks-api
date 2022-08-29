import { graphQLSchemaExtension } from '@keystone-6/core';

import { inviteUserByDoctor } from '../api/patient/resolvers/inviteUserByDoctor';
import { acceptInvite } from '../api/user-invite/services/accept-invite';
import { addPatientToDoctor } from '../api/patient/resolvers/addPatientToDoctor';
import { completeMyStepProg } from '../api/stepper-step-prog/resolvers/completeMyStepProg';
import { createCalendarEventBooking } from '../api/booking/resolvers/createCalendarEventBooking';
import { createWalkInAppointment } from '../api/appointment/resolvers/createWalkInAppointment';

import { typeDefs } from './typeDefs';

export const extendGraphqlSchema = graphQLSchemaExtension({
  resolvers: {
    Mutation: {
      // Bookings
      addPatientToDoctor,
      createCalendarEventBooking,
      createWalkInAppointment,
      inviteUserByDoctor,
      // Stepper
      // eslint-disable-next-line sort-keys
      completeMyStepProg,
      // User Invites
      // eslint-disable-next-line sort-keys
      acceptInvite,
    },
  },
  typeDefs,
});
