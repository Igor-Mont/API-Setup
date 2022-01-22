import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { ConnectionDB } from "..";

async function createAdmin() {
  const connection = await ConnectionDB("localhost");

  const id = uuidV4();
  const hashPassword = await hash("admin", 10);

  await connection.query(
    `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at)
    values('${id}', 'admin', 'adm', 'admin@setup.com.br', '${hashPassword}', true, 'now()')`
  );
}

createAdmin().then(() => console.log("Admin created!"));
