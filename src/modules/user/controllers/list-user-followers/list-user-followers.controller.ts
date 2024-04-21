import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { getUserByUsername } from "../../usecases/get-user-by-username/get-user-by-username.usecase";
import { listUserFollowers } from "../../usecases/list-user-followers/list-user-followers.usecase";

export const listUserFollowersController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:username/followers",
    {
      schema: {
        summary: "List user followers",
        tags: ["Users"],
        security: [{ bearer: [] }],
        params: z.object({
          username: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const targetUser = await getUserByUsername(request.params.username);

      const followers = await listUserFollowers(targetUser.id);

      return reply.send({ users: followers });
    }
  );
};
