import request from "supertest";
import { ConnectionDB } from "@shared/infra/typeorm";
import { compare, hash } from "bcrypt";
import { Connection } from "typeorm";
import auth from "../../../../config/auth";
import { v4 as uuidV4, V4Options } from "uuid";
import { app } from "@shared/infra/http/app";
import { sign } from "jsonwebtoken";

let connection: Connection;
let id: string;
let hashPassword: string;

describe("Reset Password Controller", () => {
  beforeAll(async () => {
    connection = await ConnectionDB("localhost");
    await connection.runMigrations();

    id = uuidV4();
    const password = "123";
    hashPassword = await hash(password, 10);

    await connection.query(
      `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at)
        values('${id}', 'user', 'usertest', 'user@test.com.br', '${hashPassword}', false, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able reset password user", async () => {
    const tokenRecovery = sign({ id }, auth.secret_token_recovery, {
      expiresIn: "5m"
    });

    const response = await request(app).patch(`/password/reset?token=${tokenRecovery}`).send({
      password: "321"
    });

    const matchPassword = await compare(response.body.password, hashPassword);

    expect(matchPassword).toBe(false);
    expect(response.status).toEqual(200);
  });
  
  it("should not be able reset password user with token expired or invalid", async () => {
    const tokenRecovery = sign({ id }, auth.secret_token_recovery, {
      expiresIn: "5m"
    });

    const response = await request(app).patch(`/password/reset`).send({
      password: "321"
    });

    expect(response.body).toHaveProperty("message");
  });
});