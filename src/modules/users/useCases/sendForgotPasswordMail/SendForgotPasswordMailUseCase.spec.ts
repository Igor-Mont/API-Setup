import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let sendForgotMailPasswordUseCase: SendForgotPasswordMailUseCase;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot password mail", () => {
  beforeEach(() => {  
    mailProviderInMemory = new MailProviderInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    sendForgotMailPasswordUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      mailProviderInMemory
    );
  });

  it("should be able send a forgot password mail to user, calling sendMail", async () => {
    await usersRepositoryInMemory.create({
      name: "Forgot Pass",
      username: "User name",
      email: "forgot@pass.com",
      password: "123"
    });

    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await sendForgotMailPasswordUseCase.execute("forgot@pass.com");

    expect(sendMail).toHaveBeenCalled()
  });

  it("should note be able send a forgot password mail to user inexistent", async () => {
    await expect(
      sendForgotMailPasswordUseCase.execute("nonexistent@email.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

});