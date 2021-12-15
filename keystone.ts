import 'dotenv/config';

import { config } from '@keystone-6/core';

import { extendGraphqlSchema } from './graphql/extendGraphqlSchema';

import { lists } from './schema';

import { withAuth, session } from './auth';

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
    },
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
