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
        response: {
          200: z.object({
            comments: z.array(z.object({})),
          }),
        },
      },
    },
    async (request, reply) => {
      const foundPost = await getPost(request.params.post_id);

      const comments = await listPosts({
        parent_post_id: foundPost.id,
      });

      return reply.send({ comments });
    }
  );
};
