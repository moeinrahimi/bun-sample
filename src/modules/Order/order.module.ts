import { db } from "@/database.provider";
import { OrderRepository } from "./order.repository";
import { OrderService } from "./order.service";
import { Elysia } from "elysia";
import { TradeRepository } from "./trade.repository";

export const setupOrders = () => {
  const OrdersRepository = new OrderRepository(db);
  const TradesRepository = new TradeRepository(db);
  const OrdersService = new OrderService(OrdersRepository,TradesRepository);
  return new Elysia().state(() => ({ OrdersService }));
};
