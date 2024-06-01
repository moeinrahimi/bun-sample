import type { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { Order } from "./order.dto";

export class OrderRepository {
  constructor(private readonly db: PrismaClient) {}

  async save(body:Order ) {
    return this.db.order.create({data:body})
    
  }
  async find( ) {
    return this.db.order.findMany()
    
  }
}
