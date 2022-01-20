import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { resolve } from "path";
import auth from "../../../../config/auth";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/infra/http/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs");

    if(!user) throw new AppError("User does not exists!");

    const tokenRecovery = sign({ id: user.id }, auth.secret_token_recovery, {
      expiresIn: "5m"
    });

    const variables = {
      name: user.name,
      link: `http://localhost:3131/reset?token=${tokenRecovery}`
    }

    await this.mailProvider.sendMail(
      email,
      "Recover Password",
      variables, 
      templatePath
    );


  }
}

export { SendForgotPasswordMailUseCase };