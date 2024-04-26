import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getUserByUsername } from "../../../user/usecases/get-user-by-username/get-user-by-username.usecase";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";

export const listUserPostsController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:username/posts",
    {
      schema: {
        summary: "List user posts",
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
      const { page_size, page_token } = request.query;

      const user = await getUserByUsername(request.params.username);

      const { posts, next_page_token } = await listPosts({
        author_id: user.id,
        page_token,
        page_size,
      });

      return reply.send({ posts, next_page_token });
    }
  );
};
