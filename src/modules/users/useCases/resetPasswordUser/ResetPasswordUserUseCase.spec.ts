import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { sign } from "jsonwebtoken";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";
import auth from "../../../../config/auth";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { compare } from "bcrypt";
import { AppError } from "@shared/infra/http/errors/AppError";


let usersRepositoryInMemory: UsersRepositoryInMemory;
let resetPasswordUserUseCase: ResetPasswordUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Reset password user", () => {

  beforeEach(() => { 
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    resetPasswordUserUseCase = new ResetPasswordUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able reset password", async () => { 
    const userTest: ICreateUserDTO = {
      name: "User test",
      username: "Username",
      email: "user@test.com",
      password: "123"
    };

    await createUserUseCase.execute(userTest);

    const user = await usersRepositoryInMemory.findByEmail(userTest.email);
    
    const tokenTest = sign({ id: user.id }, auth.secret_token_recovery);

    await resetPasswordUserUseCase.execute(tokenTest, "321");

    const passwordMatch = await compare(user.password, auth.secret_token_recovery);

    expect(passwordMatch).toBe(false);
  });

  it("should not be able reset password with token invalid", async () => {
    const userTest: ICreateUserDTO = {
      name: "User test",
      username: "User name",
      email: "user@test.com",
      password: "123"
    };

    await createUserUseCase.execute(userTest);

    const user = await usersRepositoryInMemory.findByEmail(userTest.email);
    
    const tokenTest = sign({ id: user.id }, "invalidhash");

    await expect(
      resetPasswordUserUseCase.execute(tokenTest, "321")
    ).rejects.toEqual(new AppError("Invalid Token", 401));
  });


});