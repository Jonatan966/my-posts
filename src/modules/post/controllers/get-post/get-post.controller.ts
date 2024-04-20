import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getPost } from "../../usecases/get-post/get-post.usecase";

export const getPostController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:post_id",
    {
      schema: {
        summary: "Get post",
        tags: ["Posts"],
        security: [{ bearer: [] }],
        params: z.object({
          post_id: z.string().cuid2(),
        }),
      },
    },
    async (request, reply) => {
      const post = await getPost(request.params.post_id);

      return reply.send(post);
    }
  );
};
