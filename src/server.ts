import "dotenv/config";
import express from "express";

import { router } from "./routes";

const server = express();

server.use(express.json());

server.use(router);

server.listen(process.env.EXPRESS_PORT, () => {
  console.info(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
