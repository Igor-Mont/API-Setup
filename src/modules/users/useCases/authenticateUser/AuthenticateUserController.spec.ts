import request from "supertest";
import { app } from "@shared/infra/http/app";
import { ConnectionDB } from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

let connection: Connection;

// fix this
// describe("Authenticate User Controller", () => {
//   beforeAll(async () => {
//     connection = await ConnectionDB("localhost");
//     await connection.runMigrations();

//     const id = uuidV4();
//     const hashPassword = hash("pass", 10);

//     await connection.query(
//       `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at)
//         values('${id}', 'user test', 'user', 'user@test.com.br', '${hashPassword}', false, 'now()')`
//     );
//   });

//   afterAll(async () => {
//     await connection.dropDatabase();
//     await connection.close();
//   });
  // it("should be able auth user", async () => {
  //   const response = await request(app).post("/sessions").send({
  //     email: "user@test.com.br",
  //     password: "pass"
  //   });

  //   console.log(response.body);
  //   expect(response.body).toHaveProperty("token");

  //   expect(response.status).toBe(200);
  // });

// });