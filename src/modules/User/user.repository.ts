import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";

export class UsersRepository {
  constructor(private readonly db: PrismaClient) {}

  async findById(id: number) {
    console.log(id,'------------------------')
    return this.db.user.findFirst({ where: { id: Number(id) } });
  }

  async login(email: string, password: string) {
    return this.db.user.findFirst({where:{email:email,password:password}})
    
  }
}
