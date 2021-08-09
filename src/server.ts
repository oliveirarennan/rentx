import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

const server = express();

server.use(express.json());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use(router);

server.listen(process.env.EXPRESS_PORT, () => {
  console.info(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
