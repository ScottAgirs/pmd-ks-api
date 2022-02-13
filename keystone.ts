import 'dotenv/config';

import { config } from '@keystone-6/core';

import { extendGraphqlSchema } from './graphql/extendGraphqlSchema';

import { lists } from './schema';

import { withAuth, session } from './auth';
import { populateSpecialties } from './seed/doctor/populate-specialties';
import { populateSubSpecialties } from './seed/doctor/populate-sub-specialties';
import { populateCalendarEventTypes } from './seed/doctor/populate-calendar-event-types';
import { populateDummyUsers } from './seed/user/populate-dummy-users';
import { populateSteppers } from './seed/onboard/populate-stepper';
import { populateLanguages } from './seed/common/populate-languages';

const FRONTEND_URL:string = process.env.FRONTEND_URL as string;
export default withAuth(
  config({
    server: {
      cors: {
        origin: [FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL as string,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-critical')) {
          populateCalendarEventTypes(keystone);
          populateLanguages(keystone);
          populateSpecialties(keystone);
          populateSteppers(keystone);
          populateSubSpecialties(keystone);
        }

        if (process.argv.includes('--seed-languages')) {
          populateLanguages(keystone);
        }
        if (process.argv.includes('--seed-steppers')) {
          populateSteppers(keystone);
        }
        if (process.argv.includes('--seed-calendar-event-types')) {
          populateCalendarEventTypes(keystone);
        }
        if (process.argv.includes('--seed-doctor-specialties')) {
          populateSpecialties(keystone);
        }
        if (process.argv.includes('--seed-doctor-sub-specialties')) {
          populateSubSpecialties(keystone);
        }
        if (process.argv.includes('--seed-users')) {
          populateDummyUsers(keystone);
        }
      },
    },
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
