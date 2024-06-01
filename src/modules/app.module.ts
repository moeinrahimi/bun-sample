import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { title, version, description } from '@ROOT/package.json';
import { userController } from './User/user.controller';
import { orderController } from './Order/order.controller';
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
    .group('/api', (app) => app.use(userController).use(orderController));
};
