import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import registerRoutes from "./libs/registerRoutes";
const app = new Elysia().use(swagger()).get("/", () => "Hello eeee 21")
await registerRoutes(app)
import './models'
app.listen(3000)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app
