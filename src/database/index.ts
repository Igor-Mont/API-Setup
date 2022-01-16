import { Connection, createConnection, getConnectionOptions } from "typeorm";

async function ConnectionDB(host = "db_app"): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();
  console.log("Connected with database 📦");

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  );
}

export { ConnectionDB }