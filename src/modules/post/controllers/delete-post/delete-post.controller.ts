import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { deletePost } from "../../usecases/delete-post/delete-post.usecase";

export const deletePostController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/:post_id",
    {
      schema: {
        summary: "Delete post",
        tags: ["Posts"],
        params: z.object({
          post_id: z.string().cuid2(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      await deletePost({
        author_id: request.user.sub,
        post_id: request.params.post_id,
      });

      return reply.status(204).send();
    }
  );
};
