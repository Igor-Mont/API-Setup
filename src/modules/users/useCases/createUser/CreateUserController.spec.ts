import { app } from "@shared/infra/http/app";
import { ConnectionDB } from "@shared/infra/typeorm";
import request from "supertest";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create User Controller", () => {

  beforeAll( async () => {
    connection = await ConnectionDB("localhost");
    await connection.runMigrations();
  });

  afterAll( async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Create user controller", async () => {
    const response = await request(app).post("/users").send({
      name: "User Test",
      email: "user@test.com",
      password: "Pass user"
    });

    expect(response.status).toBe(201);
  });

});