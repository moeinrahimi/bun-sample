import type { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { Order } from "./order.dto";

export class TradeRepository {
	constructor(private readonly db: PrismaClient) {}

	async save(body) {
		return this.db.order.create({ data: body });
	}
	async find() {
		return this.db.order.findMany();
	}
	async update(id: string, body: Order) {
		return this.db.order.update({ where: { id: id }, data: body });
	}
}
