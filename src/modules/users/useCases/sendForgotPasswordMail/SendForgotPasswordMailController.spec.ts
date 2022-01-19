import request from "supertest";
import {  v4 as uuidV4 } from "uuid";
import { ConnectionDB } from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";

let connection: Connection;

describe("Send forgot password mail controller", () => {
  
  beforeAll(async () => {
    connection = await ConnectionDB("localhost");
    await connection.runMigrations();

    const id = uuidV4();
    const hashPassword = await hash("pass", 10);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at)
        values('${id}', 'user', 'user@test.com.br', '${hashPassword}', false, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able send mail", async () => {
    const response = await request(app).post("/forgot").send("user@test.com.br");

    expect(response.status).toBe(200);
  });
});