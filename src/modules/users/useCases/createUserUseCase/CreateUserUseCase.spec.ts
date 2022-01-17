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
});