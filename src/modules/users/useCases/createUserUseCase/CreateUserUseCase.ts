import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name, password }: ICreateUserDTO ): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      password
    });
  }
}

export { CreateUserUseCase };