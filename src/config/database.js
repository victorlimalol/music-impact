import mysql from "mysql2/promise";

let dbConnection;

async function connectDatabase() {
  if (!dbConnection) {
    dbConnection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return dbConnection;
}

export default connectDatabase;
