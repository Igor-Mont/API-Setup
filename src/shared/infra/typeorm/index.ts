import { Connection, createConnection, getConnectionOptions } from "typeorm";

async function ConnectionDB(host = "db_app"): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();
  // console.log("Connected with database 📦");

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "application_test" : defaultOptions.database
    })
  );
}

export { ConnectionDB }