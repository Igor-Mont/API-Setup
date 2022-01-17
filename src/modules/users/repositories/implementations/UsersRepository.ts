import { User } from "@modules/users/entities/User";
import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }
  
  async create({ email, name, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}

export { UsersRepository };