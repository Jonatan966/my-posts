import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";

export const getUserByUsernameController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:username",
    {
      schema: {
        params: z.object({
          username: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const user = await getUserByUsername(request.params.username);

      return reply.send(user);
    }
  );
};
