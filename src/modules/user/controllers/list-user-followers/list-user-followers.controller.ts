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
        querystring: z.object({
          page_token: z
            .string()
            .cuid2()
            .optional()
            .describe("Necessary to navigate between pages"),
          page_size: z
            .number()
            .min(1)
            .max(20)
            .optional()
            .describe("Integer from `1` to `20`"),
        }),
      },
    },
    async (request, reply) => {
      const { page_token, page_size } = request.query;

      const targetUser = await getUserByUsername(request.params.username);

      const { users, next_page_token } = await listUserFollowers({
        user_id: targetUser.id,
        page_size,
        page_token,
      });

      return reply.send({ users, next_page_token });
    }
  );
};
