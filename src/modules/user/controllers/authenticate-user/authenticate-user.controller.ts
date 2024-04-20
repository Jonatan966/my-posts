import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { authenticateUser } from "../../usecases/authenticate-user/authenticate-user.usecase";

export const authenticateUserController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth",
    {
      schema: {
        body: z.object({
          username: z.string(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { username, password } = request.body;

      const user = await authenticateUser({
        username,
        password,
      });

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        }
      );

      return reply.send({
        token,
      });
    }
  );
};
