import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";
import { refreshToken } from "./routes/refreshToken";
import { indexRoute } from "./routes/indexRoute";
import { corsConfig, SERVER_PORT } from "./config";
import { initializeApollo } from "./apollo";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(cors(corsConfig));
  app.get("/", indexRoute);
  app.post("/refresh_token", refreshToken);

  // create type-orm connection
  await createConnection();
  await initializeApollo(app);

  app.listen(SERVER_PORT, () => {
    console.log(`server running at port ${SERVER_PORT}`);
  });
})();
