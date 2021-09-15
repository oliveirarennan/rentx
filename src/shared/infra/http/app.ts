import "dotenv/config";
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import "@shared/container";
import errorHandler from "./middlewares/errorHandler";

createConnection();

const server = express();

server.use(express.json());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
server.use("/avatar", express.static(`${upload.tmpFolder}/cars`));

server.use(router);

server.use(errorHandler);

export { server };
