import { resolve } from "path";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/infra/http/errors/AppError";

class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}
  
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs");

    if(!user) throw new AppError("User does not exists!");

    const variables = {
      name: user.name,
      link: "google.com"
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