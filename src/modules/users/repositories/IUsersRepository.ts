import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create({ email, name, password }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };