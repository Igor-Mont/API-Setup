import { AppError } from "@shared/infra/http/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create a new user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  
  it("should be able create a new user", async () => {
    const user: ICreateUserDTO = {
      email: "create@user.com",
      name: "New User",
      password: "New Password"
    };
    
    await createUserUseCase.execute(user);
    
    const users = usersRepositoryInMemory.users;

    expect(users.length).toEqual(1);
    expect(users[0]).toHaveProperty("id");
  });

  it("should not be able create a users with email already existent", async () => {
    await usersRepositoryInMemory.create({
      name: "User 1",
      email: "user@test.com",
      password: "Pass 1"
    });

    await expect(
      createUserUseCase.execute({
        name: "User 2",
        email: "user@test.com",
        password: "Pass 2"
    })).rejects.toEqual(new AppError("User already exists!", 409));
  });
});