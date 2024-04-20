import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createPost } from "../../usecases/create-post/create-post.usecase";

export const createPostController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "",
    {
      schema: {
        summary: "Create post",
        tags: ["Posts"],
        body: z.object({
          content: z.string(),
          reposted_post_id: z.string().optional(),
          parent_post_id: z.string().optional(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const post = await createPost({
        ...request.body,
        author_id: request.user.sub,
      });

      return reply.status(201).send(post);
    }
  );
};
