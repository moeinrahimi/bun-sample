import { db } from "@/database.provider";
import { OrderRepository } from "./order.repository";
import { OrderService } from "./order.service";
import { Elysia } from "elysia";

export const setupOrders = () => {
  const OrdersRepository = new OrderRepository(db);
  const OrdersService = new OrderService(OrdersRepository);
  return new Elysia().state(() => ({ OrdersService }));
};
