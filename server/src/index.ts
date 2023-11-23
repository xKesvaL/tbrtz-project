import fastify from "fastify";
import middie from "@fastify/middie";

import cors from "cors";
import * as routes from "./routes";

const createServer = async () => {
  const app = fastify({});

  await app.register(middie);
  app.use(cors());

  Object.entries(routes).forEach(([route, handler]) => {
    app.register(handler, { prefix: route });
  });

  app.listen({ port: 3001, host: "0.0.0.0" }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
  });
};

createServer();
