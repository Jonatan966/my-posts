import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { followUser } from "../../usecases/follow-user/follow-user.usecase";

export const followUserController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:username/followers",
    {
      schema: {
        params: z.object({
          username: z.string(),
        }),
      },
    },
    async (request, reply) => {
      await followUser({
        follower_id: request.user.sub,
        following_username: request.params.username,
      });

      return reply.status(204).send();
    }
  );
};
