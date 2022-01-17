import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name, password }: ICreateUserDTO ): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) throw new AppError("User already exists!", 409);

    const matchPassword = await hash(password, 10);
    
    await this.usersRepository.create({
      name,
      email,
      password: matchPassword
    });
  }
}

export { CreateUserUseCase };