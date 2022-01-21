import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able authenticate the user", async () => {
    const user: ICreateUserDTO = {
      name: "Authenticate User",
      username: "User name",
      email: "auth@user.com",
      password: "123"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
  });

  it("should not be able authenticate user with nonexistent email", async () => {
    const user: ICreateUserDTO = {
      name: "Authenticate User",
      username: "UserT",
      email: "auth@user.com",
      password: "123"
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "nonexistent@email.com",
        password: user.password
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 401));
  });

  it("should not be able authenticate user with inconsistent password", async () => {
    const user: ICreateUserDTO = {
      name: "Authenticate User",
      username: "User",
      email: "auth@user.com",
      password: "123"
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "inconsistent pass"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 401));
  });

});