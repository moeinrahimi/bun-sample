import { Elysia } from "elysia";
import { setupApp } from "@/modules/app.module";
import { env } from "./config";

const app = new Elysia().use(setupApp).listen(env.PORT);

console.log(
  `🦊 Elysia is running! Access Swagger UI at http://${app.server?.hostname}:${app.server?.port}/swagger`
);

export type App = typeof app;

// socketio works fine
// eslint(not working on bun)
// setup https://biomejs.dev/guides/getting-started/
// integrate with vscode and etc https://biomejs.dev/guides/integrate-in-editor/
// tsconfig
// prettier
// sample structure
//https://github.com/agnyz/the-bed-stack/tree/main/src
// bunx prisma migrate dev --name init ==> migrate prisma