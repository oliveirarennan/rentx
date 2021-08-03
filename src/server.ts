import "dotenv/config";
import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const server = express();

server.use(express.json());

server.use("/categories", categoriesRoutes);

server.listen(process.env.EXPRESS_PORT, () => {
  console.info(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
