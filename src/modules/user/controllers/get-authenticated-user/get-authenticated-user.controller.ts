import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getUserById } from "../../usecases/get-user-by-id/get-user-by-id.usecase";
import z from "zod";

export const getAuthenticatedUser = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/me",
    {
      schema: {
        summary: "Get authenticated user",
        tags: ["Me"],
        response: {
          200: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const user = await getUserById(request.user.sub);

      return reply.send({
        ...user,
        password: undefined,
      });
    }
  );
};
