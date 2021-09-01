import { server } from "./app";

server.listen(process.env.EXPRESS_PORT, () => {
  console.info(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
