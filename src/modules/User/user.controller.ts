import { Elysia, t } from "elysia";
import { setupUsers } from "./user.module";
import { findById, login } from "./user.dto";
import { db } from "@/database.provider";


export const userController = new Elysia().use(setupUsers).group(
  "/users",
  {
    detail: {
      tags: ["Auth"],
    },
  },
  (app) =>
    app
      .get(
        "/:id",
        ({ params, store }) => store.usersService.findById(params.id),
        {
          params: findById,
          // response: typeof db.user,
          detail: {
            summary: "find by id ",
          },
        }
      )
      .post(
        "/login",
        ({ body, store }) =>
          store.usersService.login(body.email, body.password),
        {
          body: login,
          // response: ReturnedUserSchema,
          detail: {
            summary: "Login",
          },
        }
      )
);
