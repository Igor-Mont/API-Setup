import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import auth from "config/auth";

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
    
    const token = sign({ id: user.id }, auth.secret_token, {
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