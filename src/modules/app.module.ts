import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { title, version, description } from '@ROOT/package.json';
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  ERROR_CODE_STATUS_MAP,
  Validation,
} from '@errors';
import { usersPlugin } from '@/modules/User/user.plugin';
import { env } from '@/config';
export const setupApp = () => {
  return new Elysia()
    .use(
      swagger({
        documentation: {
          info: { title, version, description },
        },
        exclude: ['/'],
      }),
    )
    .group('/api', (app) => app.use(usersPlugin));
};
