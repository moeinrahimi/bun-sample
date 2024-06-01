import { Elysia, t } from "elysia";
import { setupOrders } from "./order.module";
import { OrderSchema, findById, login, save } from "./order.dto";
import { db } from "@/database.provider";


export const orderController = new Elysia().use(setupOrders).group(
  "/orders",
  {
    detail: {
      tags: ["Order"],
    },
  },
  (app) =>
    app
    //   .get(
    //     "/:id",
    //     ({ params, store }) => store.usersService.findById(params.id),
    //     {
    //       params: findById,
    //       // response: typeof db.user,
    //       detail: {
    //         summary: "find by id ",
    //       },
    //     }
    //   )
      .post(
        "/",
        ({ body, store }) =>
          store.OrdersService.save(body),
        {
          body: OrderSchema,
          
        }
      )
);
