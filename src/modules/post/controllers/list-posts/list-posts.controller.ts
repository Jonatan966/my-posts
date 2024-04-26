import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";
import z from "zod";

export const listPostsController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "",
    {
      schema: {
        summary: "List posts",
        tags: ["Posts"],
        security: [{ bearer: [] }],
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

      const { posts, next_page_token } = await listPosts({
        page_token,
        page_size,
      });

      return reply.send({ posts, next_page_token });
    }
  );
};
