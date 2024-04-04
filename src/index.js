import "dotenv/config.js";
import express from "express";
import router from "./routes/router.js";
import connection from "./config/database.js";
import cors from "cors";

const app = express();
app.use("/", router);
app.use(cors());

async function startServer() {
  try {
    console.log("OPA");
    const connectionDB = await connection();
    if (connectionDB) console.log("DB Conectado!");

    app.listen(3333, () => {
      console.log("App is running in port: 3333");
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

startServer();

export { app };
