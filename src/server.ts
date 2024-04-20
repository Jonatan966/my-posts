import fastifySwaggerUI from "@fastify/swagger-ui";

import { app } from "./app";
import { environment } from "./utils/env";

const port = environment.port || 3000;

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app
  .listen({ port, host: "0.0.0.0" })
  .then(() => console.log("app started on", port));
