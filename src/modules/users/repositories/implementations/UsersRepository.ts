import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  async create({ email, name, password }: ICreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export { UsersRepository };