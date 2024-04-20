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
        response: {
          200: z.object({
            posts: z.array(z.object({})),
          }),
        },
      },
    },
    async (_, reply) => {
      const posts = await listPosts();

      return reply.send({ posts });
    }
  );
};
