import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest ) {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) throw new AppError("Email or password incorrect", 401);

    const matchPassword = await compare(password, user.password);

    if(!matchPassword) throw new AppError("Email or password incorrect", 401);
    
    const token = sign({ id: user.id }, "3676d55f84497cbeadfc614c1b1b62fc", {
      expiresIn: "1d"
    });

    delete user.password;

    return {
      token,
      user
    };
  }
}

export { AuthenticateUserUseCase };