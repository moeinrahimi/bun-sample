// users.service.ts
// in charge of business logic - generate slug, fetch data from other services, cache something, etc.
import { NotFoundError } from "elysia";
import { UsersRepository } from "./user.repository";

export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async login(email: string, password: string) {
    const user = await this.repository.login(email,password);
    if(!user) throw new NotFoundError()
      return user 
    
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }
}
