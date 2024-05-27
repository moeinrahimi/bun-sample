import { db } from "@/database.provider";
import { UsersRepository } from "./user.repository";
import { UsersService } from "./user.service";
import { Elysia } from "elysia";

export const setupUsers = () => {
  const usersRepository = new UsersRepository(db);
  const usersService = new UsersService(usersRepository);
  return new Elysia().state(() => ({ usersService }));
};
