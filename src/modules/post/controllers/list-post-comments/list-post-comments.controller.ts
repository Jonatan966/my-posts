import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getPost } from "../../usecases/get-post/get-post.usecase";
import { listPosts } from "../../usecases/list-posts/list-posts.usecase";

export const listPostCommentsController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:post_id/comments",
    {
      schema: {
        summary: "List post comments",
        tags: ["Posts"],
        security: [{ bearer: [] }],
        params: z.object({
          post_id: z.string().cuid2(),
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

      const foundPost = await getPost(request.params.post_id);

      const { posts: comments, next_page_token } = await listPosts({
        parent_post_id: foundPost.id,
        page_token,
        page_size,
      });

      return reply.send({ comments, next_page_token });
    }
  );
};
