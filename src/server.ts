import "dotenv/config";
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const server = express();

server.use(express.json());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(router);

server.use(errorHandler);

server.listen(process.env.EXPRESS_PORT, () => {
  console.info(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
