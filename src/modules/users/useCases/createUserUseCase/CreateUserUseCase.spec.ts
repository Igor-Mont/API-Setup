import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create an user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  
  it("should be able create a new User", async () => {
    const user: ICreateUserDTO = {
      name: "New User",
      email: "create@user.com",
      password: "New Password"
    };

    await createUserUseCase.execute(user);

    const users = usersRepositoryInMemory.users;

    expect(users.length).toEqual(1);
    expect(users[0]).toHaveProperty("id");
  });

  it("should not be able create a users with email already existent", async () => {
    await usersRepositoryInMemory.create({
      email: "user1@test.com",
      name: "User 1",
      password: "Pass 1"
    });
    expect(async () => {
      await usersRepositoryInMemory.create({
        email: "user1@test.com",
        name: "User 2",
        password: "Pass 2"
      });
    }).rejects.toBeInstanceOf(AppError);
    
  });

});