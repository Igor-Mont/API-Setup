import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create({ email, name, password }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };