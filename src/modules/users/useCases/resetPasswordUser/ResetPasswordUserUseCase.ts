import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

@injectable()
class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(token: string, password: string) {
    
    try {
      const { id: user_id } = verify(token, "6ccf929934691710135f3f0df7cc43c5") as IPayload;
      const user = await this.usersRepository.findById(user_id);

      user.password = await hash(password, 10);
      // user.password = password;

      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      throw new AppError("Invalid Token", 401);
    }
  }
}

export { ResetPasswordUserUseCase };