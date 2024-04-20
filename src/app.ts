import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";

import { postRoutes } from "./modules/post/routes";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { userRoutes } from "./modules/user/routes";
import { errorHandler } from "./middlewares/error-handler";
import { environment } from "./utils/env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyJwt, {
  secret: environment.secret,
  // cookie: {
  //   cookieName: "refreshToken",
  //   signed: false,
  // },
  sign: {
    expiresIn: "30d",
  },
});

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(postRoutes, { prefix: "/posts" });
app.register(userRoutes, { prefix: "/users" });

app.setErrorHandler(errorHandler);

export { app };
