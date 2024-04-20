import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";

import { postRoutes } from "./modules/post/routes";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
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

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "my-posts",
      description:
        "Especificações da API para o back-end da aplicação my-posts",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearer: {
        type: "apiKey",
        in: "header",
        description: "The Bearer token to authenticated routes",
        name: "Authorization",
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(postRoutes, { prefix: "/posts" });
app.register(userRoutes, { prefix: "/users" });

app.setErrorHandler(errorHandler);

export { app };
