import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { editPost } from "../../usecases/edit-post/edit-post.usecase";

export const editPostController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/:post_id",
    {
      schema: {
        summary: "Edit post",
        tags: ["Posts"],
        security: [{ bearer: [] }],
        params: z.object({
          post_id: z.string().cuid2(),
        }),
        body: z.object({
          content: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const updatedPost = await editPost({
        id: request.params.post_id,
        author_id: request.user.sub,
        content: request.body.content,
      });

      return reply.send(updatedPost);
    }
  );
};
