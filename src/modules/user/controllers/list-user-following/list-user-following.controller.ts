import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";
import { listUserFollowing } from "../../usecases/list-user-following/list-user-following.usecase";

export const listUserFollowingController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:username/following",
    {
      schema: {
        summary: "List user following",
        tags: ["Users"],
        security: [{ bearer: [] }],
        params: z.object({
          username: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const targetUser = await getUserByUsername(request.params.username);

      const following = await listUserFollowing(targetUser.id);

      return reply.send({ users: following });
    }
  );
};
