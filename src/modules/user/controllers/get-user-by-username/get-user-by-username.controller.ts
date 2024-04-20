import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";

export const getUserByUsernameController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:username",
    {
      schema: {
        summary: "Get user by username",
        tags: ["Users"],
        params: z.object({
          username: z.string(),
        }),
        response: {
          200: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const user = await getUserByUsername(request.params.username);

      return reply.send(user);
    }
  );
};
