import 'dotenv/config';

import { config } from '@keystone-6/core';

import { extendGraphqlSchema } from './graphql/extendGraphqlSchema';

import { lists } from './schema';

import { withAuth, session } from './auth';
import { populateSpecialties } from './seed/doctor/populate-specialties';
import { populateSubSpecialties } from './seed/doctor/populate-sub-specialties';

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
      url: 'postgresql://doadmin:4dvbMUL0jSI1b3Z4@db-ks-dev-do-user-8624530-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require',
      async onConnect(keystone) {
        if (process.argv.includes('--seed-doctor-specialties')) {
          populateSpecialties(keystone);
        }
        if (process.argv.includes('--seed-doctor-sub-specialties')) {
          populateSubSpecialties(keystone);
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
