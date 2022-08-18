/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';

import { createAuth } from '@opensaas/keystone-nextjs-auth';
import GoogleProvider from '@opensaas/keystone-nextjs-auth/providers/google';
import FacebookProvider from '@opensaas/keystone-nextjs-auth/providers/facebook';
// import { createAuth } from "keystone-6-oauth";
// import GoogleProvider from "keystone-6-oauth/providers/google";
// import FacebookProvider from "keystone-6-oauth/providers/facebook";

import { config } from '@keystone-6/core';

import { extendGraphqlSchema } from './graphql/extendGraphqlSchema';

import { lists } from './schema';

import { session } from './auth';

import { populateSpecialties } from './seed/doctor/populate-specialties';
import { populateSubSpecialties } from './seed/doctor/populate-sub-specialties';
import { populateCalendarEventTypes } from './seed/doctor/populate-calendar-event-types';
import { populateContracts } from './seed/contracts/populate-contracts';
import { populateDummyUsers } from './seed/user/populate-dummy-users';
import { populateLanguages } from './seed/common/populate-languages';
import { populateSteppers } from './seed/onboard/populate-stepper';
import { populateAdminUsers } from './seed/user/populate-admin-users';
import { resetList } from './utils/resetList';
import { populatePharmacies } from './seed/common/populate-pharmacies';

import { populateClaims } from './seed/billing/populate-claims';
import { populateDiagnosis } from './seed/billing/populate-diagnosis';
import { populateProducts } from './seed/medications/populate-products';
import { populateIngredients } from './seed/medications/populate-ingredients';
import { populatePremiums } from './seed/billing/populate-premiums';

const FRONTEND_URL = process.env.FRONTEND_URL as string;

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
  }
}

const auth = createAuth({
  autoCreate: true,
  identityField: 'subjectId',
  keystonePath: '/admin',
  listKey: 'User',
  pages: {
    error: '/auth/error',
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'GoogleNextAuthClientID',
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || 'GoogleNextAuthClientSecret',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || 'NextAuthClientID',
      clientSecret:
        process.env.FACEBOOK_CLIENT_SECRET || 'NextAuthClientSecret',
    }),
  ],
  resolver: async (props: any) => {
    const username = props.user.email;

    const email = props.user.email as string;
    const firstName = props.user.name
      .split(' ')
      .slice(0, -1)
      .join(' ') as string;
    const lastName = props.user.name.split(' ').slice(-1).join(' ') as string;
    const photoSrc = props.user.image as string;

    return { email, firstName, lastName, photoSrc, username };
  },
  sessionData: `id username email firstName lastName photoSrc doctor { id } patient { id }`,
  sessionSecret,
});

// DEFAULT KEYSTONE CONFIG
export default auth.withAuth(
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL as string,
      // eslint-disable-next-line sort-keys
      async onConnect(keystone) {
        // if (process.argv.includes("--reset-steppers")) {
        //   resetList("StepperStep", keystone);
        // }
        if (process.argv.includes('--reset-meds')) {
          resetList('Medication', keystone);
        }
        if (process.argv.includes('--reset-ingredients')) {
          resetList('ActiveIngredient', keystone);
        }
        if (process.argv.includes('--reset-pharmas')) {
          resetList('Pharmacy', keystone);
          resetList('PharmacyLocation', keystone);
        }
        // if (process.argv.includes('--sanitize-ingredients')) {
        //   sanitizeIngredients(keystone);
        // }
        if (process.argv.includes('--seed-claims')) {
          populateClaims(keystone);
        }
        if (process.argv.includes('--seed-diagnosis')) {
          populateDiagnosis(keystone);
        }
        if (process.argv.includes('--seed-pharmas')) {
          populatePharmacies(keystone);
        }
        if (process.argv.includes('--seed-premiums')) {
          populatePremiums(keystone);
        }
        if (process.argv.includes('--seed-critical')) {
          populateProducts(keystone);
          populateIngredients(keystone);
          populateClaims(keystone);
          populateDiagnosis(keystone);
          populatePharmacies(keystone);
          populateCalendarEventTypes(keystone);
          populateContracts(keystone);
          populateLanguages(keystone);
          populateSpecialties(keystone);
          populateSteppers(keystone);
          populateSubSpecialties(keystone);
        }

        if (process.argv.includes('--seed-drug-products')) {
          populateProducts(keystone);
        }
        if (process.argv.includes('--seed-med-ingredients')) {
          populateIngredients(keystone);
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
        if (process.argv.includes('--seed-admins')) {
          populateAdminUsers(keystone);
        }
      },
    },
    extendGraphqlSchema,
    lists,
    server: {
      cors: {
        credentials: true,
        origin: [
          FRONTEND_URL,
          'http://0.0.0.0:3333',
          'http://127.0.0.1:3333',
          /https?:\/\/.+\.pocketmd.ca/,
          /https?:\/\/.+\.localhost:3333/,
        ],
        // origin: [], // 127.0.0.1 needs be here as well, because of an issue with CORS which causes `/admin/api/auth/session` failure, if not provided
      },
      port: process.env.PORT as any, // default: 3000
    },
    session,
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: context => !!context.session?.data,
    },
  })
);
